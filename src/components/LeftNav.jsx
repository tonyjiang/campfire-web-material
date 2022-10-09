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
  Skeleton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";

import Course from "./course/Course";
import CourseEdit from "./course/CourseEdit";
import Group from "./group/Group";
import GroupEdit from "./group/GroupEdit";
import { UserContext } from "./user/UserContext";

const LeftNav = (props) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const req1 = axios.get(`/api/v1/courses?user_id=${user.id}`);
    const req2 = axios.get(`/api/v1/groups?user_id=${user.id}`);
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
  });

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
          selected={selectedGroup === group.id}
          onClick={(e) => viewGroup(group)}
        >
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText primary={group.name} />
        </ListItemButton>
      ))}
    </List>
  );

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

  return (
    <Box
      position="fixed"
      flex={1}
      p={2}
      sx={{ display: { md: "none", lg: "block" } }}
    >
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
  );
};

export default LeftNav;
