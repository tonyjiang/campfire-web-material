import { Box, Skeleton } from "@mui/material";

import React, { useEffect, useState } from "react";
import PostsFeed from "./post/PostsFeed";
import axios from "../api/axios";

const HomeFeed = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios
      .get(`/api/v1/users/${user.id}/feed`)
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>
          Error in HomeFeed.jsx component! Look at the browser console for
          details.
        </h2>
        <hr />
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Box>
      {
        <
          PostsFeed
          posts={posts}
          setPosts={setPosts}
          contextType="User"
          contextId={1}
        />
      }
    </Box>
  );
};

export default HomeFeed;
