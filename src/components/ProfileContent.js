import React from "react";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";
import { playButtonClick } from "../redux/actions/dataActions";
import Recent from "./profile content/Recent";
import Playlists from "./profile content/Playlists";
import Artists from "./profile content/Artists";
import {
  Route,
  Switch,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";

export const getArtistNames = (arr) => {
  const ret = [];
  arr.forEach((artist) => {
    ret.push(artist.name);
  });
  return ret;
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  playlistsRoot: {
    background: theme.palette.primary.dark,
  },
  centerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  recentsContent: {
    background: theme.palette.primary.main,
    borderRadius: "8px",
    margin: "1rem 4rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem",
    },
  },
  recentsSong: {
    display: "flex",
    alignItems: "center",
    padding: ".15rem 0",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    padding: ".3rem 0",
  },
  linkText: {
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
    },
  },
  artist: {
    display: "flex",
    alignItems: "center",
    textOverflow: "ellipsis",
    padding: ".3rem 0",
  },
  playlist: {
    display: "flex",
    flexDirection: "column",
    padding: "1% 2%",
    margin: "1% 10%",
    "&:hover": {
      background: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  playlistContainer: {
    // going to need to add some css here so it wraps ever 3 playlists
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "18%",
    },
  },
}));
//1615322891210
const ProfileContent = ({ user, ui, playButtonClick }) => {
  const classes = useStyles(theme);
  // const getTopArtists = (arr) => {
  //   const all = [];
  //   let hash = {};
  //   arr.forEach((song) => {
  //     song.artists.forEach((artist) => {
  //       all.push(artist.name);
  //     });
  //   });
  //   all.forEach((artist) => {
  //     if (hash[artist] === undefined) {
  //       hash[artist] = 1;
  //     } else {
  //       hash[artist] = hash[artist] + 1;
  //     }
  //   });
  //   const ret = [0, 0, 0];
  //   Object.keys(hash).forEach((key) => {
  //     let counter = 0;
  //     ret.forEach((num, index) => {
  //       if (typeof num === "number") {
  //         if (counter === 0 && hash[key] > num) {
  //           ret[index] = key;
  //           counter++;
  //         }
  //       } else {
  //         if (counter === 0 && hash[key] > hash[num]) {
  //           const current = ret[index];
  //           ret[index] = key;
  //           ret[index + 1] = current;
  //           counter++;
  //         }
  //       }
  //     });
  //   });
  //   return ret;
  // };

  // const Overview = () => {
  //   return (
  //     <div>
  //       <Grid container spacing={0}>
  //         <Grid item xs={12} sm={6}>
  //           <div className={classes.recentsRoot}>
  //             <div className={classes.centerText}>
  //               <Typography variant="h4">Listening Recently</Typography>
  //             </div>
  //             <div className={classes.recentsContent}>
  //               <div className={classes.centerText}>
  //                 <Typography variant="body1" mx="auto">
  //                   {getTopArtists(user.recentListening).join(", ")} &amp;
  //                   more...
  //                 </Typography>
  //                 <Link
  //                   to={`/${user.data.handle}/recent`}
  //                   className={classes.link}
  //                 >
  //                   <Typography
  //                     variant="body1"
  //                     color="textSecondary"
  //                     className={classes.linkText}
  //                   >
  //                     See Full Playlist
  //                   </Typography>
  //                 </Link>
  //               </div>
  //               {user.recentListening.map((song, index) => {
  //                 if (index < 6) {
  //                   return (
  //                     <div className={classes.recentsSong} key={index}>
  //                       <div
  //                         style={{
  //                           display: "flex",
  //                           alignItems: "center",
  //                           marginRight: "1rem",
  //                         }}
  //                       >
  //                         <Typography
  //                           variant="body2"
  //                           color="textSecondary"
  //                           style={{ paddingLeft: "1rem" }}
  //                         >
  //                           {index + 1}
  //                         </Typography>
  //                         <img
  //                           src={song.images[0].url}
  //                           alt={song.name}
  //                           style={{
  //                             marginLeft: "1rem",
  //                             height: "3.75rem",
  //                             width: "3.75rem",
  //                           }}
  //                         />
  //                       </div>
  //                       <div
  //                         style={{
  //                           display: "flex",
  //                           flexDirection: "column",
  //                           justifyContent: "space-between",
  //                           width: "72%",
  //                         }}
  //                       >
  //                         <Typography variant="body2">{song.name}</Typography>
  //                         <Typography variant="body2" color="textSecondary">
  //                           {getArtistNames(song.artists).join(", ")}
  //                         </Typography>
  //                       </div>
  //                       {ui.audio.active && ui.audio.src === song.preview ? (
  //                         <StopIcon
  //                           style={{ marginRight: ".7rem" }}
  //                           onClick={() => {
  //                             playButtonClick(song.preview, ui.audio);
  //                           }}
  //                         />
  //                       ) : (
  //                         <PlayArrowIcon
  //                           style={{ marginRight: ".7rem" }}
  //                           onClick={() => {
  //                             playButtonClick(song.preview, ui.audio);
  //                           }}
  //                         />
  //                       )}
  //                     </div>
  //                   );
  //                 } else {
  //                   return null;
  //                 }
  //               })}
  //             </div>
  //           </div>
  //         </Grid>
  //         <Grid item xs={12} sm={6}>
  //           <div className={classes.recentsRoot}>
  //             <div className={classes.centerText}>
  //               <Typography variant="h4" mx="auto">
  //                 Top Artists
  //               </Typography>
  //             </div>
  //             <div className={classes.recentsContent}>
  // {user.data.topArtists.map((artist, index) => {
  //   return (
  //     <div className={classes.artist} key={index}>
  //       <Typography
  //         variant="body2"
  //         color="textSecondary"
  //         style={{ paddingLeft: "1rem" }}
  //       >
  //         {index + 1}
  //       </Typography>
  //       <img
  //         src={artist.image}
  //         alt={artist.name}
  //         style={{
  //           height: "4rem",
  //           borderRadius: "15px",
  //           width: "4rem",
  //           margin: "0 1rem",
  //         }}
  //       />
  //       <div>
  //         <Typography variant="body2">{artist.name}</Typography>
  //         {artist.genres && (
  //           <Typography
  //             variant="body2"
  //             color="textSecondary"
  //             style={{
  //               marginRight: ".2rem",
  //             }}
  //           >
  //             {artist.genres.join(", ")}
  //           </Typography>
  //         )}
  //       </div>
  //     </div>
  //   );
  // })}
  //             </div>
  //           </div>
  //         </Grid>
  //         {/* later this will be: if (user has other playlists they want to show) */}
  //         <Grid item xs={12}>
  //           <div className={classes.centerText}>
  //             <Typography variant="h4">Featured Playlists</Typography>
  //           </div>
  //         </Grid>
  //       </Grid>
  //       <div className={classes.playlistContainer}>
  //         {user.playlists.map((playlist, index) => {
  //           if (playlist.data.showOnOverview) {
  //             return (
  //               <div
  //                 className={classes.playlist}
  //                 key={index}
  //                 onClick={() =>
  //                   history.push(`/${playlist.data.user}/${playlist.id}`)
  //                 }
  //               >
  //                 {playlist.data.image.trim() !== "" ? (
  //                   <img
  //                     src={playlist.data.image}
  //                     alt={playlist.data.title}
  //                     style={{
  //                       width: "6rem",
  //                       height: "6rem",
  //                       marginBottom: "",
  //                     }}
  //                   />
  //                 ) : (
  //                   getPlaylistCover(playlist.data)
  //                 )}
  //                 <Typography
  //                   variant="body1"
  //                   color="textPrimary"
  //                   style={{ marginTop: ".6rem" }}
  //                 >
  //                   {playlist.data.title}
  //                 </Typography>
  //               </div>
  //             );
  //           } else {
  //             return null;
  //           }
  //         })}
  //       </div>
  //     </div>
  //   );
  // };
  let match = useRouteMatch();
  let location = useLocation();
  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs
          value={location.pathname}
          // onChange={(e, v) => {
          //   setTabValue(v);
          // }}
        >
          <Tab
            label="recent"
            component={Link}
            to={`${match.url}`}
            value={`${match.url}`}
          />
          <Tab
            label="artists"
            component={Link}
            to={`${match.url}/artists`}
            value={`${match.url}/artists`}
          />
          <Tab
            label="playlists"
            to={`${match.url}/playlists`}
            component={Link}
            value={`${match.url}/playlists`}
          />
        </Tabs>
      </div>
      <div className={classes.content}>
        <Switch>
          <Route path={`${match.path}/artists`}>
            <Artists />
          </Route>
          <Route path={`${match.path}/playlists`}>
            <Playlists handle={user.data.handle} />
          </Route>
          <Route path={match.path}>
            <Recent />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    ui: state.ui,
  };
};

const mapDispatch = {
  playButtonClick,
};

export default connect(mapState, mapDispatch)(ProfileContent);
