import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseFeed = (props) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(props);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCourse(props);
    axios
      .get(`/api/v1/users?course_id=${props.id}`)
      .then((resp) => {
        console.log(resp.data);
        setMembers(resp.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props]);

  if (loading) return <Skeleton variant="text" height={100} />;

  if (error)
    return (
      <div>
        <h2>Error! Look at the browser console for details.</h2>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

  return (
    <Stack spacing={3}>
      <input hidden value={course?.id} readOnly />
      {members.map((member) => (
        <Card key={member.id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: purple[500] }}>
                {member.first_name.substring(0, 1) +
                  member.last_name.substring(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={`${member.first_name} ${member.last_name}`}
            subheader={`Joined since ${member.created_at}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {member.bio}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CourseFeed;