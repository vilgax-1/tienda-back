import { Request, Response } from 'express';
import { pool } from '../global/database';
import { validateRegisterProduct } from '../utils/validation';

export const products = async(req: Request, res: Response):  Promise<Response>=> {
    try{
        const products = (await pool.query('SELECT * FROM productos')).rows;
        return res.status(200).json(products);
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.rrror});
    }
}   

export const createProduct = async(req: Request, res: Response ): Promise<Response> =>{
    const { nombre, tamano, precio, link } = req.body;

    const validation = validateRegisterProduct(req.body);
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }

    try{
        const product  = await pool.query(`INSERT INTO productos (nombre, tamano, precio, link) VALUES ('${nombre}','${tamano}', ${precio}, '${link}')`);
        if(product.rowCount){
            const productToSearch = (await pool.query(`SELECT * FROM productos WHERE nombre ='${nombre}' AND tamano = '${tamano}' AND precio = '${precio}' AND link= '${link}'`)).rows[0];
            return res.status(200).json({ok: true, productToSearch});
        }
        return res.status(500).json({message: 'Something was wrong', error: 'Product not created'});
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.rrror});
    }
}  

export const product = async(req: Request, res: Response): Promise<Response> =>{
    const id = req.params.id;
    try{
        const product = (await pool.query(`SELECT * FROM productos where id = ${id}`)).rows[0];
        if(!product){
            return res.status(401).send('Product not found');
        }
        return res.status(200).json(product);
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.error})
    }
}

export const deleteProduct = async(req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try{
        const product = (await pool.query(`SELECT * FROM productos where id = ${id}`)).rows[0];
        if(!product){
            return res.status(401).send('Product not found');
        }else {
            await pool.query(`DELETE from productos WHERE id= ${id}`);
            return res.status(200).json('product deleted');
        }
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.error});  
    }
}

export const updateProduct = async(req: Request, res: Response) => {
    const { id, nombre, tamano, precio, link  } = req.body;
    
    const validation = validateRegisterProduct(req.body);
    
    if(validation.fails()){
        return res.status(422).send(validation.errors.all());
    }
    
    try {
        const update = await pool.query(`UPDATE productos set nombre='${nombre}', tamano ='${tamano}', precio=${+(precio)}, link='${link}' WHERE id = ${+(id)}`);
        
        if(update.rowCount){
            return res.status(200).json({ ok: true, message: 'Product updated' })
        }else{
            return res.status(500).json({message: 'Something was wrong'}); 
        }
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.error});
    }
}