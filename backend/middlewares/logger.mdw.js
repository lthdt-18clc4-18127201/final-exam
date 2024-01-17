import logger from '../utils/logger/logger.js';

export default function(req, res, next) {
    res.on('finish', () => {
        if(res.statusCode >= 400) {
            switch(req.originalUrl){
                case '/api/auth/login': {
                    logger.error(
                    `Status: ${res.statusCode} - ${req.method}: ${req.originalUrl}: Enter wrong password`);
                    break
                };
                case '/api/auth/register': {
                    logger.error(
                    `Status: ${res.statusCode} - ${req.method}: ${req.originalUrl}: Register process has an occured`);
                    break
                };
                default: next();
            }
            
        } 
    });

    next();
}