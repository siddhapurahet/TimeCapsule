import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFiles: {
        type: [String], // Explicitly define as array of strings
        default: [],
        validate: {
            validator: function(v) {
                return Array.isArray(v);
            },
            message: props => `${props.value} is not an array of strings!`
        }
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;