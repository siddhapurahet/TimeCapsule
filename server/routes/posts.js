import express from 'express';
import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getPost);   
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

// In your post route, add a test endpoint
// router.post('/test-selectedfiles', async (req, res) => {
//     try {
//         const testPost = new postMessage({
//             title: "Test Post",
//             message: "Testing selectedFiles",
//             creator: "test-user",
//             tags: ["test"],
//             selectedFiles: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="] // Tiny 1x1 pixel
//         });
        
//         const savedPost = await testPost.save();
//         const retrievedPost = await postMessage.findById(savedPost._id);
        
//         res.json({
//             savedPost: savedPost.toObject(),
//             retrievedPost: retrievedPost.toObject(),
//             hasSelectedFiles: retrievedPost.hasOwnProperty('selectedFiles'),
//             selectedFilesIsArray: Array.isArray(retrievedPost.selectedFiles),
//             selectedFilesLength: Array.isArray(retrievedPost.selectedFiles) ? retrievedPost.selectedFiles.length : 'not an array'
//         });
//     } catch (error) {
//         console.error("Test error:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

export default router;