import { Request, Response } from 'express';
import { pool } from '../global/database';
import { validateRegisterForm, validateLoginForm } from '../utils/validation';
import * as bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const validation = validateLoginForm(req.body);

    if (validation.fails()) {
        return res.status(422).send(validation.errors.all());
    }
    
    const user = (await pool.query(`SELECT * FROM usuarios WHERE correo ='${email}'`)).rows[0];
    if(!user){
        return res.status(404).send({error: 'credentials not valid'});
    }

    const match = await bcryptjs.compare(password, user.password);
    if(!match){
        return res.status(401).json({error: 'credentials not valid'})
    }
    
    const token = await jwt.sign({ email: email }, 'Megadeth es lo maximo', { expiresIn: 60 * 60 * 24 });
    res.status(200).send({ id: user.id, email: user.correo, token, name: user.nombre, type: user.type});
}

export const createUser = async(req:  Request, res: Response): Promise<Response> => {
    const validation = validateRegisterForm(req.body);
    
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }

    const { name, email, password, type  } = req.body;
    const verifyRepeat = await pool.query(`SELECT * FROM usuarios WHERE correo = '${email}'`);

    if(verifyRepeat.rows.length > 0){
        return res.status(422).send({error: 'Este correo ya ha sido registrado.'})
    }
    const hashedPasswrod = await bcryptjs.hash(password, 12);
    const auxType = type ? type: 'usuario';

    try{
        await pool.query(`INSERT INTO usuarios (nombre, password, correo, type) VALUES ('${name}','${hashedPasswrod}','${email}', '${auxType}')`);
        return res.status(200).json({ success: true });
    }catch(e){
        return res.status(500).json({error:'Internal server error'});
    }
}
