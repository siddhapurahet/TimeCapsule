import ImageKit from "imagekit";
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';


dotenv.config({ path: '../.env' });

// Configure ImageKit
var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

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
      
      return imagekit.upload({
        file: base64Data,
        fileName: `post_image_${Date.now()}_${index}`,
        folder: "/posts"
      });
    });
    
    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map(result => result.url);
    
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    res.status(500).json({ message: "Error uploading images", error: error.message });
  }
};  