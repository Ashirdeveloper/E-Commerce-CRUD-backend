import express from 'express';
import { ProductCreate, Update,Delete,GetProduct } from '../controllers/product.js';


const ProductRoutes = express.Router();
ProductRoutes.post('/create/:userID', ProductCreate);
ProductRoutes.put('/update/:id', Update);
ProductRoutes.delete('/delete/:id', Delete);
ProductRoutes.get('/getproducts/:userID',GetProduct)

export default ProductRoutes;