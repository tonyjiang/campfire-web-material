/*
  This might be the most important page in the early days of this project because
  this is where we present the "hook"!

  Yammer’s initial MVP started with a simple hook – the status update "What are
  you working on?" Twitter’s starting point is "What are you doing?" or "What’s
  happening?" It's a simple behavior you can get people to do, then layer more on,
  add more depth and surface area. You can add more business features over time,
  like "groups" and "files." Without the initial hook, no one will care about any
  features. Your first product can be rough, but it needs a hook!
*/
import { Box } from "@mui/material";

const Greetings = (props) => {
  return (
    <div flex={4} p={{ xs: 0, md: 2 }}>
      <Box sx={{ marginTop: "30px", maxWidth: "500px" }}>
      <h2>Welcome to Campfire!</h2>
      </Box>
      <Box sx={ {marginTop: "30px", maxWidth: "500px"} }>
        <h3>You haven’t taught or taken any courses, so this page is a little empty.
        Once you've created or signed up for courses, you'll start to see
        conversations from your classes.</h3>
      </Box>
      <Box sx={ {marginTop: "10px", maxWidth: "500px"} }>
      <h3>Or you can first join some groups and check out what people are talking about.</h3>
      </Box>
      <Box sx={{ marginTop: "30px", maxWidth: "500px" }}>
        HERE IS WHERE WE ENCOURAGE THE USER TO JOIN A COURSE
      </Box>
      <Box sx={{ marginTop: "30px", maxWidth: "500px" }}>
        HERE IS WHERE WE ENCOURAGE THE USER TO JOIN A GROUP
      </Box>
      <Box sx={{ marginTop: "30px", maxWidth: "500px" }}>
        HERE IS WHERE WE ENCOURAGE THE USER TO INVITE FRIENDS TO JOIN CAMPFIRE
      </Box>
    </div>
  );
};

export default Greetings;
