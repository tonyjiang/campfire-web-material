import {
  Card,
  List,
  ListItem,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Thread(props) {
  // "op" is the original post of the thread
  const [op, setOp] = useState(props.op);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState();
  const cachedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    setOp(props.op);
    setComments(props.op.comments || []);
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
          user: cachedUser,
        };
        setComments([...comments, comment]);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
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
      <Post post={op} />
      <CreatePost
        contextType="Post"
        addNewPost={addNewComment}
        style={{ marginLeft: "20px" }}
      />
      { renderedComments() }
    </Card>
  );
};
