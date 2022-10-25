import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import ClubEdit from "./ClubEdit";
import PostsFeed from "../post/PostsFeed";
import ClubMembers from "./ClubMembers";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Club = () => {
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { clubId } = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/posts?context_type=Club&context_id=${clubId}`)
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

  const handleTabChange = (_, id) => {
    setSelectedTab(id);
  };

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>
          Error in Club.jsx! Look at the browser console for details.
        </h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const clubHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Conversations" id={0} aria-controls="tab-0" />
          <SecondaryTab label="About" id={1} aria-controls="tab-1" />
          <SecondaryTab label="Members" id={2} aria-controls="tab-2" />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {clubHeader}
      {selectedTab === 0 ? (
        <PostsFeed posts={posts} setPosts={ setPosts } contextType="Club" contextId={clubId} />
      ) : selectedTab === 1 ? (
        <ClubEdit />
      ) : ( 
        <ClubMembers />
      )}
    </Box>
  );
};

export default Club;
