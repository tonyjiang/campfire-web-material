import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  ImageList,
  ImageListItem,
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
import axios from "../../api/axios";

import CreatePost from "./CreatePost";
import Post from "./Post";

const CommentCard = styled(Card)(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "100%",
  marginLeft: "5px",
}));

export default function Thread(props) {
  // "op" is the original post of the thread
  const [op, setOp] = useState(props.op);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState();
  const cachedUser = JSON.parse(localStorage.getItem("user") || "");

  useEffect(() => {
    setOp(props.op);
    setComments(props.op.comments);
    setLikes(props.op.likes || []);
    setImageUrls(props.op.image_urls);
  }, [props]);

  const renderedComments = () => {
    return (
      <List>
        {comments?.map((comment) => (
          <ListItem key={comment.id}>
            <Post post={comment} isComment={true} />
          </ListItem>
        ))}
      </List>
    );
  };

  const addNewComment = (commentText) => {
    const data = {
      context_type: "Post",
      context_id: op.id,
      post_text: commentText,
      user_id: cachedUser.id,
    };

    axios
      .post("/api/v1/posts", data)
      .then(() => {
        const comment = {
          ...data,
          author: cachedUser,
        };
        setComments([...comments, comment]);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  const handleLikeClick = () => {
    const like = likes?.find((like) => like.user_id === cachedUser.id);
    if (like) {
      axios
        .delete(`/api/v1/posts/${op.id}/likes/${like.id}`)
        .then(() => {
          const newLikes = likes.filter((like) => like.user_id !== cachedUser.id);
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
        likable_id: op.id,
      };
      axios
        .post(`/api/v1/posts/${op.id}/likes`, data)
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
        <h2>Error in Thread.tsx! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

  return (
    <Card key={op.id}>
      <CreatePost
        contextType="Post"
        addNewPost={addNewComment}
        style={{ marginLeft: "20px" }}
      />
      <Post post={op} isComment={false} />
      { renderedComments() }
    </Card>
  );
};
