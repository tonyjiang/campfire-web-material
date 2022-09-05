import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import axios from "axios";

const PostsFeed = (props) => {
  const [error, setError] = useState();

  const addNewPost = (postText, images) => {
    const data = {
      context_type: props.contextType,
      context_id: props.contextId,
      post_text: postText,
      user_id: 1,
    };
    const formData = new FormData();
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
          author: { first_name: "John", last_name: "Smith" },
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
          Error in PostsFeed.jsx component! Look at the browser console for
          details.
        </h2>
        <hr />
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Stack spacing={1}>
      <CreatePost
        contextType={props.contextType}
        addNewPost={addNewPost}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
      {props.posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Stack>
  );
};

export default PostsFeed;
