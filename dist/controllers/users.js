"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.user = exports.users = void 0;
const database_1 = require("../global/database");
exports.users = async (req, res) => {
    try {
        const users = (await database_1.pool.query('SELECT id, nombre, correo FROM usuarios')).rows;
        return res.status(200).json(users);
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.rrror });
    }
};
exports.user = async (req, res) => {
    const id = req.params.id;
    try {
        const user = (await database_1.pool.query(`SELECT nombre, correo FROM usuarios WHERE id = ${id}`)).rows[0];
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(200).json({ message: 'User not found' });
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.error });
    }
};
exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        await database_1.pool.query(`DELETE FROM usuarios where id = ${id}`);
        return res.status(200).json({ success: true });
    }
    catch (e) {
        return res.status(500).json({ error: 'User not deleted' });
    }
};
exports.updateUser = async (req, res) => {
    const {} = req.body;
    try {
    }
    catch (e) {
        return res.status(500).json({ message: 'Something was wrong', error: e.error });
    }
};
