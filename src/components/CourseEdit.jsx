import { Box, Skeleton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import CourseEvents from "./CourseEvents";

const CourseEdit = () => {
  const [loading, setLoading] = useState(true);

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
        <Stack>
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
          <CourseEvents />
        </Stack>
      )}
    </Box>
  );
};

export default CourseEdit;
