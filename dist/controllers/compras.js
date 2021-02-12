"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedProductsAll = exports.buyProducts = exports.shoppingCar = void 0;
const database_1 = require("../global/database");
exports.shoppingCar = async (req, res) => {
    const { productId, usuarioId } = req.body;
    try {
        await database_1.pool.query(`insert into compras (usuarioid ,productid, status) values (${usuarioId}, ${productId},'CREADA')`);
        return res.status(200).json({ ok: true, message: 'product added to car' });
    }
    catch (e) {
        return res.status(500).json({ message: 'Something went wrong', error: e });
    }
};
exports.buyProducts = async (req, res) => {
    const { id } = req.body;
    try {
        await database_1.pool.query(`update compras set status = 'PAGADA' where id_compra = ${id}`);
        return res.status(200).json({ ok: true, message: 'Product buyed' });
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.rrror });
    }
};
exports.purchasedProductsAll = async (req, res) => {
    const { type, id } = req.body;
    let filter = '';
    if (type !== 'administrador') {
        filter = `WHERE usuarios.id = ${id}`;
    }
    try {
        const products = (await database_1.pool.query(`select compras.id_compra, productos.nombre as productNombre, productos.link, productos.precio, productos.tamano, usuarios.nombre, compras.status 
        from compras join productos on compras.productid = productos.id join usuarios on compras.usuarioid = usuarios.id ` + filter)).rows;
        return res.status(200).json({ ok: true, products });
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.rrror });
    }
};
