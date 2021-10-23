import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import theme from "../../../theme";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import AddBoxIcon from "@mui/icons-material/AddBox";

const useStyles = makeStyles((theme) => ({
  spotlight: {
    width: "40%",
    [theme.breakpoints.down('lg')]: {
      width: "60%",
    },
    [theme.breakpoints.down('md')]: {
      width: "75%",
    },
    [theme.breakpoints.down('sm')]: {
      width: "95%",
    },
    background: theme.palette.primary.main,
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem auto",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    background: theme.palette.primary.light,
    borderRadius: "16px",
    marginTop: ".4rem",
  },
  spotlightSearch: {
    marginTop: ".5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chip: {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    margin: ".2rem",
  },
  selectedChip: {
    background: theme.palette.text.secondary,
    margin: ".2rem",
    color: theme.palette.primary.dark,
    borderColor: theme.palette.text.secondary,
  },
  chips: {
    display: "flex",
    justifyContent: "center",
  },
  result: {
    display: "flex",
    "&:hover": {
      background: theme.palette.primary.light,
    },
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchResults: {
    width: "100%",
  },
  avatar: {
    marginRight: ".4rem",
  },
  subResult: {
    display: "flex",
    "&:hover": {
      background: theme.palette.primary.light,
    },
    alignItems: "center",
    padding: ".1rem .5rem",
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
    marginRight: ".1rem",
  },
}));
const SpotlightSearch = () => {
  const classes = useStyles(theme);
  const [spotlightSearch, setSpotlightSearch] = useState("");
  const [searchType, setSearchType] = useState("track");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleSearch = (e) => {
    setSpotlightSearch(e.target.value);
  };
  const addSpotlight = (item) => {
    const body = {
      spotlight: {
        on: true,
        data: item,
      },
    };
    axios.post("/update", body).then((res) => {
      window.location.reload();
    });
  };
  const chips = [
    {
      label: "songs",
      search: "track",
    },
    {
      label: "albums",
      search: "album",
    },
    {
      label: "artists",
      search: "artist",
    },
  ];
  useEffect(() => {
    if (spotlightSearch !== "") {
      setSearchLoading(true);
      axios
        .get(`/searchspotifyclient/${spotlightSearch}/${searchType}`)
        .then((res) => {
          setSearchResults(res.data);
          setSearchLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setSearchLoading(false);
        });
    }
  }, [spotlightSearch, searchType]);
  return (
    <div className={classes.spotlightSearch}>
      <Typography variant="subtitle1" color="textSecondary">
        spotlight an artist, album, or song
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" align="center">
        (this will only be shown on your profile if you've selected something to
        spotlight)
      </Typography>
      <InputBase
        placeholder="search..."
        inputProps={{ "aria-label": "search" }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={spotlightSearch}
        onChange={handleSearch}
        onBlur={() => {
          if (spotlightSearch === "") {
            setSearchResults([]);
          }
        }}
      />
      {searchLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <CircularProgress style={{ color: "#fff" }} />
        </div>
      )}
      {spotlightSearch !== "" && !searchLoading && (
        <div className={classes.searchResults}>
          <div className={classes.chips}>
            {chips.map((chip) => {
              return (
                <Chip
                  label={`${chip.label}`}
                  key={chip.search}
                  onClick={() => {
                    setSearchType(`${chip.search}`);
                  }}
                  variant="outlined"
                  size="small"
                  className={
                    searchType === `${chip.search}`
                      ? classes.selectedChip
                      : classes.chip
                  }
                />
              );
            })}
          </div>
          <div className={classes.searchResults}>
            {searchResults.map((item, i) => {
              return (
                <div key={i} className={classes.result}>
                  <div className={classes.subResult}>
                    <Avatar
                      alt={item.name}
                      src={item.images[0].url ? item.images[0].url : ""}
                      className={classes.avatar}
                      variant="square"
                    />
                    <div>
                      <Typography variant="body1" color="textPrimary">
                        {item.name}
                      </Typography>
                      {item.artists && (
                        <Typography variant="body2" color="textSecondary">
                          {item.artists.join(", ")}
                        </Typography>
                      )}
                    </div>
                  </div>
                  <div>
                    <AddBoxIcon
                      className={classes.hover}
                      onClick={() => addSpotlight(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotlightSearch;
