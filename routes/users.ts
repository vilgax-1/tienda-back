import { Router } from 'express';
import { users, user, deleteUser, updateUser } from '../controllers/users';
import { ensureAuth } from '../middlewares/authenticated';

export const routerUsers = Router();

routerUsers.get('/users', ensureAuth ,users);
routerUsers.get('/user/:id', ensureAuth ,user);
routerUsers.delete('/deleteUser', ensureAuth ,deleteUser);
routerUsers.put('/updateUser', ensureAuth ,updateUser);