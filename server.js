import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser'
import auth from './routes/auth.js'
import category from './routes/category.js'
import product from './routes/product.js'

dotenv.config();
await connectDB()

const app = express()
const port = process.env.PORT

app.use(cors({
  origin: `${process.env.PUBLIC_URL}`, 
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json()); 
app.use('/auth', auth);
app.use('/category', category)
app.use('/product', product)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
