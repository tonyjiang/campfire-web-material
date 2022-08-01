import { Box, Button, Skeleton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import MaterialTable from "material-table";
import TableIcons from './TableIcons';
import axios from "axios";

const CourseEdit = (props) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(props?.title);
  const [year, setYear] = useState();
  const [term, setTerm] = useState();
  const [startDate, setStartDate] = useState();
  const [description, setDescription] = useState(props?.description);
  const [location, setLocation] = useState(props?.location);
  const [eventsData, setEventsData] = useState([]);
  const columns = [
    { title: "Title", field: "title" },
    { title: "Description", field: "description" },
    {
      title: "Event Type",
      field: "eventType",
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

  setTimeout(() => {
    setLoading(false);
  }, [200]);

  const handleSave = () => {
    let course = {
      user_id: 1,
      title: title,
      description: description,
      year: year,
      term: term,
      location: location,
      start_date: startDate,
    }
    if (props && props.courseId) {
      course['courseId'] = props.courseId
    }
    axios.post('/api/v1/courses', course).catch(error => {
      console.error(error)
    })
      .then(() => window.location = "http://127.0.0.1:8080")
  }

  const handleCancel = () => {

  }

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
          <h3>Create a new course</h3>
          <TextField
            variant="outlined"
            label="Title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />  
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Year"
            value={year}
            required
            onChange={e => setYear(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Term"
            value={term}
            required
            onChange={e => setTerm(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Start Date"
            value={startDate}
            required
            onChange={e => setStartDate(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <MaterialTable
            title="Course events"
            columns={columns}
            data={eventsData}
            icons={TableIcons}
            editable={{
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
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: 2, paddingRight: 2 }}>
            <Button variant="outlined" size="large" sx={{ marginRight: 2 }} onClick={e => handleCancel()}>Cancel</Button>
            <Button variant="contained" size="large" onClick={e => handleSave()}>Save</Button>
          </Box>
        </Stack>
        </form>
      )}
    </Box>
  );
};

export default CourseEdit;
