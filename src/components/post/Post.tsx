import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  IosShareOutlined,
  MoreVert,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Post(props) {
  const [post, setPost] = useState(props.post);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState();
  const cachedUser = JSON.parse(localStorage.getItem("user") || "null");
  

  useEffect(() => {
    setPost(props.post);
    setComments(props.post.comments);
    setLikes(props.post.likes || []);
    setImageUrls(props.post.image_urls);
  }, [props]);

  const handleLikeClick = () => {
    const like = likes?.find((l) => l.user_id === cachedUser.id);
    if (like) {
      axios
        .delete(`/api/v1/posts/${post.id}/likes/${like.id}`)
        .then(() => {
          const newLikes = likes.filter(
            (like) => like.user_id !== cachedUser.id
          );
          setLikes(newLikes);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    } else {
      const data = {
        user_id: cachedUser.id,
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
        <h2>Error in Post.tsx! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

  const toLocalTime = (utcTime: string | number | Date) => {
    const utcDate = new Date(utcTime);
    return utcDate.toLocaleString([], { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
     });
  }

  return (
    <Card key={post.id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[400] }} aria-label="poster">
            {post.user.first_name.substring(0, 1) +
              post.user.last_name.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={`${post.user.first_name} ${post.user.last_name}`}
        subheader={toLocalTime(post.created_at)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.post_text}
        </Typography>
        {imageUrls?.length > 0 ? (
          <ImageList cols={1} rowHeight="auto">
            {imageUrls.map((imageUrl, index) => (
              <ImageListItem key={index}>
                <img src={imageUrl} alt="where-t-f-is-da-img?" />
              </ImageListItem>
            ))}
          </ImageList>
        ) : null}
      </CardContent>
      <CardActions sx={{ display: "flex" }}>
        {props.isComment ? null : (
          <IconButton sx={{ marginRight: "20px" }}>
            <ChatBubbleOutline style={{ marginRight: "12px" }} />
            {comments?.length ? (
              <span style={{ fontSize: "12px" }}>{comments.length}</span>
            ) : null}
          </IconButton>
        )}
        <IconButton sx={{ marginRight: "20px" }} onClick={handleLikeClick}>
          {likes?.find((like) => like.user_id === cachedUser.id) ? (
            <Favorite style={{ marginRight: "12px" }} />
          ) : (
            <FavoriteBorder style={{ marginRight: "12px" }} />
          )}
          {likes?.length ? (
            <span style={{ fontSize: "12px" }}>{likes.length}</span>
          ) : null}
        </IconButton>
        <IconButton aria-label="share">
          <IosShareOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}
