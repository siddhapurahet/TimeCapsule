import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; 
        const total = await postMessage.countDocuments({});
        const posts = await postMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        
        // const postMessages = await postMessage.find();
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getPostsBySearch = async(req, res) => {
    const { searchQuery, tags} = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',')}}]});   
        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(200).json(newPost);

    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export const updatePost = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with id found');
    }
    
    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id found');
    }

    await postMessage.findByIdAndDelete(id);
    
    res.json({message: 'Post deleted successfully'});

}

export const likePost = async(req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id found');
    }

    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);
}