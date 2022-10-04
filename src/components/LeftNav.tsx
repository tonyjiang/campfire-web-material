import {
  AddSharp as AddSharpIcon,
  Chat,
  ClassOutlined,
  ExpandMore,
  Groups as GroupsIcon,
  KeyboardArrowRight,
  School,
} from "@mui/icons-material";

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

import Course from "./course/Course";
import CourseEdit from "./course/CourseEdit";
import Group from "./group/Group";
import GroupEdit from "./group/GroupEdit";
import './scrollbar.css';

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

  const createNewCourse = (event: any) => {
    props.setCenterColumn(<CourseEdit editable={true} />);
    event.stopPropagation();
  };

  const createNewGroup = (event: any) => {
    props.setCenterColumn(<GroupEdit editable={true} />);
    event.stopPropagation();
  };

  const viewCourse = (course) => {
    setSelectedGroup(null);
    setSelectedCourse(course.id);
    props.setCenterColumn(<Course {...course} />);
  };

  const viewGroup = (group) => {
    setSelectedCourse(null);
    setSelectedGroup(group.id);
    props.setCenterColumn(<Group {...group} />);
  };

  const [openCourses, setCoursesOpen] = React.useState(true);
  const [openGroups, setGroupsOpen] = React.useState(true);

  let courseList = (
    <List component="div" disablePadding>
      {courses.map((course) => (
        <ListItemButton
          key={course.id}
          selected={selectedCourse === course.id}
          onClick={() => viewCourse(course)}
        >
          <ListItemIcon>
            <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
          </ListItemIcon>
          <Tooltip title={course.title}>
            <ListItemText primary={course.title} primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis' }}/>
          </Tooltip>
        </ListItemButton>
      ))}
    </List>
  );

  let groupList = (
    <List component="nav"
     disablePadding
     >
      {groups.map((group) => (
        <ListItemButton
          key={group.id}
          selected={selectedGroup === group.id}
          onClick={() => viewGroup(group)}
        >
          <ListItemIcon>
            <Chat sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
          </ListItemIcon>
          <Tooltip title={group.name}>
            <ListItemText primary={group.name} primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis' }}/>
          </Tooltip>
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

  const openCoursesClick = (event: any) => {
    setCoursesOpen(!openCourses);
  };

  const openGroupsClick = (event: any) => {
    setGroupsOpen(!openGroups);
  };

  return (
    <Box style={{maxHeight: '100%', overflow: 'auto'}}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={openCoursesClick}>
            <Tooltip title={openCourses ? "Close courses" : "Open courses"}>
              {openCourses ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <School sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Courses"/>
            <Tooltip title="Create a new course" onClick={(e) => createNewCourse(e)} >
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>
        <Collapse in={openCourses} timeout="auto" unmountOnExit>
          {courseList}
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton>
            <Tooltip title={openGroups ? "Close groups" : "Open groups"} onClick={openGroupsClick}>
              {openGroups ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <GroupsIcon sx={{paddingRight: 2.5}} onClick={openGroupsClick}/>
            <ListItemText primary="Groups" onClick={openGroupsClick}/>
            <Tooltip title="Create a new group" onClick={(e) => createNewGroup(e)}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openGroups} timeout="auto" unmountOnExit>
          {groupList}
        </Collapse>

      </List>
    </Box>
  );
};

export default LeftNav;
