// routes/imageRoutes.js
import express from 'express';
import { uploadMiddleware, uploadBase64Images } from '../controllers/images.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.resolve(__dirname, '../../.cursor/debug.log');

const router = express.Router();

// Middleware to log all requests to image routes
router.use((req, res, next) => {
  // #region agent log
  try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:15',message:'Image route request received',data:{method:req.method,path:req.path,url:req.url,headers:req.headers['content-type'],hasBody:!!req.body},timestamp:Date.now(),sessionId:'debug-session',runId:'route-debug',hypothesisId:'H'})+'\n');}catch(e){}
  // #endregion
  next();
});

// Route for uploading files
// router.post('/upload', uploadMiddleware, uploadImages);

// Route for uploading base64 images (JSON body, not multipart/form-data)
router.post('/upload-base64', (req, res, next) => {
  // #region agent log
  try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:25',message:'upload-base64 route handler called',data:{method:req.method,contentType:req.headers['content-type'],bodyType:typeof req.body,bodyKeys:req.body ? Object.keys(req.body) : [],bodySize:req.body ? JSON.stringify(req.body).length : 0},timestamp:Date.now(),sessionId:'debug-session',runId:'route-debug',hypothesisId:'H'})+'\n');}catch(e){}
  // #endregion
  next();
}, uploadBase64Images);

export default router;

