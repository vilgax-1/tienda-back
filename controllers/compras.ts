import { Request, Response } from 'express';
import { pool } from '../global/database';


export const shoppingCar = async(req: Request, res: Response) => {
    const { productId, usuarioId } = req.body;
    try{
        await pool.query(`insert into compras (usuarioid ,productid, status) values (${usuarioId}, ${productId},'CREADA')`);

        return res.status(200).json({ok: true, message: 'product added to car'});
    }catch(e){
        return res.status(500).json({message: 'Something went wrong', error: e})
    }
}

export const buyProducts = async(req: Request, res: Response) => {
    const { id } = req.body;
    try{
        await pool.query(`update compras set status = 'PAGADA' where id_compra = ${id}`);
        return res.status(200).json({ok: true, message: 'Product buyed' });
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.rrror});
    }
}

export const purchasedProductsAll = async(req: Request, res: Response) => {
    const { type, id } = req.body;
    let filter = '';
    if(type !== 'administrador'){
        filter = `WHERE usuarios.id = ${id}`
    }
    try{
        const products = (await pool.query(`select compras.id_compra, productos.nombre as productNombre, productos.link, productos.precio, productos.tamano, usuarios.nombre, compras.status 
        from compras join productos on compras.productid = productos.id join usuarios on compras.usuarioid = usuarios.id ` + filter)).rows;
        return res.status(200).json({ok: true ,products});
    }catch(e){
        return res.status(500).json({message: 'Something was wrong', error: e.rrror});
    }
} 