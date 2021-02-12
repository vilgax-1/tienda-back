"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
exports.routerAuth = express_1.Router();
exports.routerAuth.post('/login', auth_1.login);
exports.routerAuth.post('/createUser', auth_1.createUser);
