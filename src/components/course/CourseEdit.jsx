import { Box, Button, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import TableIcons from "../TableIcons";
import axios from "axios";

const CourseEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(props);
  const [editable, setEditable] = useState(true);
  const [courseEvents, setCourseEvents] = useState([]);
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [error, setError] = useState();

  const columns = [
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    {
      title: "Event Type",
      field: "event_type",
      lookup: {
        lecture: "Lecture",
        exam: "Exam",
        discussion: "Discussion",
        presentation: "Presentation",
        no_class: "No class",
        other: "Other",
      },
    },
    {
      title: "Time",
      field: "event_time",
      initialEditValue: "2022-02-22 14:30",
    },
    { title: "id", hidden: true },
  ];

  useEffect(() => {
    setCourse(props);
    setEditable(props.editable ? true : false);
    axios
      .get(`/api/v1/courses/${props.id}`)
      .then((resp) => {
        setCourseEvents(resp.data.events);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [props]);

  setTimeout(() => {
    setLoading(false);
  }, [200]);

  const handleSaveCourse = () => {
    courseEvents.forEach((event) => delete event["tableData"]);
    let data = {
      user_id: 1,
      title: course.title,
      description: course.description,
      year: course.year,
      term: course.term,
      location: course.location,
      start_date: course.start_date,
      events: courseEvents,
      deleted_events: deletedEvents,
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

  const editableTableConfig = editable
    ? {
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setCourseEvents([...courseEvents, newData]);
              resolve();
            }, 500);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...courseEvents];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setCourseEvents([...dataUpdate]);
              resolve();
            }, 500);
          }),
        onRowDelete: (deletedRow) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const events = [...courseEvents];
              const index = deletedRow.tableData.id;
              events.splice(index, 1);
              setCourseEvents([...events]);
              if (deletedRow.id)
                setDeletedEvents([...deletedEvents, deletedRow.id]);
              resolve();
            }, 500);
          }),
      }
    : null;

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
              data={courseEvents}
              icons={TableIcons}
              editable={editableTableConfig}
            />
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default CourseEdit;
