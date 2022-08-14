import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Group = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [group, setGroup] = useState(props);
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setGroup(props);
    setSelectedTab(0);
    axios
      .get(`/api/v1/posts?group_id=${group.id}&user_id=1`)
      .then((resp) => {
        console.log(JSON.stringify(resp));
        setPosts(resp);
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
  }

  if (loading)
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" height={100} />
        <Skeleton variant="text" height={100} />
      </Stack>
    );

  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const groupHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label={group.name} id={0} aria-controls='tab-0' />
          <SecondaryTab label="About" id={1} aria-controls='tab-1' />
          <SecondaryTab label="Members" id={2} aria-controls='tab-2' />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <FormGroup>
        <Stack spacing={3}>
          {groupHeader}
          <input hidden value={group?.id} />
          <TextField
            variant="outlined"
            label="Name"
            required
            value={group?.name || ""}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
          />
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Description"
            value={group?.description || ""}
            onChange={(e) =>
              setGroup({ ...group, description: e.target.value })
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={group?.public}
                onChange={(e) =>
                  setGroup({ ...group, public: e.target.checked })
                }
              />
            }
            label="Public"
          />
        </Stack>
      </FormGroup>
    </Box>
  );
};

export default Group;
