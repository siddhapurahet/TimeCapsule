import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    console.log('PostDetails mounted with ID:', id);
    const fetchPost = async () => {
      const result = await dispatch(getPost(id));
      console.log('Post fetch result:', result);
    };
    fetchPost();
  }, [id, dispatch]);

  useEffect(() => {
    if (post?.tags?.length > 0) {
      console.log('Fetching related posts for tags:', post.tags);
      const searchQuery = {
        search: 'none',
        tags: post.tags.join(',')
      };
      dispatch(getPostsBySearch(searchQuery));
    }
  }, [post?.tags, dispatch]);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (!post) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <Typography variant="h6" gutterBottom>Post not found</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate.push('/')}
        >
          Return to Home
        </Button>
      </Paper>
    );
  }

  const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id) || [];
  const openPost = (_id) => navigate.push(`/posts/${_id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px", margin: "20px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>

          {/* <Divider style={{ margin: "20px 0" }} /> */}
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography> */}
          {/* <Divider style={{ margin: "20px 0" }} /> */}
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography> */}
          {/* <CommentSection post={post} /> */}
          {/* <Divider style={{ margin: "20px 0" }} /> */}
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    className={classes.recommendedPostImage}
                    src={selectedFile}
                    alt={title}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
