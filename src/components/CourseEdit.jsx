import { Box, Button, Skeleton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import MaterialTable from "material-table";
import TableIcons from './TableIcons';

const CourseEdit = () => {
  const [loading, setLoading] = useState(true);
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
  }, [2000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={100} />
        </Stack>
      ) : (
        <Stack spacing={3}>
          <h3>Create a new course</h3>
          <TextField
            variant="outlined"
            label="Title"
          />  
          <TextField
            multiline
            rows={4}
            variant="outlined"
            label="Description"
          />  
          <TextField
            variant="outlined"
            label="Location"
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
            <Button variant="outlined" size="large" sx={{ marginRight: 2 }}>Cancel</Button>
            <Button variant="contained" size="large">Save</Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default CourseEdit;
