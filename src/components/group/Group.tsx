import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import GroupEdit from "./GroupEdit";
import PostsFeed from "../post/PostsFeed";
import GroupMembers from "./GroupMembers";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Group = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { groupId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/posts?context_type=Group&context_id=${groupId}`)
      .then((resp) => {
        setPosts(resp.data);
        setSelectedTab(0);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>
          Error in Group.tsx! Look at the browser console for details.
        </h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Box>
        <PostsFeed posts={posts} setPosts={ setPosts } contextType="Group" contextId={groupId} />
    </Box>
  );
};

export default Group;
