import {
  Box,
  Button,
  Card,
  CardActions,
  IconButton,
  TextField,
} from "@mui/material";
import {
  GifBoxOutlined,
  MoodOutlined,
  PhotoOutlined,
} from "@mui/icons-material";

import React, { useState } from "react";

const CreatePost = (props) => {
  const [postText, setPostText] = useState();
  const [inFocus, setInFocus] = useState(false);

  const handleInputChange = (e) => {
    setInFocus(true);
    setPostText(e.target.value);
  };

  const sendPost = () => {
    props.addNewPost(postText);
    setPostText("");
    setInFocus(false);
  };

  return (
    <Card style={props.style}>
      <TextField
        fullWidth
        multiline
        style={{ marginTop: "5px" }}
        variant="outlined"
        label={props.contextType === "Post" ? "Comment" : "Post"}
        InputLabelProps={{ shrink: inFocus }}
        value={postText}
        onChange={(e) => handleInputChange(e)}
      />
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <IconButton aria-label="media">
            <PhotoOutlined />
          </IconButton>
          <IconButton aria-label="emoji">
            <MoodOutlined />
          </IconButton>
          <IconButton aria-label="gif">
            <GifBoxOutlined />
          </IconButton>
        </Box>
        <Button
          variant="outlined"
          style={{ marginRight: "25px" }}
          onClick={() => sendPost()}
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;
