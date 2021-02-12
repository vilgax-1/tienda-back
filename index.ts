import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";

import { routerAuth } from "./routes/auth";
import { routerUsers  } from './routes/users';
import { routerProducts  } from './routes/products';

import bodyParser from 'body-parser';
import cors from "cors";
import { routerSales } from "./routes/compras";

const server = new Server();

// BODYPARSER
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// ROUTES
server.app.use('/', routerAuth);
server.app.use('/', routerUsers);
server.app.use('/', routerProducts);
server.app.use('/', routerSales);

server.start(()=>{
    console.log('Servidor corriendo en el puerto ' +  SERVER_PORT);
})
