import { products, product, deleteProduct, updateProduct, createProduct } from '../controllers/products';
import { Router } from 'express';
import { ensureAuth } from '../middlewares/authenticated';

export const routerProducts = Router();

routerProducts.post('/product', ensureAuth, createProduct)
routerProducts.get('/products', ensureAuth , products);
routerProducts.get('/product/:id', ensureAuth ,product);
routerProducts.delete('/deleteProduct', ensureAuth ,deleteProduct);
routerProducts.put('/updateProduct', ensureAuth ,updateProduct);