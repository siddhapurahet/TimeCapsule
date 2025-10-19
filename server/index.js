import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
import imageRoutes from './routes/images.js';

const app =express();
dotenv.config({ path: '../.env' });

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy','same-origin-allow-popups');
  next();
});
app.use(bodyParser.json({ limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true}));
app.use(cors({
  origin: ['https://timecapsule-client.onrender.com', 'http://localhost:3000'], // Or specify allowed origins
  methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true

}));

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
// In your main server file (index.js or app.js)

app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to TimeCapsule API'S");
})

// Test endpoint for debugging
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!', timestamp: new Date() });
})

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
