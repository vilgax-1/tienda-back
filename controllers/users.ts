import { Request, Response } from 'express';
import { pool } from '../global/database';

export const users = async(req: Request, res: Response) => {
    try{
        const users = (await pool.query('SELECT id, nombre, correo FROM usuarios')).rows;
        return res.status(200).json(users);
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.rrror});
    }
}


export const user = async(req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const user =  (await pool.query(`SELECT nombre, correo FROM usuarios WHERE id = ${id}`)).rows[0];
        if(user){
            return res.status(200).json(user);
        }else{
            return res.status(200).json({message: 'User not found'});
        }
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.error});
    }
}

export const deleteUser = async(req: Request, res: Response)=> {
    const { id } = req.body;
    try{
        await pool.query(`DELETE FROM usuarios where id = ${id}`);
        return res.status(200).json({success: true});
    }catch(e){
        return res.status(500).json({error: 'User not deleted'});
    }
};

export const updateUser = async(req: Request, res: Response) => {
    const {} = req.body;
    try{

    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.error});
    }
};
