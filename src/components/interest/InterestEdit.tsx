import { Box, Button, Checkbox, FormControlLabel, FormGroup, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const InterestEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [interest, setInterest] = useState(props);
  const [editable, setEditable] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const cachedUser = 1;

  useEffect(() => {
    setInterest(props);
    setEditable(props.editable ? true : false);
  }, [props]);

  setTimeout(() => {
    setLoading(false);
  }, [20]);

  const handleSave = () => {
    let data = {
      user_id: user.id,
      name: interest.name,
      description: interest.description,
      public: interest.public,
    };
    if (interest.id) {
      axios
        .patch(`/api/v1/interests/${interest.id}`, data)
        .catch((error) => {
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location =  process.env.REACT_APP_HOME_URL));
    } else {
      axios
        .post("/api/v1/interests", data)
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
            <input hidden value={interest?.id} />
            <TextField
              variant="outlined"
              label="Name"
              disabled={!editable}
              required
              value={interest?.name || ""}
              onChange={(e) => setInterest({ ...interest, name: e.target.value })}
            />
            <TextField
              multiline
              rows={4}
              disabled={!editable}
              variant="outlined"
              label="Description"
              value={interest?.description || ""}
              onChange={(e) =>
                setInterest({ ...interest, description: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox
                checked={interest?.public}
                onChange={(e) => setInterest({...interest, public: e.target.checked}) }
              />}
              label="Public"
            />
          </Stack>
        </FormGroup>
      )}
    </Box>
  );
};

export default InterestEdit;
