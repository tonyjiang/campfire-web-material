import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  styled,
  Typography,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  IosShareOutlined,
  MoreVert,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";

const CommentCard = styled(Card)(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "100%",
  marginLeft: "5px",
}));

const PostsFeed = (props) => {
  const [post, setPost] = useState(props.post);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setPost(props.post);
    setComments(props.post.comments);
    setLikes(props.post.likes);
  }, [props]);

  const postComments = () => {
    return (
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <CommentCard>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="user">
                    {comment.author.first_name.substring(0, 1) +
                      comment.author.last_name.substring(0, 1)}
                  </Avatar>
                }
                title={`${comment.author.first_name} ${comment.author.last_name}`}
                subheader={comment.created_at}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {comment.post_text}
                </Typography>
              </CardContent>
            </CommentCard>
          </ListItem>
        ))}
      </List>
    );
  };

  const addNewComment = (commentText) => {
    const data = {
      context_type: "Post",
      context_id: post.id,
      post_text: commentText,
      user_id: 2,
    };

    axios
      .post("/api/v1/posts", data)
      .then(() => {
        const comment = {
          ...data,
          author: { first_name: "John", last_name: "Smith" },
        };
        setComments([...comments, comment]);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  const handleLikeClick = () => {
    // the current user is hardcoded as 1
    const like = likes.find((like) => like.user_id === 1);
    if (like) {
      axios
        .delete(`/api/v1/posts/${post.id}/likes/${like.id}`)
        .then((resp) => {
          const newLikes = likes.filter((like) => like.user_id !== 1);
          setLikes(newLikes);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      const data = {
        user_id: 1,
        likable_type: "Post",
        likable_id: post.id,
      };
      axios
        .post(`/api/v1/posts/${post.id}/likes`, data)
        .then((resp) => {
          const newLikes = [...likes, resp.data];
          setLikes(newLikes);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  };

  if (error)
    return (
      <div>
        <h2>Error in Post.jsx! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

  return (
    <Card key={post.id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[400] }} aria-label="poster">
            {post.author.first_name.substring(0, 1) +
              post.author.last_name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${post.author.first_name} ${post.author.last_name}`}
        subheader={post.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.post_text}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        <IconButton sx={{ marginRight: "20px" }}>
          <ChatBubbleOutline style={{ marginRight: "12px" }} />
          {comments.length ? <span style={{ fontSize: "12px" }}>{comments.length}</span> : null}
        </IconButton>
        <IconButton sx={{ marginRight: "20px" }} onClick={handleLikeClick}>
          {likes.find((like) => like.user_id === 1) ? (
            <Favorite style={{ marginRight: "12px" }}
            />
          ) : (
            <FavoriteBorder style={{ marginRight: "12px" }} />
          )}
          {likes.length ? <span style={{ fontSize: "12px" }}>{likes.length}</span> : null}
        </IconButton>
        <IconButton aria-label="share">
          <IosShareOutlined />
        </IconButton>
      </CardActions>
      <CreatePost
        contextType="Post"
        addNewPost={addNewComment}
        style={{ marginLeft: "20px" }}
      />
      {postComments()}
    </Card>
  );
};

export default PostsFeed;
