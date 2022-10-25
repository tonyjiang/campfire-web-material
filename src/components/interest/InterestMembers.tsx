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
import axios from "../../api/axios";

const InterestMembers = (props) => {
  const [loading, setLoading] = useState(true);
  const [interest, setInterest] = useState(props);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setInterest(props);
    axios
      .get(`/api/v1/users?interest_id=${props.id}`)
      .then((resp) => {
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
      {members.map((member) => (
        <Card key={member.user_id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: purple[500] }}>
                {member.user.first_name.substring(0, 1) +
                  member.user.last_name.substring(0, 1)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={`${member.user.first_name} ${member.user.last_name}`}
            subheader={`Joined since ${member.created_at}`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {member.role}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default InterestMembers;
