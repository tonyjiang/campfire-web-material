import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import { createTheme }  from '@mui/material/styles'
const theme = createTheme()

const Post = () => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.light }} aria-label="view">
            TJ
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Witty post from a funny professor"
        subheader="Aug. 15, 2021"
      />
      <CardMedia
        component="img"
        height="10%"
        image="https://picsum.photos/66/20?random=1"
        alt="Picture = thousand words"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          A unicorn is just a pony who believed in miracles.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
