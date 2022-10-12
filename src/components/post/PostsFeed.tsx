import { Stack } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import axios from "../../api/axios";

const PostsFeed = (props) => {
  const [error, setError] = useState();
  const cachedUser = JSON.parse(localStorage.getItem('user'));

  const addNewPost = (postText, images) => {
    const data = {
      context_type: props.contextType,
      context_id: props.contextId,
      post_text: postText,
      user_id: cachedUser.id,
    };
    const formData = new FormData();
    formData.append('context_type', props.contextType);
    for (let key in data) formData.append(`post[${key}]`, data[key]);
    if (images?.length > 0) {
      images.forEach(image => {
        formData.append('post[images][]', image);
      })
    }

    axios
      .post("/api/v1/posts", formData)
      .then((resp) => {
        const post = {
          id: resp.data.id,
          image_urls: resp.data.image_urls,
          author: cachedUser,
          ...data,
        };
        props.setPosts([post, ...props.posts]);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  if (error)
    return (
      <div>
        <h2>
          Error in PostsFeed.tsx component! Look at the browser console for
          details.
        </h2>
        <hr />
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Stack 
      direction={{ xs: "column-reverse"}} 
      spacing={1}
      maxHeight={"100%"}
      justifyContent={"flex-start"}
    >
      <CreatePost
        contextType={props.contextType}
        addNewPost={addNewPost}
        style={{ marginBottom: "10px" }}
      />

      {props.posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Stack>
  );
};

export default PostsFeed;
