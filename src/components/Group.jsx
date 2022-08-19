import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import GroupEdit from "./GroupEdit";
import GroupFeed from "./GroupFeed";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Group = (props) => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(props);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setGroup(props);
    setSelectedTab(0);
    setTimeout(() => {
      setLoading(false);
    }, [500]);
  }, [props]);

  const handleTabChange = (_, id) => {
    setSelectedTab(id);
  };

  if (loading) return <Skeleton variant="text" height={100} />;

  const groupHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label={group.name} id={0} aria-controls="tab-0" />
          <SecondaryTab label="About" id={1} aria-controls="tab-1" />
          <SecondaryTab label="Members" id={2} aria-controls="tab-2" />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {groupHeader}
      {selectedTab === 0 ? (
        <GroupFeed {...group} setGroupLoading={setLoading} />
      ) : selectedTab === 1 ? (
        <GroupEdit {...group} />
      ) : (
        <div />
      )}
    </Box>
  );
};

export default Group;
