"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
exports.ensureAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ status: false, message: 'no header', error_token: true });
    }
    const token = req.headers.authorization.replace(/Bearer/g, '').trim();
    try {
        const payload = jsonwebtoken_1.default.decode(token);
        if (payload.exp <= moment_1.default().unix()) {
            return res.status(500).send({ status: false, msg: 'TOKENEXPIRED', error_token: true });
        }
    }
    catch (e) {
        return res.status(500).send({ status: false, message: 'invalid token', error_token: true });
    }
    next();
};
