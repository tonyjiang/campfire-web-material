import "../editor/styles.css";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../editor/Editor";

const CourseEditRichText = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(props);
  const [editable, setEditable] = useState(true);
  const [syllabus, setSyllabus] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setCourse(props);
    setEditable(props.editable ? true : false);
    axios
      .get(`/api/v1/courses/${props.id}`)
      .then((resp) => {
        setSyllabus(resp.data.syllabus);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleSave = () => {
    let data = {
      user_id: 1,
      title: course.title,
      description: course.description,
      year: course.year,
      term: course.term,
      location: course.location,
      start_date: course.start_date,
      syllabus: syllabus,
    };
    if (course.id) {
      axios
        .patch(`/api/v1/courses/${course.id}`, data)
        .catch((error) => {
          console.error(error);
        })
        // this is not acceptable beyond MVP
        .then(() => (window.location = "http://127.0.0.1:8080"));
    } else {
      axios
        .post("/api/v1/courses", data)
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

  const editButton = editable ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: 2,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        sx={{ marginRight: 2 }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button variant="contained" size="small" onClick={handleSave}>
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
        size="small"
        onClick={(e) => setEditable(true)}
      >
        Edit
      </Button>
    </Box>
  );

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
        </Stack>
      ) : (
        <Stack spacing={3}>
          {editButton}
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
            rows={3}
            disabled={!editable}
            variant="outlined"
            label="Description"
            value={course?.description || ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              variant="outlined"
              label="Year"
              value={course?.year || ""}
              disabled={!editable}
              sx={{ marginTop: "6px", marginRight: "125px" }}
              required
              onChange={(e) => setCourse({ ...course, year: e.target.value })}
            />
            <FormControl sx={{ m: 1, minWidth: 180 }}>
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            <TextField
              variant="outlined"
              label="Location"
              disabled={!editable}
              value={course?.location || ""}
              onChange={(e) =>
                setCourse({ ...course, location: e.target.value })
              }
            />
          </Box>
          <Editor
            initialConfig={{ editable: editable, editorState: syllabus }}
          />
        </Stack>
      )}
    </Box>
  );
};

export default CourseEditRichText;
