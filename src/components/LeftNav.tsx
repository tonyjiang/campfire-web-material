import {
  AddSharp as AddSharpIcon,
  ArrowForward,
  ArrowForwardIos,
  Chat,
  Class,
  ClassOutlined,
  ExpandLess,
  ExpandMore,
  FormatListBulleted as FormatListBulletedIcon,
  Groups as GroupsIcon,
  KeyboardArrowRight,
  School,
  StarBorder as StarBorderIcon,
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

  const createNewCourse = () => {
    props.setCenterColumn(<CourseEdit editable={true} />);
  };

  const createNewGroup = () => {
    props.setCenterColumn(<GroupEdit editable={true} />);
  };

  const viewCourse = (course) => {
    setSelectedCourse(course.id);
    props.setCenterColumn(<Course {...course} />);
  };

  const viewGroup = (group) => {
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
          onClick={(e) => viewCourse(course)}
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
          onClick={(e) => viewGroup(group)}
        >
          <ListItemIcon>
            <Chat sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
          </ListItemIcon>
          <ListItemText primary={group.name}/>
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

  const openCoursesClick = () => {
    setCoursesOpen(!openCourses);
  };

  const openGroupsClick = () => {
    setGroupsOpen(!openGroups);
  };

  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton >
            <Tooltip title={openCourses ? "Close courses" : "Open courses"} onClick={openCoursesClick}>
              {openCourses ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <School sx={{paddingRight: 2.5}} onClick={openCoursesClick}/>
            <ListItemText primary="Courses"  onClick={openCoursesClick}/>
            <Tooltip title="Create a new course" onClick={createNewCourse} >
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
            <Tooltip title="Create a new group" onClick={createNewGroup}>
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
