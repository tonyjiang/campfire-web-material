import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import ChannelEdit from "./ChannelEdit";
import PostsFeed from "../post/PostsFeed";
import ChannelMembers from "./ChannelMembers";
import axios from "axios";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Channel = (props) => {
  const [channel, setChannel] = useState(props);
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/posts?context_type=Channel&context_id=${props.id}`)
      .then((resp) => {
        setPosts(resp.data);
        setChannel(props);
        setSelectedTab(0);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleTabChange = (_, id) => {
    setSelectedTab(id);
  };

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>
          Error in Channel.jsx! Look at the browser console for details.
        </h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const channelHeader = (
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
      {channelHeader}
      {selectedTab === 0 ? (
        <PostsFeed posts={posts} setPosts={ setPosts } contextType="Channel" contextId={channel.id} />
      ) : selectedTab === 1 ? (
        <ChannelEdit {...channel} />
      ) : ( 
        <ChannelMembers {...channel} />
      )}
    </Box>
  );
};

export default Channel;
