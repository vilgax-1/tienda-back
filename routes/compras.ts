import { buyProducts, purchasedProductsAll, shoppingCar } from '../controllers/compras';
import { Router } from 'express';
import { ensureAuth } from '../middlewares/authenticated';

export const routerSales = Router();

routerSales.put('/purchaseproduct', ensureAuth, buyProducts);
routerSales.post('/purchased', ensureAuth , purchasedProductsAll);
routerSales.post('/buy', ensureAuth ,shoppingCar);