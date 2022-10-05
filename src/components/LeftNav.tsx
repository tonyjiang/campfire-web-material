import {
  AddSharp as AddSharpIcon,
  Chat,
  ClassOutlined,
  EmojiEvents,
  ExpandMore,
  Groups as GroupsIcon,
  KeyboardArrowRight,
  School,
  Search,
} from "@mui/icons-material";

import {
  Box,
  Collapse,
  Divider,
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
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState();
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
  const [openClubs, setClubsOpen] = React.useState(true);
  const [openGroups, setGroupsOpen] = React.useState(true);

  let courseList = (
    <List component="div" disablePadding>
      {courses.map((course) => (
        <ListItemButton
          key={course.id}
          selected={selectedCourse === course.id}
          onClick={() => viewCourse(course)}
          sx={{ pt: 0.5, pb: 0.5}} 
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

  let clubList = (
    <List component="nav"
     disablePadding
     >
      {clubs.map((club) => (
        <ListItemButton
          key={club.id}
          selected={selectedClub === club.id}
          onClick={() => viewClub(club)}
          sx={{ pt: 0.5, pb: 0.5}} 
        >
          <ListItemIcon>
            <Chat sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
          </ListItemIcon>
          <Tooltip title={club.name}>
            <ListItemText primary={club.name} primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis' }}/>
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

  const openClubsClick = (event: any) => {
    setClubsOpen(!openClubs);
  };

  const openGroupsClick = (event: any) => {
    setGroupsOpen(!openGroups);
  };

  return (
    <Box style={{maxHeight: '100%', overflow: 'auto'}} className="scroller">
      <List>
        <Tooltip title="Find new courses">
          <ListItem disablePadding>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={(e) => searchNewCourses(e)}>
              <ListItemText primary="Find New Courses" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
                <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
          <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openCoursesClick}>
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

        <Divider variant="middle" sx={{paddingTop: 1}} />

        <Tooltip title="Find new clubs">
          <ListItem disablePadding sx={{paddingTop: 1}}>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={(e) => searchNewClubs(e)}>
              <ListItemText primary="Find New Clubs" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
              <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
        <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openClubsClick}>
            <Tooltip title={openClubs ? "Close clubs" : "Open clubs"}>
              {openClubs ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <EmojiEvents sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Clubs"/>
            <Tooltip title="Create a new club" onClick={(e) => createNewClub(e)}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openClubs} timeout="auto" unmountOnExit>
          {clubList}
        </Collapse>

        <Divider variant="middle" sx={{paddingTop: 1}} />
        
        <Tooltip title="Find new groups">
          <ListItem disablePadding sx={{paddingTop: 1.5}}>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={(e) => searchNewCourses(e)}>
              <ListItemText primary="Find New Groups" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
              <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
          <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openGroupsClick}>
            <Tooltip title={openGroups ? "Close groups" : "Open groups"}>
              {openGroups ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <GroupsIcon sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Groups"/>
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
