import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "./Post";

const PostsFeed = (props) => {
  const [posts, setPosts] = useState(props.posts);

  useEffect(() => {
    setPosts(props.posts);
  }, [props]);

  return (
    <Stack spacing={1}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </Stack>
  );
};

export default PostsFeed;
