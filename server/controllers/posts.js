import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await postMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new postMessage(body);
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
        res.status(404).send('No post with id found');
    }
    
    const updatedPost = postMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);
}