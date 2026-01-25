import ImageKit from "imagekit";
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// #region agent log
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// .env file is located at server/.env, so from server/controllers/ we need to go up one level
const envPath = path.resolve(__dirname, '../.env');
const logPath = path.resolve(__dirname, '../../.cursor/debug.log');
try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:12',message:'Before dotenv.config',data:{publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,envPath,__dirname,cwd:process.cwd(),envExists:fs.existsSync(envPath)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix2',hypothesisId:'A'})+'\n');}catch(e){}
// #endregion

// Fix: Use absolute path resolved from __dirname to correctly point to server/.env
const dotenvResult = dotenv.config({ path: envPath });

// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:16',message:'After dotenv.config',data:{dotenvError:dotenvResult?.error?.message,parsed:!!dotenvResult?.parsed,publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,envPathExists:fs.existsSync(envPath)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A,B,C,D'})+'\n');}catch(e){}
// #endregion

// Configure ImageKit
// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:22',message:'Before ImageKit initialization',data:{publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKey:!!process.env.IMAGEKIT_PRIVATE_KEY,urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,publicKeyType:typeof process.env.IMAGEKIT_PUBLIC_KEY,publicKeyLength:process.env.IMAGEKIT_PUBLIC_KEY?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B,C,D'})+'\n');}catch(e){}
// #endregion

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// #region agent log
try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:29',message:'After ImageKit initialization',data:{success:!!imagekit},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C,D'})+'\n');}catch(e){}
// #endregion

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  }
});

// Middleware to handle file upload
export const uploadMiddleware = upload.array('images', 5); // 'images' is the field name, 10 is max count


// For base64 uploads
export const uploadBase64Images = async (req, res) => {
  try {
    // #region agent log
    try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:53',message:'uploadBase64Images called',data:{hasBody:!!req.body,imagesCount:req.body?.images?.length,publicKey:process.env.IMAGEKIT_PUBLIC_KEY,privateKeyLength:process.env.IMAGEKIT_PRIVATE_KEY?.length,privateKeyStart:process.env.IMAGEKIT_PRIVATE_KEY?.substring(0,10),urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-debug',hypothesisId:'F'})+'\n');}catch(e){}
    // #endregion
    
    console.log("Received upload request", req.body ? "with body" : "without body");
    
    const { images } = req.body;
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      console.log("Invalid images data received:", images);
      return res.status(400).json({ message: "No images provided or invalid format" });
    }
    
    console.log("Processing", images.length, "images");
    
    const uploadPromises = images.map((base64String, index) => {
      // Check if it's already a valid base64 string
      if (!base64String || typeof base64String !== 'string') {
        throw new Error(`Invalid image data at index ${index}`);
      }
      
      // Extract base64 data without the prefix
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
      
      // #region agent log
      try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:74',message:'Before imagekit.upload',data:{index,base64DataLength:base64Data.length,fileName:`post_image_${Date.now()}_${index}`},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-debug',hypothesisId:'F'})+'\n');}catch(e){}
      // #endregion
      
      return imagekit.upload({
        file: base64Data,
        fileName: `post_image_${Date.now()}_${index}`,
        folder: "/posts"
      }).catch((uploadError) => {
        // #region agent log
        try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:82',message:'ImageKit upload error caught',data:{errorMessage:uploadError?.message,errorName:uploadError?.name,errorStack:uploadError?.stack?.substring(0,500),errorResponse:uploadError?.response,errorStatus:uploadError?.status,errorStatusText:uploadError?.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-debug',hypothesisId:'F'})+'\n');}catch(e){}
        // #endregion
        throw uploadError;
      });
    });
    
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map(result => result.url);
    
    // #region agent log
    try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:90',message:'Upload successful',data:{imageUrlsCount:imageUrls.length},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-debug',hypothesisId:'F'})+'\n');}catch(e){}
    // #endregion
    
    res.status(200).json({ imageUrls });
  } catch (error) {
    // #region agent log
    try{fs.appendFileSync(logPath,JSON.stringify({location:'images.js:95',message:'uploadBase64Images catch block',data:{errorMessage:error?.message,errorName:error?.name,errorStack:error?.stack?.substring(0,500),errorResponse:error?.response,errorCode:error?.code,errorStatus:error?.status},timestamp:Date.now(),sessionId:'debug-session',runId:'auth-debug',hypothesisId:'F'})+'\n');}catch(e){}
    // #endregion
    
    console.error('ImageKit upload error:', error);
    res.status(500).json({ message: "Error uploading images", error: error.message });
  }
};  