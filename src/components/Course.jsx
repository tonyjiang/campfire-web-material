import { Box, Button, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import TableIcons from "./TableIcons";
import axios from "axios";

const Course = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(props);
  const [editable, setEditable] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const columns = [
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    {
      title: "Event Type",
      field: "event_type",
      lookup: {
        1: "Lecture",
        2: "Exam",
        3: "Discussion",
        4: "Presentation",
        5: "No class",
        6: "Other",
      },
    },
  ];

  useEffect(() => {
    setCourse(props);
    setEditable(props.editable ? true : false);
  }, [props]);

  setTimeout(() => {
    setLoading(false);
  }, [200]);

  const handleSaveCourse = () => {
    let data = {
      user_id: 1,
      title: course.title,
      description: course.description,
      year: course.year,
      term: course.term,
      location: course.location,
      start_date: course.start_date,
    };
    if (course.id) {
      axios
        .patch(`/api/v1/courses/${course.id}`, data)
        .catch((error) => {
          console.error(error);
        })
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

  const handleSaveEvents = () => {
    console.log(`Saving events for course.id ${course.id}`)
    eventsData.map(event => {
      event['course_id'] = course.id
    });
    axios
      .patch(`/api/v1/courses/${course.id}`, eventsData)
      .catch((error) => {
        console.error(error);
      })
      .then(() => (window.location = "http://127.0.0.1:8080"));
  };

  const handleCancel = () => {
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
      <Button variant="contained" size="large" onClick={handleSaveCourse}>
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

  const tableEditableConfig = editable ? {
    onRowAdd: (newData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setEventsData([...eventsData, newData]);
          resolve();
        }, 1000);
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...eventsData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setEventsData([...dataUpdate]);
          resolve();
        }, 1000);
      }),
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...eventsData];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setEventsData([...dataDelete]);
          resolve();
        }, 1000);
      }),
  } : null;

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
        </Stack>
      ) : (
        <form>
          <Stack spacing={3}>
            {pageTitle}
            <input hidden value={course?.id} />
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
            <TextField
              variant="outlined"
              label="Year"
              value={course?.year || ""}
              disabled={!editable}
              required
              onChange={(e) => setCourse({ ...course, year: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Term"
              value={course?.term || ""}
              disabled={!editable}
              onChange={(e) => setCourse({ ...course, term: e.target.value })}
            />
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
            <MaterialTable
              title="Course events"
              columns={columns}
              data={eventsData}
              icons={TableIcons}
              editable={tableEditableConfig}
            />
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default Course;
