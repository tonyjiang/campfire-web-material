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

import Course from "./course/Course";
import CourseEdit from "./course/CourseEdit";
import Group from "./group/Group";
import GroupEdit from "./group/GroupEdit";

const LeftNav = (props) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

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
        setError(error);
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
    setSelectedCourse(course.id);
    setSelectedGroup(null);
    props.setCenterColumn(<Course {...course} />);
  };

  const viewGroup = (group) => {
    setSelectedGroup(group.id);
    setSelectedCourse(null);
    props.setCenterColumn(<Group {...group} />);
  };

  let courseList = (
    <List component="div" disablePadding>
      {courses.map((course) => (
        <ListItemButton
          key={course.id}
          sx={{ pl: 4 }}
          selected={selectedCourse === course.id}
          onClick={(e) => viewCourse(course)}
        >
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText primary={course.title} />
        </ListItemButton>
      ))}
    </List>
  );

  let groupList = (
    <List component="nav" disablePadding>
      {groups.map((group) => (
        <ListItemButton
          key={group.id}
          sx={{ pl: 4 }}
          selected={selectedGroup === group.id} onClick={(e) => viewGroup(group)}
        >
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText primary={group.name} />
        </ListItemButton>
      ))}
    </List>
  );

  if (loading) return <h2>'Loading .....'</h2>;
  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

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
