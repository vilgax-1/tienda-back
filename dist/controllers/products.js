"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.product = exports.createProduct = exports.products = void 0;
const database_1 = require("../global/database");
const validation_1 = require("../utils/validation");
exports.products = async (req, res) => {
    try {
        const products = (await database_1.pool.query('SELECT * FROM productos')).rows;
        return res.status(200).json(products);
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.rrror });
    }
};
exports.createProduct = async (req, res) => {
    const { nombre, tamano, precio, link } = req.body;
    const validation = validation_1.validateRegisterProduct(req.body);
    if (validation.fails()) {
        return res.status(422).send(validation.errors.all());
    }
    try {
        const product = await database_1.pool.query(`INSERT INTO productos (nombre, tamano, precio, link) VALUES ('${nombre}','${tamano}', ${precio}, '${link}')`);
        if (product.rowCount) {
            const productToSearch = (await database_1.pool.query(`SELECT * FROM productos WHERE nombre ='${nombre}' AND tamano = '${tamano}' AND precio = '${precio}' AND link= '${link}'`)).rows[0];
            return res.status(200).json({ ok: true, productToSearch });
        }
        return res.status(500).json({ message: 'Something was wrong', error: 'Product not created' });
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.rrror });
    }
};
exports.product = async (req, res) => {
    const id = req.params.id;
    try {
        const product = (await database_1.pool.query(`SELECT * FROM productos where id = ${id}`)).rows[0];
        if (!product) {
            return res.status(401).send('Product not found');
        }
        return res.status(200).json(product);
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.error });
    }
};
exports.deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = (await database_1.pool.query(`SELECT * FROM productos where id = ${id}`)).rows[0];
        if (!product) {
            return res.status(401).send('Product not found');
        }
        else {
            await database_1.pool.query(`DELETE from productos WHERE id= ${id}`);
            return res.status(200).json('product deleted');
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.error });
    }
};
exports.updateProduct = async (req, res) => {
    const { id, nombre, tamano, precio, link } = req.body;
    const validation = validation_1.validateRegisterProduct(req.body);
    if (validation.fails()) {
        return res.status(422).send(validation.errors.all());
    }
    try {
        const update = await database_1.pool.query(`UPDATE productos set nombre='${nombre}', tamano ='${tamano}', precio=${+(precio)}, link='${link}' WHERE id = ${+(id)}`);
        if (update.rowCount) {
            return res.status(200).json({ ok: true, message: 'Product updated' });
        }
        else {
            return res.status(500).json({ message: 'Something was wrong' });
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.error });
    }
};
