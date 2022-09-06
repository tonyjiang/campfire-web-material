import {
  Box,
  Button,
  Card,
  CardActions,
  IconButton,
  ImageList,
  ImageListItem,
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
  const [inputInFocus, setInputInFocus] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleInputChange = (e) => {
    setInputInFocus(true);
    setPostText(e.target.value);
  };

  const sendPost = () => {
    props.addNewPost(postText, images);
    setPostText("");
    setImages([]);
    setInputInFocus(false);
  };

  return (
    <Card style={props.style}>
      <TextField
        fullWidth
        multiline
        style={{ marginTop: "5px" }}
        variant="outlined"
        label={props.contextType === "Post" ? "Comment" : "Post"}
        InputLabelProps={{ shrink: inputInFocus }}
        value={postText}
        onChange={(e) => handleInputChange(e)}
      />
      {images.length === 0 ? null : (
        <ImageList cols={3} rowHeight='auto'>
          {images.map((image) => (
            <ImageListItem key={ image.name }>
              <img
                src={URL.createObjectURL(image)}
                alt="where-t-f-is-da-img?"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <IconButton aria-label="media" component="label">
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleImageChange}
            />
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
