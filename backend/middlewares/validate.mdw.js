import Ajv from 'ajv';

const ajv = new Ajv();

export default function(schema) {
    return function validate(req, res, next) {
        if(!ajv.validate(schema, req.body))
            return res.status(400).json(ajv.errors);
            
        next();
    } 
}