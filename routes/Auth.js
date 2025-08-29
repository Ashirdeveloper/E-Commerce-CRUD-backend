import express from 'express';
import { Register,Login } from '../controllers/Auth.js';

const AuthRoutes = express.Router();
AuthRoutes.post('/register', Register);
AuthRoutes.post('/login', Login);

export default AuthRoutes;