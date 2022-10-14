import {
  AddSharp as AddSharpIcon,
  Carpenter,
  Chat,
  ClassOutlined,
  EmojiEvents,
  ExpandMore,
  Groups as GroupsIcon,
  KeyboardArrowRight,
  KeyboardDoubleArrowRight,
  School,
  Search,
} from "@mui/icons-material";

import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Tooltip,
} from "@mui/material";
import axios from "../api/axios";
import React from "react";
import { useContext, useEffect, useState } from "react";

import Course from "./course/Course";
import CourseEdit from "./course/CourseEdit";
import Club from "./club/Club";
import ClubEdit from "./club/ClubEdit";
import Group from "./group/Group";
import GroupEdit from "./group/GroupEdit";
import { UserContext } from "./user/UserContext";
import './scrollbar.css';
import useAppBarHeight from "../Utils";
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictDroppable } from "./StrictDroppable";

const LeftNav = (props: { setCenterColumn: (arg0: JSX.Element) => void; }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { user } = useContext(UserContext);

  const appBarHeight = useAppBarHeight()

  useEffect(() => {
    const req1 = axios.get(`/api/v1/courses?user_id=${user.id}`);
    const req2 = axios.get(`/api/v1/clubs?user_id=${user.id}`);
    const req3 = axios.get(`/api/v1/groups?user_id=${user.id}`);
    Promise.all([req1, req2, req3])
      .then(([resp1, resp2, resp3]) => {
        setCourses(resp1.data);
        setClubs(resp2.data);
        setGroups(resp3.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const createNewCourse = (event: any) => {
    props.setCenterColumn(<CourseEdit editable={true} />);
    event.stopPropagation();
  };

  const createNewClub = (event: any) => {
    props.setCenterColumn(<ClubEdit editable={true} />);
    event.stopPropagation();
  };

  const createNewGroup = (event: any) => {
    props.setCenterColumn(<GroupEdit editable={true} />);
    event.stopPropagation();
  };

  const viewCourse = (course: any) => {
    setSelectedClub(null);
    setSelectedGroup(null);
    setSelectedCourse(course.id);
    props.setCenterColumn(<Course {...course} />);
  };

  const viewClub = (club: any) => {
    setSelectedCourse(null);
    setSelectedGroup(null);
    setSelectedClub(club.id);
    props.setCenterColumn(<Club {...club} />);
  };

  const viewGroup = (group: any) => {
    setSelectedCourse(null);
    setSelectedClub(null);
    setSelectedGroup(group.id);
    props.setCenterColumn(<Group {...group} />);
  };

  const openCoursesClick = (event: any) => {
    setCoursesOpen(!openCourses);
  };

  const openClubsClick = (event: any) => {
    setClubsOpen(!openClubs);
  };

  const openGroupsClick = (event: any) => {
    setGroupsOpen(!openGroups);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const mobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openCourses, setCoursesOpen] = useState(true);
  const [openClubs, setClubsOpen] = useState(true);
  const [openGroups, setGroupsOpen] = useState(true);

    
  const onDragEndCourses = (result: { destination: any; source: any; }) => {
    const {destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const movedCourse = courses.splice(source.index, 1)
    courses.splice(destination.index, 0, movedCourse[0])
    axios.patch(`/api/v1/course_memberships/${movedCourse[0].membership_id}`, {source: source.index, destination: destination.index, order: destination.index, user_id: user.id});
    const reorderedCourses = courses.map((course: any, i) => ({...course, order: i}));
    setCourses(reorderedCourses)
  };

  const onDragEndClubs = (result: { destination: any; source: any; }) => {
    const {destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const movedClub = clubs.splice(source.index, 1)
    clubs.splice(destination.index, 0, movedClub[0])
    axios.patch(`/api/v1/club_memberships/${movedClub[0].membership_id}`, {source: source.index, destination: destination.index, order: destination.index, user_id: user.id});
    const reorderedClubs = clubs.map((club: any, i) => ({...club, order: i}));
    setClubs(reorderedClubs)
  };

  const onDragEndGroups = (result: { destination: any; source: any; }) => {
    const {destination, source } = result;
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const movedGroup = groups.splice(source.index, 1)
    groups.splice(destination.index, 0, movedGroup[0])
    axios.patch(`/api/v1/group_memberships/${movedGroup[0].membership_id}`, {source: source.index, destination: destination.index, order: destination.index, user_id: user.id});
    const reorderedGroups = groups.map((group: any, i) => ({...group, order: i}));
    setGroups(reorderedGroups)
  };

  let courseList = (
    <DragDropContext 
    onDragEnd = {onDragEndCourses}
    >
      <StrictDroppable droppableId = {"course"}>
        {
          (provided: any) => (
          <List 
            disablePadding
            ref = {provided.innerRef}
            {...provided.droppableProps}>
              {courses.map((course: any) => (
                <Draggable
                  key={course.id}
                  draggableId={String(course.id)}
                  index={course.order}>
                  {(provided: any) => (
                  <ListItemButton
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    selected={selectedCourse === course.id}
                    onClick={() => {viewCourse(course); mobileDrawerToggle();}}
                    sx={{ pt: 0.5, pb: 0.5, backgroundColor: {xs: "#353535", sm: "#121212"}}}  
                  >
                    <ListItemIcon>
                      <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                    </ListItemIcon>
                    <Tooltip title={course.title} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
                      <ListItemText primary={course.title} primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
                    </Tooltip>
                  </ListItemButton>
                  )} 
                </Draggable>
              ))}
          {provided.placeholder}
          </List>
        )}
      </StrictDroppable>
    </DragDropContext>
  );

  let clubList = (
    <DragDropContext 
    onDragEnd = {onDragEndClubs}
    >
      <StrictDroppable droppableId = {"club"}>
      {
        (provided: any) => (
          <List
            disablePadding
            ref = {provided.innerRef}
            {...provided.droppableProps}>
              {clubs.map((club: any) => (
                <Draggable
                key={club.id}
                draggableId={String(club.id)}
                index={club.order}>
                {(provided: any) => (
                <ListItemButton
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  selected={selectedClub === club.id}
                  onClick={() => {viewClub(club); mobileDrawerToggle();}}
                  sx={{ pt: 0.5, pb: 0.5, backgroundColor: {xs: "#353535", sm: "#121212"}}} 
                >
                  <ListItemIcon>
                    <Carpenter sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                  </ListItemIcon>
                  <Tooltip title={club.name} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
                    <ListItemText primary={club.name} primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
                  </Tooltip>
                </ListItemButton>
                )} 
                </Draggable>
              ))}
            {provided.placeholder}
          </List>
        )}
      </StrictDroppable>
    </DragDropContext>
  );

  let groupList = (
    <DragDropContext 
    onDragEnd = {onDragEndGroups}
    >
      <StrictDroppable droppableId = {"group"}>
      {
        (provided: any) => (
        <List
        disablePadding
        ref = {provided.innerRef}
        {...provided.droppableProps}>
          {groups.map((group: any) => (
            <Draggable
              key={group.id + "group"}
              draggableId={String(group.id) + "group"}
              index={group.order}>
              {(provided: any) => (
              <ListItemButton
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                selected={selectedGroup === group.id}
                onClick={() => {viewGroup(group); mobileDrawerToggle();}}
                sx={{ pt: 0.5, pb: 0.5, backgroundColor: {xs: "#353535", sm: "#121212"}}}  
              >
                <ListItemIcon>
                  <Chat sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                </ListItemIcon>
                <Tooltip title={group.name} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
                  <ListItemText primary={group.name} primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
                </Tooltip>
              </ListItemButton>
              )} 
            </Draggable>
          ))}
        {provided.placeholder}
        </List>
      )}
      </StrictDroppable>
    </DragDropContext>
  );

  const leftNav = (
      <List
      sx={{ className: 'scroller', maxHeight: {xs: '100%', sm:`calc(100vh - ${appBarHeight}px - 34px)`}, overflow: 'auto', overflowX: 'hidden'}}
      className='scroller'>
        <Tooltip title="Find new courses" disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
          <ListItem disablePadding>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={() => searchNewCourses()}>
              <ListItemText primary="Find New Courses" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
                <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
          <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openCoursesClick}>
            <Tooltip title={openCourses ? "Close courses" : "Open courses"} disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              {openCourses ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <School sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Courses"/>
            <Tooltip 
              title="Create a new course" 
              onClick={(e) => {createNewCourse(e); mobileDrawerToggle();}} 
              disableInteractive 
              enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openCourses} timeout="auto" unmountOnExit>
          {courseList}
        </Collapse>

        <Divider variant="middle" sx={{paddingTop: 1}} />

        <Tooltip title="Find new clubs" disableInteractive enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
          <ListItem disablePadding sx={{paddingTop: 1}}>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={() => searchNewClubs()}>
              <ListItemText primary="Find New Clubs" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
              <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
        <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openClubsClick}>
            <Tooltip 
            title={openClubs ? "Close clubs" : "Open clubs"} 
            disableInteractive 
            enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              {openClubs ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <EmojiEvents sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Clubs"/>
            <Tooltip title="Create a new club"
            onClick={(e) => {createNewClub(e); mobileDrawerToggle();}} 
            disableInteractive 
            enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openClubs} timeout="auto" unmountOnExit>
          {clubList}
        </Collapse>

        <Divider variant="middle" sx={{paddingTop: 1}} />

        <Tooltip title="Find new groups" 
        disableInteractive 
        enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
          <ListItem disablePadding sx={{paddingTop: 1.5}}>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={() => {searchNewGroups(); mobileDrawerToggle();}}> 
              <ListItemText primary="Find New Groups" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
              <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
          <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openGroupsClick}>
            <Tooltip title={openGroups ? "Close groups" : "Open groups"} 
            disableInteractive 
            enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              {openGroups ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <GroupsIcon sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Groups"/>
            <Tooltip title="Create a new group" onClick={(e) => {createNewGroup(e); mobileDrawerToggle();}} 
            disableInteractive 
            enterDelay={500} enterNextDelay={500} enterTouchDelay={500}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openGroups} timeout="auto" unmountOnExit>
          {groupList}
        </Collapse>
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
    <Box>
      <Paper 
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}>
        {leftNav}
      </Paper>
      <IconButton
        onClick={mobileDrawerToggle}>
      <Paper 
        variant="outlined"
        sx={{
          display: { xs: 'block', sm: 'none' }
        }}>
          <KeyboardDoubleArrowRight
            sx={{mb: -0.4}}/>
      </Paper>
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={mobileDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }
        }}
        PaperProps={{
          sx: { maxWidth: "75%"},

        }}
      >
        {leftNav}
    </Drawer>
  </Box>
  );
}
    


export default LeftNav;
