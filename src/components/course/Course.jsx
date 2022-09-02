import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import CourseEdit from "./CourseEdit";
import PostsFeed from "../post/PostsFeed";
import CreatePost from "../post/CreatePost";
import CourseMembers from "./CourseMembers";
import axios from "axios";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Course = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(props);
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/v1/posts?context_type=Course&context_id=${props.id}`)
      .then((resp) => {
        setPosts(resp.data);
        setCourse(props);
        setSelectedTab(0);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  const handleTabChange = (_, id) => {
    setSelectedTab(id);
  };

  const addNewPost = (postText) => {
    const data = {
      context_type: "Course",
      context_id: props.id,
      post_text: postText,
      user_id: 1,
    };

    axios
      .post("/api/v1/posts", data)
      .then((resp) => {
        const post = {
          id: resp.data.id,
          author: { first_name: "John", last_name: "Smith" },
          comments: [],
          ...data,
        };
        setPosts([post, ...posts]);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  if (loading) return <Skeleton variant="text" height={100} />;
  if (error)
    return (
      <div>
        <h2>Error in Group.jsx component! Look at the browser console for details.</h2>
        <hr />
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const courseHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Conversations" id={0} aria-controls="tab-0" />
          <SecondaryTab label="Syllabus" id={1} aria-controls="tab-1" />
          <SecondaryTab label="Members" id={2} aria-controls="tab-2" />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {courseHeader}
      {selectedTab === 0 ? (
        <>
          <CreatePost
            contextType="Course"
            addNewPost={addNewPost}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
          <PostsFeed posts={posts} />
        </>
      ) : selectedTab === 1 ? (
        <CourseEdit {...course} />
      ) : (
        <CourseMembers {...course} />
      )}
    </Box>
  );
};

export default Course;
