import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../theme";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getPlaylistCover } from "../../utils/cheekyAlgos";
import { CustomTextField } from "./Edit";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      paddingBottom: "18%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
    margin: "0 auto",
  },
  divContainer: {
    margin: "1.5rem 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profilePhoto: {
    width: "8rem",
    height: "8rem",
  },
  divTitle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 2rem",
  },
  textField: {
    marginTop: "1rem",
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
  topMargin: {
    marginTop: "1rem",
  },
}));
const EditPlaylist = ({ playlist, id }) => {
  const classes = useStyles(theme);
  //   const history = useHistory();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    const body = {
      title: title,
      desciption: description,
    };
    axios
      .post(`/editplaylist/${id}`, body)
      .then((res) => {
        document.location.reload()
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (playlist && Object.keys(playlist).length > 0) {
      setTitle(playlist.title);
      setDescription(playlist.description);
    }
  }, [playlist]);
  return (
    <div className={classes.root}>
      {/* <div className={classes.back}>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </div> */}
      {playlist && (
        <div>
          <Typography
            className={classes.topMargin}
            align="center"
            color="textPrimary"
          >
            Edit Playlist Details
          </Typography>
          <div className={classes.divContainer}>
            <div className={classes.divTitle}>
              <Typography variant="body1" color="textPrimary">
                Playlist Cover
              </Typography>
              <Button>Edit</Button>
            </div>
            <div>{getPlaylistCover(playlist, 6)}</div>
            <CustomTextField
              variant="outlined"
              label="Playlist Title"
              className={classes.textField}
              value={title}
              onChange={(e, v) => {
                setTitle(e.target.value);
              }}
              fullWidth
              multiline
            />
            <CustomTextField
              variant="outlined"
              label="Description"
              className={classes.textField}
              value={description}
              onChange={(e, v) => {
                setDescription(e.target.value);
              }}
              fullWidth
              multiline
            />
            <Button className={classes.topMargin} variant="contained" onClick={submit} disabled={loading}>
              make changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPlaylist;
