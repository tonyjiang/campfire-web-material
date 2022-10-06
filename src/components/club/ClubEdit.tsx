import { Box, Button, Checkbox, FormControlLabel, FormGroup, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClubEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(props);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    setClub(props);
    setEditable(props.editable ? true : false);
  }, [props]);

  setTimeout(() => {
    setLoading(false);
  }, [20]);

  const handleSave = () => {
    let data = {
      user_id: 1,
      name: club.name,
      description: club.description,
      public: club.public,
    };
    if (club.id) {
      axios
        .patch(`/api/v1/clubs/${club.id}`, data)
        .catch((error) => {
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location = "http://127.0.0.1:8080"));
    } else {
      axios
        .post("/api/v1/clubs", data)
        .catch((error) => {
          console.error(error);
        })
        .then(() => (window.location = "http://127.0.0.1:8080"));
    }
  };

  const handleCancel = () => {
    // this is not acceptable beyond MVP
    window.location = "http://127.0.0.1:8080";
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
            <input hidden value={club?.id} />
            <TextField
              variant="outlined"
              label="Name"
              disabled={!editable}
              required
              value={club?.name || ""}
              onChange={(e) => setClub({ ...club, name: e.target.value })}
            />
            <TextField
              multiline
              rows={4}
              disabled={!editable}
              variant="outlined"
              label="Description"
              value={club?.description || ""}
              onChange={(e) =>
                setClub({ ...club, description: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox
                checked={club?.public}
                onChange={(e) => setClub({...club, public: e.target.checked}) }
              />}
              label="Public"
            />
          </Stack>
        </FormGroup>
      )}
    </Box>
  );
};

export default ClubEdit;
