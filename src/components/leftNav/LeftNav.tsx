import {
  ClassOutlined,
  EmojiEvents as TrophyIcon,
  Groups as GroupsIcon,
  KeyboardDoubleArrowRight,
  School as SchoolIcon,
} from "@mui/icons-material";

import {
  Drawer,
  IconButton,
  List,
  Paper,
  Skeleton,
} from "@mui/material";
import axios from "../../api/axios";
import React from "react";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../user/UserContext";
import '../scrollbar.css';
import useAppBarHeight from "../../Utils";
import { useNavigate } from "react-router-dom";
import { LeftNavCategory } from "./LeftNavListItems";
import { LeftNavDroppable } from "./LeftNavDroppable";

const LeftNav = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const [clubs, setClubs] = useState<any[]>([]);
  const [selectedClub, setSelectedClub] = useState<any>();
  const [interests, setInterests] = useState<any[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { user } = useContext(UserContext);

  const appBarHeight = useAppBarHeight()
  const navigate = useNavigate();

  useEffect(() => {
    const req1 = axios.get(`/api/v1/courses?user_id=${user.id}`);
    const req2 = axios.get(`/api/v1/clubs?user_id=${user.id}`);
    const req3 = axios.get(`/api/v1/interests?user_id=${user.id}`);
    Promise.all([req1, req2, req3])
      .then(([resp1, resp2, resp3]) => {
        console.log(resp1.data)
        setCourses(resp1.data);
        setClubs(resp2.data);
        setInterests(resp3.data);
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
    event.stopPropagation();
  };

  const createNewClub = (event: any) => {
    event.stopPropagation();
  };

  const createNewInterest = (event: any) => {
    event.stopPropagation();
  };

  const setSelected = (options: {
    course: any,
    club: any,
    interest: any,
    channel: any,
  }) => {
    const channel = options.channel.id ?? 1

    setSelectedCourse(options.course.id);
    setSelectedClub(options.club.id);
    setSelectedInterest(options.interest.id);
    setSelectedChannel(options.channel.id);

  }

  const viewCourse = (course: any) => {
    setSelectedClub(null);
    setSelectedInterest(null);
    setSelectedCourse(course.id);
    navigate(`course/${course.id}`);
  };

  const viewClub = (club: any) => {
    setSelectedCourse(null);
    setSelectedInterest(null);
    setSelectedClub(club.id);
    navigate(`club/${club.id}`);
  };

  const viewInterest = (interest: any) => {
    setSelectedCourse(null);
    setSelectedClub(null);
    setSelectedInterest(interest.id);
    navigate(`interest/${interest.id}`);
  };

  const openCoursesClick = (event: any) => {
    setCoursesOpen(!isCoursesOpen);
  };

  const openClubsClick = (event: any) => {
    setClubsOpen(!isClubsOpen);
  };

  const openInterestsClick = (event: any) => {
    setInterestsOpen(!isInterestsOpen);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const mobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [isCoursesOpen, setCoursesOpen] = useState(false);
  const [isClubsOpen, setClubsOpen] = useState(false);
  const [isInterestsOpen, setInterestsOpen] = useState(false);

  const searchNewCourses = () => {
    throw new Error("Function not implemented.");
  }

  const searchNewClubs = () => {
    throw new Error("Function not implemented.");
  }

  const searchNewInterests = () => {
    throw new Error("Function not implemented.");
  }

  const courseList = LeftNavDroppable({
    droppableId: "courses",
    draggables: courses,
    user, 
    setDraggable: setCourses,
    selectedDraggable: selectedCourse,
    viewDraggable: viewCourse, 
    mobileDrawerToggle,
    membershipType: "course_memberships",
    icon: <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }} />,
  });

  const clubList = LeftNavDroppable({
    droppableId: "clubs",
    draggables: clubs,
    user, 
    setDraggable: setClubs,
    selectedDraggable: selectedClub,
    viewDraggable: viewClub, 
    mobileDrawerToggle,
    membershipType: "club_memberships",
    icon: <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }} />,
  });

  const interestList = LeftNavDroppable({
    droppableId: "interests",
    draggables: interests,
    user, 
    setDraggable: setInterests,
    selectedDraggable: selectedInterest,
    viewDraggable: viewInterest, 
    mobileDrawerToggle,
    membershipType: "interest_memberships",
    icon: <ClassOutlined sx={{ paddingLeft: 4, paddingRight: 2.5 }} />,
  });

  const leftNav = (
    <List
      sx={{ 
        className: 'scroller', 
        maxHeight: { 
          xs: '100%', 
          sm: `calc(100vh - ${appBarHeight}px - 34px)` 
        }, 
        overflow: 'auto', 
        overflowX: 'hidden' 
      }}
      className='scroller'
      >

    <LeftNavCategory
      searchNew={searchNewCourses}
      paddingTop={0}
      findNewTooltip="Find new courses"
      findNewTitle="Find New Courses"
      itemCategory="Courses"
      createNew={createNewCourse}
      openClick={openCoursesClick}
      mobileDrawerToggle={mobileDrawerToggle}
      isOpen={isCoursesOpen}
      closeString="Close courses"
      openString="Open courses"
      createNewString="Create a new course"
      itemList={courseList}
      hasDivider={true}
      topLevelIcon={<SchoolIcon sx={{paddingRight: 2.5}} />}
    />

    <LeftNavCategory
      searchNew={searchNewClubs}
      paddingTop={1}
      findNewTooltip="Find new clubs"
      findNewTitle="Find New Clubs"
      itemCategory="Clubs"
      createNew={createNewClub}
      openClick={openClubsClick}
      mobileDrawerToggle={mobileDrawerToggle}
      isOpen={isClubsOpen}
      closeString="Close clubs"
      openString="Open clubs"
      createNewString="Create a new club"
      itemList={clubList}
      hasDivider={true}
      topLevelIcon={<TrophyIcon sx={{paddingRight: 2.5}} />}
    />

    <LeftNavCategory
      searchNew={searchNewInterests}
      paddingTop={1}
      findNewTooltip="Find new interests"
      findNewTitle="Find New Interests"
      itemCategory="Interests"
      createNew={createNewInterest}
      openClick={openInterestsClick}
      mobileDrawerToggle={mobileDrawerToggle}
      isOpen={isInterestsOpen}
      closeString="Close interests"
      openString="Open interests"
      createNewString="Create a new interest"
      itemList={interestList}
      hasDivider={false}
      topLevelIcon={<GroupsIcon sx={{paddingRight: 2.5}} />}
    />
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
    <>
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
            sx={{ mb: -0.4 }} />
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
          sx: { maxWidth: "75%" },

        }}
      >
        {leftNav}
      </Drawer>
    </>
  );
}

export default LeftNav;
