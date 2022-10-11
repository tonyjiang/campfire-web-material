import "../editor/styles.css";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { UserContext } from "../user/UserContext";

const CourseEdit = (props) => {
  const [course, setCourse] = useState(props);
  const [editable, setEditable] = useState();
  const [error, setError] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setCourse(props);
  }, [props]);

  const handleSave = () => {
    let data = {
      user_id: user.id,
      title: course.title,
      description: course.description,
      year: course.year,
      term: course.term,
      start_date: course.start_date,
    };
    if (course.id) {
      axios
        .patch(`/api/v1/courses/${course.id}`, data)
        .catch((error) => {
          setError(error);
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location = process.env.REACT_APP_HOME_URL));
    } else {
      axios
        .post("/api/v1/courses", data)
        .catch((error) => {
          setError(error);
          console.error(error);
        })
        .then(() => (window.location = process.env.REACT_APP_HOME_URL));
    }
  };

  const handleCancel = () => {
    // this is not acceptable beyond MVP
    window.location = process.env.REACT_APP_HOME_URL;
  };

  const actionButtons = editable ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 2,
      }}
    >
      <Button
        variant="outlined"
        size="medium"
        sx={{ marginRight: 2 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button variant="contained" size="medium" onClick={handleSave}>
        Save
      </Button>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 2,
      }}
    >
      <Button
        variant="contained"
        size="medium"
        onClick={(e) => setEditable(true)}
      >
        Edit
      </Button>
    </Box>
  );

  if (error)
    return (
      <div>
        <h2>Error in CourseEdit.jsx! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
        <Stack spacing={3}>
          <TextField
            variant="outlined"
            label="Title"
            disabled={!editable}
            required
            value={course?.title || ""}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
          <TextField
            multiline
            rows={4}
            disabled={!editable}
            variant="outlined"
            label="Description"
            value={course?.description || ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControl sx={{ minWidth: 180 }}>
              <TextField
                variant="outlined"
                label="Year"
                value={course?.year || ""}
                disabled={!editable}
                required
                onChange={(e) => setCourse({ ...course, year: e.target.value })}
              />
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="demo-simple-select-helper-label">Term</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={course?.term || ""}
                label="Term"
                onChange={(e) => setCourse({ ...course, term: e.target.value })}
                disabled={!editable}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="spring">Spring</MenuItem>
                <MenuItem value="summer">Summer</MenuItem>
                <MenuItem value="fall">Fall</MenuItem>
                <MenuItem value="winter">Winter</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 180 }}>
              <TextField
                variant="outlined"
                label="Start Date"
                value={course?.start_date || ""}
                disabled={!editable}
                required
                onChange={(e) =>
                  setCourse({ ...course, start_date: e.target.value })
                }
              />
            </FormControl>
          </Box>
          {actionButtons}
        </Stack>
    </Box>
  );
};

export default CourseEdit;
