import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Phone from "@material-ui/icons/Phone";

// import theme
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  grid: {
    height: "100vh",
    width: "100%",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  logo_and_name: {
    display: "flex",
    alignItems: "center",
  },
  login: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: "1rem",
  },
  divider: {
    marginBottom: "1rem",
  },
}));

function Home() {
  const classes = useStyles(theme);

  return (
    <Grid container spacing={0} className={classes.grid}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <div className={classes.paper}>
          <div className={classes.logo_and_name}>
            <Avatar className={classes.avatar}>
              <MusicNoteIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Yamber
            </Typography>
          </div>
          <Typography component="h1" variant="h6">
            The Social Network for Music!
          </Typography>
          <Link to="/login">
            <Button variant="contained" className={classes.login}>
              login
            </Button>
          </Link>
          <Typography component="p" className={classes.divider}>
            --------------- or ---------------
          </Typography>
          <Link to="/signup">
            <Button variant="outlined" startIcon={<Phone />}>
              sign up 
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
