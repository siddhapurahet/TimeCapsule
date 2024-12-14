import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app =express();
dotenv.config();

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy','same-origin');
  next();
});
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
  origin: '*', // Or specify allowed origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send("Welcome to TimeCapsule API'S");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

