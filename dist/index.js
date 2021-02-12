"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const enviroment_1 = require("./global/enviroment");
const auth_1 = require("./routes/auth");
const users_1 = require("./routes/users");
const products_1 = require("./routes/products");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const compras_1 = require("./routes/compras");
const server = new server_1.default();
// BODYPARSER
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// ROUTES
server.app.use('/', auth_1.routerAuth);
server.app.use('/', users_1.routerUsers);
server.app.use('/', products_1.routerProducts);
server.app.use('/', compras_1.routerSales);
server.start(() => {
    console.log('Servidor corriendo en el puerto ' + enviroment_1.SERVER_PORT);
});
