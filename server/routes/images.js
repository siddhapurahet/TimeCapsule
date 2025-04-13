// routes/imageRoutes.js
import express from 'express';
import { uploadMiddleware, uploadImages, uploadBase64Images } from '../controllers/images.js';

const router = express.Router();

// Route for uploading files
router.post('/upload', uploadMiddleware, uploadImages);

// Route for uploading base64 images
router.post('/upload-base64', uploadBase64Images);

export default router;

