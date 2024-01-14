import express from 'express';
import userModel from '../models/user.model.js';
import validate from '../middlewares/validate.mdw.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { readFile } from 'fs/promises';

const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/user.json', import.meta.url)));
const refreshTokens = [];

router.post('/register', validate(schema), async(req, res) => {
    try {
        const email = req.body.email;
        const user = await userModel.findOne({ email });
        if(user) {
            return res.status(404).json({message: 'User was exist'})
        } else {
            const newUser = new userModel(req.body);
            await newUser.save();
            return res.status(201).json({message: 'Register successfully!'});
        }
    } catch (error) {
        return res.status(404).json({message: 'Some error occured'});
    }
});

router.post('/login', validate(schema), async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if(!user) return res.status(404).json({message: 'User not found'});

        bcrypt.compare(password, user.password)
            .then(result => {
                if(result) {
                    const accessToken = jwt.sign(
                        {user: user}, 
                        process.env.ACCESS_TOKEN_SECRET, 
                        {
                            expiresIn: '1h'
                        }
                    );
                    const refreshToken = jwt.sign(
                        {user: user}, 
                        process.env.REFRESH_TOKEN_SECRET
                    );
                    refreshTokens.push(refreshToken);
                    res.json(
                        {
                            user: user,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    );
                } else {
                    res.status(404).json({message: 'You entered wrong password'})
                }
            })
    } catch (error) {
        return res.status(404).json({message: 'Some error occured'});
    }
});


export default router;