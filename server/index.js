import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables FIRST before importing any routes that depend on them
// #region agent log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPathIndex = path.resolve(__dirname, '.env');
const logPath = path.resolve(__dirname, '../.cursor/debug.log');
try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:12',message:'Before dotenv.config in index.js',data:{publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,envPathIndex,envExists:fs.existsSync(envPathIndex)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix2',hypothesisId:'A'})+'\n');}catch(e){}
// #endregion

const dotenvResultIndex = dotenv.config({ path: envPathIndex });

// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:16',message:'After dotenv.config in index.js',data:{dotenvError:dotenvResultIndex?.error?.message,parsed:!!dotenvResultIndex?.parsed,publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A,C,D,E'})+'\n');}catch(e){}
// #endregion

// Now import routes after environment variables are loaded
// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:20',message:'Before importing imageRoutes',data:{publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C,D,E'})+'\n');}catch(e){}
// #endregion

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import imageRoutes from './routes/images.js';

const app =express();

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

// Handle CORS preflight requests explicitly
app.options('*', (req, res) => {
  // #region agent log
  try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:48',message:'CORS preflight OPTIONS request',data:{method:req.method,path:req.path,origin:req.headers.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'cors-debug',hypothesisId:'I'})+'\n');}catch(e){}
  // #endregion
  res.sendStatus(200);
});

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    // #region agent log
    try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:53',message:'Request received',data:{method:req.method,path:req.path,url:req.url,origin:req.headers.origin,contentType:req.headers['content-type']},timestamp:Date.now(),sessionId:'debug-session',runId:'request-debug',hypothesisId:'H'})+'\n');}catch(e){}
    // #endregion
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

const PORT = process.env.PORT || 5000;

// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:75',message:'Before mongoose.connect',data:{hasConnectionUrl:!!process.env.CONNECTION_URL,connectionUrlLength:process.env.CONNECTION_URL?.length,connectionUrlStart:process.env.CONNECTION_URL?.substring(0,20)},timestamp:Date.now(),sessionId:'debug-session',runId:'mongodb-debug',hypothesisId:'G'})+'\n');}catch(e){}
// #endregion

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        // #region agent log
        try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:79',message:'MongoDB connected successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'mongodb-debug',hypothesisId:'G'})+'\n');}catch(e){}
        // #endregion
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => {
        // #region agent log
        try{fs.appendFileSync(logPath,JSON.stringify({location:'index.js:84',message:'MongoDB connection error',data:{errorMessage:error?.message,errorName:error?.name,errorCode:error?.code,errorStack:error?.stack?.substring(0,500)},timestamp:Date.now(),sessionId:'debug-session',runId:'mongodb-debug',hypothesisId:'G'})+'\n');}catch(e){}
        // #endregion
        console.log(error.message);
    });
