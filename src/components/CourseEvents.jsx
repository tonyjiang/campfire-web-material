import { Box, Button, Skeleton, Stack, TextField } from "@mui/material";
import MaterialTable from "material-table";
import { useState } from "react";
import TableIcons from './TableIcons';

const CourseEvents = (courseId, events) => {
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

  const [data, setData] = useState([]);

  return (
    <>
      <MaterialTable
        title="Edit course events"
        columns={columns}
        data={data}
        icons={TableIcons}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", paddingTop: 2, paddingRight: 2 }}>
        <Button variant="outlined" size="large" sx={{ marginRight: 2 }}>Cancel</Button>
        <Button variant="contained" size="large">Save</Button>
      </Box>
    </>
  );
};

export default CourseEvents;
