import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  GifBoxOutlined,
  IosShareOutlined,
  MoodOutlined,
  MoreVert,
  PhotoOutlined,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentCard = styled(Card)(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "100%",
  marginLeft: "5px",
}));

const CourseFeed = (props) => {
  const [myComments, setMyComments] = useState({});
  const [course, setCourse] = useState(props);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCourse(props);
  }, [props]);

  const handleCommentInput = (e, post) => {
    const newComments = { ...myComments };
    newComments[String(post.id)] = e.target.value;
    setMyComments(newComments);
  };

  const sendComment = (e, post) => {
    const data = {
      post_id: post.id,
      comment_text: myComments[post.id],
      user_id: 2,
    };
    axios
      .post('/api/v1/comments', data)
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        console.log("We should reload comments of the post locally, not remotely");
      });
  };

  const postComments = (comments) => {
    return (
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <CommentCard>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                    {comment.author.first_name.substring(0, 1) +
                      comment.author.last_name.substring(0, 1)}
                  </Avatar>
                }
                title={`${comment.author.first_name} ${comment.author.last_name}`}
                subheader={comment.created_at}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {comment.comment_text}
                </Typography>
              </CardContent>
            </CommentCard>
          </ListItem>
        ))}
      </List>
    );
  };

  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <hr />
        <h4>{JSON.stringify(error)}</h4>
      </div>
    );

  return (
    <Stack spacing={3}>
      <input hidden value={course?.id} readOnly />
      {course.posts.map((post) => (
        <Card key={post.id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {post.author.first_name.substring(0, 1) +
                  post.author.last_name.substring(0, 1)}
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
              <IosShareOutlined />
            </IconButton>
          </CardActions>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            label="Comment"
            value={myComments[post.id]}
            onChange={(e) => handleCommentInput(e, post)}
          />
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <IconButton aria-label="media">
                <PhotoOutlined />
              </IconButton>
              <IconButton aria-label="emoji">
                <MoodOutlined />
              </IconButton>
              <IconButton aria-label="gif">
                <GifBoxOutlined />
              </IconButton>
            </Box>
            <Box>
              <Button variant="outlined" style={{marginRight: "25px"}} onClick={e => sendComment(e, post)}>
                Send
              </Button>
            </Box>
          </CardActions>
          {postComments(post.comments)}
        </Card>
      ))}
    </Stack>
  );
};

export default CourseFeed;
