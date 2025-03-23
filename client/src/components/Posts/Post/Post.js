import React, { useState } from "react";
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useHistory } from "react-router-dom";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const Post = ({post, setcurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isExpanded, setIsExpanded] = useState(false);
    
    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
                ) : (
                <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }
        return <><ThumbUpOutlinedIcon fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {  
        navigate.push(`/posts/${post._id}`);
    }

    const handleSetCurrentId = (e) => {
        e.stopPropagation();
        if (setcurrentId && post?._id) {
            setcurrentId(post._id);
        }
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <div className={classes.clickableArea} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button 
                            style={{color: 'white'}} 
                            size="small" 
                            onClick={handleSetCurrentId}
                        >
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags?.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} color="textSecondary" variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent className={classes.cardContent}>
                    <Typography 
                        color="textSecondary" 
                        variant="body2" 
                        component="p"
                        className={classes.message}
                        sx={{
                            display: isExpanded ? 'block' : '-webkit-box',
                            WebkitLineClamp: isExpanded ? 'none' : 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: isExpanded ? 'visible' : 'hidden',
                        }}
                    >
                        {post.message}
                    </Typography>
                    {post.message?.length > 150 && (
                        <Button 
                            size="small" 
                            color="primary" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            sx={{ mt: 1 }}
                        >
                            {isExpanded ? 'Show Less' : 'Read More'}
                        </Button>
                    )}
                </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button 
                    size="small" 
                    color="primary" 
                    disabled={!user?.result} 
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(likePost(post._id));
                    }}
                >
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deletePost(post._id));
                        }}
                    >
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
};

export default Post;