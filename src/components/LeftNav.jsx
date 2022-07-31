import {
  AddSharp,
  Article,
  FormatListBulleted,
  Groups,
  People,
  StarBorder,
} from "@mui/icons-material";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import CourseEdit from "./CourseEdit";

const LeftNav = (props) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const req1 = axios.get("/api/v1/courses?user_id=1")
    const req2 = axios.get("/api/v1/groups?user_id=1")
    Promise.all([req1, req2])
      .then(([resp1, resp2]) => {
        console.log(resp1.data);
        console.log(resp2.data);
        setCourses(resp1.data);
        setGroups(resp2.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createNewCourse = (e) => {
    props.setCenterColumn(<CourseEdit />);
  };

  let courseList = (
    <List component="div" disablePadding>
      {courses.map((course) => (
        <ListItem>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={course.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  let groupList = (
    <List component="div" disablePadding>
      {groups.map((group) => (
        <ListItem>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={group.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  if (loading) return <h2>'Loading .....'</h2>;

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
            <Tooltip
              title="Create a new course"
              onClick={(e) => createNewCourse(e)}
            >
              <IconButton>
                <AddSharp sx={{ marginRight: 4 }} />
              </IconButton>
            </Tooltip>
          </ListItem>

          {courseList}

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <Groups />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <Tooltip title="Create a new group">
              <AddSharp sx={{ marginRight: 4 }} />
            </Tooltip>
          </ListItem>

          {groupList}

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItemButton>
            <AddSharp sx={{ marginRight: 4 }} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton>
            <AddSharp sx={{ marginRight: 4 }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftNav;
