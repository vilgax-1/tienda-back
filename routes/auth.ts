import { Router } from 'express';
import { login, createUser } from '../controllers/auth';

export const routerAuth = Router();

routerAuth.post('/login', login);
routerAuth.post('/createUser', createUser);