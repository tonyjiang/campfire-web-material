import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
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

const CommentCard = styled(Card)(({ theme }) => ({
  color: theme.palette.primary.light,
  width: "100%",
  marginLeft: "5px",
}));

const GroupFeed = (props) => {
  const [loading, setLoading] = useState(true);
  const [myComments, setMyComments] = useState({});
  const [group, setGroup] = useState(props);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setGroup(props);
    axios
      .get(`/api/v1/posts?group_id=${props.id}`)
      .then((resp) => {
        console.log(resp.data);
        setPosts(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        props.setGroupLoading(false);
      });
  }, [props]);

  if (loading)
    return (
      <Stack spacing={1}>
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

  const postComments = (comments) => {
    return (
      <List>
        {comments.map((comment) => (
          <ListItem key={ comment.id }>
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

  return (
    <Stack spacing={3}>
      <input hidden value={group?.id} readOnly />
      {posts.map((post) => (
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
              <Send />
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
          {postComments(post.comments)}
        </Card>
      ))}
    </Stack>
  );
};

export default GroupFeed;
