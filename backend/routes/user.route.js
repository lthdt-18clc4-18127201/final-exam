import express from 'express';
import userModel from '../models/user.model.js';
import validate from '../middlewares/validate.mdw.js';
import bcrypt from 'bcrypt';
import { readFile } from 'fs/promises';

const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/user.json', import.meta.url)));

router.get('/', async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.json(users);
    } catch (error) {
        return res.status(400).json({message: 'Some error occured'});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user) return res.status(404).json({message: 'User not found'});

        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({message: 'Some error occured'});
    }
});

router.put('/:id', validate(schema), async(req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id); 
        if(!user) return res.status(404).json({message: 'User not found'});
        
        const newData = req.body;
        const hashPassword = await bcrypt.hash(
            req.body.password, 
            await bcrypt.genSalt(10)
        );
        newData.password = hashPassword;

        await userModel.updateOne({
                _id: req.params.id,
            }, {
                $set: newData
            }
        );
        return res.status(200).json({message: 'Data updated successfully'});
    } catch (error) {
        return res.status(400).json({message: 'Some error occured'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'});
        await userModel.deleteOne({_id: req.params.id});
        return res.status(200).json({message: 'Deleted successfully'});
    } catch (error) {
        return res.status(400).json({message: 'Some error occured'});
    }
})


export default router;