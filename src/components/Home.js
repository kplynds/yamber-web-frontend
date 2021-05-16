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
import theme from "../theme";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    background: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  logo_and_name: {
    display: "flex",
    alignItems: "center",
  },
  login: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    margin: "1rem",
  },
  divider: {
    marginBottom: "1rem",
  },
  loadingDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

function Home({ user, ui, dispatch }) {
  const classes = useStyles(theme);
  const LoadingScreen = () => {
    return (
      <div className={classes.loadingDiv}>
        <CircularProgress color="secondary" />
      </div>
    );
  };
  if (!ui.fullyMounted) {
    return <LoadingScreen />;
  } else {
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
              <Typography component="h1" variant="h5" color="textPrimary">
                Yamber
              </Typography>
            </div>
            <Typography component="h1" variant="h6" color="textPrimary">
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
}

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

export default connect(mapState)(Home);
