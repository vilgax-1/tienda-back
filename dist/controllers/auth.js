"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.login = void 0;
const database_1 = require("../global/database");
const validation_1 = require("../utils/validation");
const bcryptjs = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const validation = validation_1.validateLoginForm(req.body);
    if (validation.fails()) {
        return res.status(422).send(validation.errors.all());
    }
    const user = (await database_1.pool.query(`SELECT * FROM usuarios WHERE correo ='${email}'`)).rows[0];
    if (!user) {
        return res.status(404).send({ error: 'credentials not valid' });
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'credentials not valid' });
    }
    const token = await jsonwebtoken_1.default.sign({ email: email }, 'Megadeth es lo maximo', { expiresIn: 60 * 60 * 24 });
    res.status(200).send({ id: user.id, email: user.correo, token, name: user.nombre, type: user.type });
};
exports.createUser = async (req, res) => {
    const validation = validation_1.validateRegisterForm(req.body);
    if (validation.fails()) {
        return res.status(422).send(validation.errors.all());
    }
    const { name, email, password, type } = req.body;
    const verifyRepeat = await database_1.pool.query(`SELECT * FROM usuarios WHERE correo = '${email}'`);
    if (verifyRepeat.rows.length > 0) {
        return res.status(422).send({ error: 'Este correo ya ha sido registrado.' });
    }
    const hashedPasswrod = await bcryptjs.hash(password, 12);
    const auxType = type ? type : 'usuario';
    try {
        await database_1.pool.query(`INSERT INTO usuarios (nombre, password, correo, type) VALUES ('${name}','${hashedPasswrod}','${email}', '${auxType}')`);
        return res.status(200).json({ success: true });
    }
    catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
