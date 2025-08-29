import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
const PORT = process.env.PORT|| 3000;
import connectDB from './libs/db.js';
import AuthRoutes from './routes/Auth.js';
import ProductRoutes from './routes/Product.js';
const app = express();
connectDB();

app.use(express.json());
app.use(cors("*"))
app.use('/auth',AuthRoutes)
app.use('/product',ProductRoutes)

app.get('/', (req, res) => {
    res.send('Hello')
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});