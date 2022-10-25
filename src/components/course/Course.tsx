import { Box, Skeleton, styled, Tab, Tabs } from "@mui/material";

import React, { useEffect, useState } from "react";
import CourseEdit from "./CourseEdit";
import CourseMembers from "./CourseMembers";
import PostsFeed from "../post/PostsFeed";
import SyllabusEdit from "./SyllabusEdit";
import axios from "../../api/axios";
import { useLoaderData, useParams } from "react-router-dom";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Course = () => {
  const loadedData: any = useLoaderData();

  const [posts, setPosts] = useState(loadedData.posts);
  const [selectedTab, setSelectedTab] = useState(0);
  const { courseId } = useParams();

  const handleTabChange = (_: any, id: any) => {
    setSelectedTab(id);
  };

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
          <SecondaryTab label="Course" id={1} aria-controls="tab-1" />
          <SecondaryTab label="Syllabus" id={2} aria-controls="tab-2" />
          <SecondaryTab label="Members" id={3} aria-controls="tab-3" />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4}>
      {courseHeader}
      {selectedTab === 0 ? (
        <PostsFeed posts={loadedData.posts} setPosts={ setPosts } contextType="Course" contextId={courseId} />
      ) : selectedTab === 1 ? (
        <CourseEdit />
      ) : selectedTab === 2 ? (
        <SyllabusEdit />
      ) : (
        <CourseMembers />
      )}
    </Box>
  );
};

export default Course;

export const Loader = async ({ params }: any) => {
  const { courseId } = params;
  let posts = null;
  const postsPromise: any = await axios.get(`/api/v1/posts?context_type=Course&context_id=${courseId}`)
  .catch((err) => {
      console.error(err);
    });

  posts = postsPromise.data
  return {posts}
}
