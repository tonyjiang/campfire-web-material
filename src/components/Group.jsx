import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  FormGroup,
  IconButton,
  Skeleton,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  ChatBubbleOutline,
  MoreVert,
  FavoriteBorder,
  Send,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import axios from "axios";

const SecondaryTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const Group = (props) => {
  const [loading, setLoading] = useState(true);
  const [myComments, setMyComments] = useState({});
  const [group, setGroup] = useState(props);
  const [selectedTab, setSelectedTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setGroup(props);
    setSelectedTab(0);
    axios
      .get(`/api/v1/posts?group_id=${group.id}&user_id=1`)
      .then((resp) => {
        setPosts(resp.data);
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

  if (loading)
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" height={100} />
        <Skeleton variant="text" height={100} />
      </Stack>
    );

  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  const handleCommentInput = (e, post) => {
    const newComments = { ...myComments };
    newComments[String(post.id)] = e.target.value;
    setMyComments(newComments);
  };

  const groupHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label={group.name} id={0} aria-controls="tab-0" />
          <SecondaryTab label="About" id={1} aria-controls="tab-1" />
          <SecondaryTab label="Members" id={2} aria-controls="tab-2" />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <FormGroup></FormGroup>
      <Stack spacing={3}>
        {groupHeader}
        <input hidden value={group?.id} />
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  P
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVert />
                </IconButton>
              }
              title={`${post.author.first_name} ${post.author.last_name}`}
              subheader={post.created_at}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.post_text}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton aria-label="comments">
                <ChatBubbleOutline />
              </IconButton>
              <IconButton aria-label="favorites">
                <FavoriteBorder />
              </IconButton>
              <IconButton aria-label="share">
                <Send />
              </IconButton>
            </CardActions>
            <TextField
              fullWidth
              variant="outlined"
              label="Comment"
              value={myComments[post.id]}
              onChange={(e) => handleCommentInput(e, post)}
            />
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Group;
