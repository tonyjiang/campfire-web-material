import {
  AddSharp as AddSharpIcon,
  Article as ArticleIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Groups as GroupsIcon,
  People as PeopleIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";

import {
  Box,
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
import Group from "./Group";
import GroupEdit from "./GroupEdit";

const LeftNav = (props) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const req1 = axios.get("/api/v1/courses?user_id=1");
    const req2 = axios.get("/api/v1/groups?user_id=1");
    Promise.all([req1, req2])
      .then(([resp1, resp2]) => {
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
    props.setCenterColumn(<CourseEdit editable={true} />);
  };

  const createNewGroup = (e) => {
    props.setCenterColumn(<GroupEdit editable={true} />);
  };

  const viewCourse = (course) => {
    props.setCenterColumn(<CourseEdit editable={false} {...course} />);
  };

  const viewGroup = (group) => {
    props.setCenterColumn(<Group {...group} />);
  };

  let courseList = (
    <List component="div" disablePadding>
      {courses.map((course) => (
        <ListItem key={course.id}>
          <ListItemButton sx={{ pl: 4 }} onClick={(e) => viewCourse(course)}>
            <ListItemIcon>
              <StarBorderIcon />
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
        <ListItem key={group.id}>
          <ListItemButton sx={{ pl: 4 }} onClick={(e) => viewGroup(group)}>
            <ListItemIcon>
              <StarBorderIcon />
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
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
            <Tooltip title="Create a new course" onClick={createNewCourse}>
              <AddSharpIcon sx={{ marginRight: 4 }} />
            </Tooltip>
          </ListItem>

          {courseList}

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <Tooltip title="Create a new group" onClick={createNewGroup}>
              <AddSharpIcon sx={{ marginRight: 4 }} />
            </Tooltip>
          </ListItem>

          {groupList}

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People" />
            </ListItemButton>
            <AddSharpIcon sx={{ marginRight: 4 }} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItemButton>
            <AddSharpIcon sx={{ marginRight: 4 }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftNav;
