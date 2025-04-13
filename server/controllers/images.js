import ImageKit from "imagekit";
import multer from 'multer';
import fs from 'fs';


console.log("ImageKit initialization values:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "missing",
  privateKeyPresent: process.env.IMAGEKIT_PRIVATE_KEY ? "yes" : "no",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "missing"
});

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

// Controller to handle upload to ImageKit
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = req.files.map(file => {
      return imagekit.upload({
        file: file.buffer.toString('base64'),
        fileName: `${Date.now()}_${file.originalname}`,
        folder: "/posts"
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    // Return only the URLs
    const imageUrls = uploadResults.map(result => result.url);
    
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    res.status(500).json({ message: "Error uploading images", error: error.message });
  }
};

// For base64 uploads (alternative option)
export const uploadBase64Images = async (req, res) => {
  try {
    const { images } = req.body;
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const uploadPromises = images.map((base64String, index) => {
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