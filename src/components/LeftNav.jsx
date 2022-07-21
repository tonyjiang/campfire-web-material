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
    axios
      .get("/api/v1/courses?user_id=1")
      .then((resp) => {
        console.log(resp.data);
        setCourses(resp.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const createNewClass = (e) => {
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
              <ListItemText primary="Classes" />
            </ListItemButton>
            <Tooltip
              title="Create a new class"
              onClick={(e) => createNewClass(e)}
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
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Breakout Discussion 1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Breakout Discussion 2" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Campus Soccer League" />
            </ListItemButton>
          </List>

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
