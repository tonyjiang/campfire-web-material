import { Box, Button, Checkbox, FormControlLabel, FormGroup, Skeleton, Stack, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../user/UserContext";

const GroupEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(props);
  const [editable, setEditable] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setGroup(props);
    setEditable(props.editable ? true : false);
  }, [props]);

  setTimeout(() => {
    setLoading(false);
  }, [20]);

  const handleSave = () => {
    let data = {
      user_id: user.id,
      name: group.name,
      description: group.description,
      public: group.public,
    };
    if (group.id) {
      axios
        .patch(`/api/v1/groups/${group.id}`, data)
        .catch((error) => {
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location =  process.env.REACT_APP_HOME_URL));
    } else {
      axios
        .post("/api/v1/groups", data)
        .catch((error) => {
          console.error(error);
        })
        .then(() => (window.location =  process.env.REACT_APP_HOME_URL));
    }
  };

  const handleCancel = () => {
    // this is not acceptable beyond MVP
    window.location =  process.env.REACT_APP_HOME_URL;
  };

  const pageTitle = editable ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 2,
        paddingRight: 2,
      }}
    >
      <Button
        variant="outlined"
        size="large"
        sx={{ marginRight: 2 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button variant="contained" size="large" onClick={handleSave}>
        Save
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: 2,
        paddingRight: 2,
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={(e) => setEditable(true)}
      >
        Edit
      </Button>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
        </Stack>
      ) : (
        <FormGroup>
          <Stack spacing={3}>
            {pageTitle}
            <input hidden value={group?.id} />
            <TextField
              variant="outlined"
              label="Name"
              disabled={!editable}
              required
              value={group?.name || ""}
              onChange={(e) => setGroup({ ...group, name: e.target.value })}
            />
            <TextField
              multiline
              rows={4}
              disabled={!editable}
              variant="outlined"
              label="Description"
              value={group?.description || ""}
              onChange={(e) =>
                setGroup({ ...group, description: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox
                checked={group?.public}
                onChange={(e) => setGroup({...group, public: e.target.checked}) }
              />}
              label="Public"
            />
          </Stack>
        </FormGroup>
      )}
    </Box>
  );
};

export default GroupEdit;
