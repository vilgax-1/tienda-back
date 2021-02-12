import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const ensureAuth = async(req: Request, res: Response, next: NextFunction) =>{
    if(!req.headers.authorization){
		return res.status(500).send({status:false , message:'no header' , error_token:true});
	}
    const token = req.headers.authorization.replace(/Bearer/g, '').trim();
    try{
        const payload: any = jwt.decode(token);
        if(payload.exp <= moment().unix()){
			return res.status(500).send({status:false , msg:'TOKENEXPIRED' , error_token:true});
		}
    }catch(e){
        return res.status(500).send({status:false , message:'invalid token' , error_token: true});
    }

    next();
}