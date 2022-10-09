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
  PersonalVideoRounded,
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
import Channel from "./channel/Channel";
import ChannelEdit from "./channel/ChannelEdit";
import { UserContext } from "./user/UserContext";
import './scrollbar.css';
import useAppBarHeight from "../Utils";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StrictDroppable } from "./StrictDroppable";

const LeftNav = (props) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState();
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
        setChannels(resp3.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const createNewCourse = (event: any) => {
    props.setCenterColumn(<CourseEdit editable={true} />);
    event.stopPropagation();
  };

  const createNewClub = (event: any) => {
    props.setCenterColumn(<ClubEdit editable={true} />);
    event.stopPropagation();
  };

  const createNewChannel = (event: any) => {
    props.setCenterColumn(<ChannelEdit editable={true} />);
    event.stopPropagation();
  };

  const viewCourse = (course) => {
    setSelectedClub(null);
    setSelectedChannel(null);
    setSelectedCourse(course.id);
    props.setCenterColumn(<Course {...course} />);
  };

  const viewClub = (club) => {
    setSelectedCourse(null);
    setSelectedChannel(null);
    setSelectedClub(club.id);
    props.setCenterColumn(<Club {...club} />);
  };

  const viewChannel = (channel) => {
    setSelectedCourse(null);
    setSelectedClub(null);
    setSelectedChannel(channel.id);
    props.setCenterColumn(<Channel {...channel} />);
  };

  const openCoursesClick = (event: any) => {
    setCoursesOpen(!openCourses);
  };

  const openClubsClick = (event: any) => {
    setClubsOpen(!openClubs);
  };

  const openChannelsClick = (event: any) => {
    setChannelsOpen(!openChannels);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const mobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [openCourses, setCoursesOpen] = useState(true);
  const [openClubs, setClubsOpen] = useState(true);
  const [openChannels, setChannelsOpen] = useState(true);

    
  const onDragEnd = () => {

  };

  let courseList = (
    <DragDropContext 
    onDragEnd = {onDragEnd}
    >
      <StrictDroppable droppableId = {"course"}>
        {
          (provided) => (
          <List 
            disablePadding
            ref = {provided.innerRef}
            {...provided.droppableProps}>
              {courses.map((course) => (
                <Draggable
                  key={course.id}
                  draggableId={String(course.id)}
                  index={Number(`${course.id == 4 ? course.id - 2 : course.id - 1}`)}>
                  {(provided) => (
                  <ListItemButton
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    selected={selectedCourse === course.id}
                    onClick={() => {viewCourse(course); mobileDrawerToggle();}}
                    sx={{ pt: 0.5, pb: 0.5}} 
                  >
                    <ListItemIcon>
                      <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                    </ListItemIcon>
                    <Tooltip title={course.title}>
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
    onDragEnd = {onDragEnd}
    >
      <StrictDroppable droppableId = {"club"}>
      {
        (provided) => (
          <List
            disablePadding
            ref = {provided.innerRef}
            {...provided.droppableProps}>
              {clubs.map((club) => (
                <Draggable
                key={club.id}
                draggableId={String(club.id)}
                index={club.id - 1}>
                {(provided) => (
                <ListItemButton
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  selected={selectedClub === club.id}
                  onClick={() => {viewClub(club); mobileDrawerToggle();}}
                  sx={{ pt: 0.5, pb: 0.5}} 
                >
                  <ListItemIcon>
                    <Carpenter sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                  </ListItemIcon>
                  <Tooltip title={club.name}>
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

  let channelList = (
    <DragDropContext 
    onDragEnd = {onDragEnd}
    >
      <StrictDroppable droppableId = {"channel"}>
      {
        (provided) => (
        <List
        disablePadding
        ref = {provided.innerRef}
        {...provided.droppableProps}>
          {channels.map((channel) => (
            <Draggable
              key={channel.id + "channel"}
              draggableId={String(channel.id) + "channel"}
              index={Number(`${channel.id > 1 ? channel.id - 3 : channel.id - 1}`)}>
              {(provided) => (
              <ListItemButton
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                selected={selectedChannel === channel.id}
                onClick={() => {viewChannel(channel); mobileDrawerToggle();}}
                sx={{ pt: 0.5, pb: 0.5}} 
              >
                <ListItemIcon>
                  <Chat sx={{ paddingLeft: 4, paddingRight: 2.5 }}/>
                </ListItemIcon>
                <Tooltip title={channel.name}>
                  <ListItemText primary={channel.name} primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
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
        <Tooltip title="Find new courses">
          <ListItem disablePadding>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={(e) => searchNewCourses()}>
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
            <Tooltip title="Create a new course" onClick={(e) => {createNewCourse(e); mobileDrawerToggle();}} >
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
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={() => searchNewClubs()}>
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
            <Tooltip title="Create a new club" onClick={(e) => {createNewClub(e); mobileDrawerToggle();}}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openClubs} timeout="auto" unmountOnExit>
          {clubList}
        </Collapse>

        <Divider variant="middle" sx={{paddingTop: 1}} />

        <Tooltip title="Find new channels">
          <ListItem disablePadding sx={{paddingTop: 1.5}}>
            <ListItemButton sx={{ pt: 0.25, pb: 0.25}} onClick={() => {searchNewChannels(); mobileDrawerToggle();}}> 
              <ListItemText primary="Find New Channels" primaryTypographyProps={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}/>
              <Search sx={{paddingLeft: 2.5}}/>
            </ListItemButton>
          </ListItem>
        </Tooltip>

        <ListItem disablePadding>
          <ListItemButton sx={{ pt: 0.5, pb: 0.5}} onClick={openChannelsClick}>
            <Tooltip title={openChannels ? "Close channels" : "Open channels"}>
              {openChannels ? <ExpandMore sx={{marginRight: 1}}/> : <KeyboardArrowRight sx={{marginRight: 1.25, marginLeft: -0.25}}/>}
            </Tooltip>
            <GroupsIcon sx={{paddingRight: 2.5}}/>
            <ListItemText primary="Channels"/>
            <Tooltip title="Create a new channel" onClick={(e) => {createNewChannel(e); mobileDrawerToggle();}}>
              <AddSharpIcon sx={{paddingLeft: 2.5}}/>
            </Tooltip>
          </ListItemButton>
        </ListItem>

        <Collapse in={openChannels} timeout="auto" unmountOnExit>
          {channelList}
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
