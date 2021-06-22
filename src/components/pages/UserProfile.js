import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Spotify from "spotify-web-api-js";
import Hidden from "@material-ui/core/Hidden";
import DesktopNav from "../nav/DesktopNav";
import MobileNav from "../nav/MobileNav";
import theme from "../../theme";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { FaSpotify } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MobileProfile from "../MobileProfile";
import { playButtonClick } from "../../redux/actions/dataActions";
import Playlists from "../profile content/Playlists";
import Recent from "../profile content/Recent";
import Artists from "../profile content/Artists";

export const getSpotifyRecentData = (
  user,
  setRecentListening,
  fromPlaylist
) => {
  const spotify = new Spotify();
  const now = Date.now();
  if (user.spotify.expireTime > now) {
    spotify.setAccessToken(user.spotify.access_token);
    spotify
      .getMyTopTracks({
        time_range: "short_term",
        limit: 15,
      })
      .then((res) => {
        const finished = [];
        res.items.forEach((item) => {
          const song = {
            name: item.name,
            artists: item.artists,
            preview: item.preview_url,
            href: item.href,
            images: item.album.images,
          };
          finished.push(song);
        });
        if (fromPlaylist) {
          setRecentListening({
            songs: finished,
            title: "Recent Listening",
            user: user.handle,
          });
        } else {
          setRecentListening(finished);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("error here");
      });
  } else {
    const payload = { refresh_token: user.spotify.refresh_token };
    axios
      .post("/spotifyrefreshtoken", payload)
      .then((res) => {
        const body = { token: res.data.access_token, handle: user.handle };
        axios
          .post("/setnewspotifytoken", body)
          .then((res) => {
            spotify.setAccessToken(res.data);
            spotify
              .getMyTopTracks({
                time_range: "short_term",
                limit: 15,
              })
              .then((res) => {
                const finished = [];
                res.items.forEach((item) => {
                  const song = {
                    name: item.name,
                    artists: item.artists,
                    preview: item.preview_url,
                    href: item.href,
                    images: item.album.images,
                    id: item.id,
                  };
                  finished.push(song);
                });
                if (fromPlaylist) {
                  setRecentListening({
                    songs: finished,
                    title: "Recent Listening",
                    user: user.handle,
                  });
                } else {
                  setRecentListening(finished);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("error posting to refresh token endpoint?");
        console.log(err);
      });
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderBottom: "1px solid grey",
    background: theme.palette.primary.dark,
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.primary.main,
    borderRadius: "15px",
    width: "25%",
  },
  basic: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  name: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1),
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

const UserProfile = ({ profile, playButtonClick, ui }) => {
  const classes = useStyles(theme);
  // const [playlists, setPlaylists] = useState([]);
  // const [recentListening, setRecentListening] = useState([]);
  const [tabValue, setTabValue] = useState(0);
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
  // const getArtistNames = (arr) => {
  //   const ret = [];
  //   arr.forEach((artist) => {
  //     ret.push(artist.name);
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
  //                   {getTopArtists(recentListening).join(", ")} &amp; more...
  //                 </Typography>
  //                 <Link
  //                   to={`/${profile.handle}/recent`}
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
  //               {recentListening.map((song, index) => {
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
  //               {profile.topArtists.map((artist, index) => {
  //                 return (
  //                   <div className={classes.artist} key={index}>
  //                     <Typography
  //                       variant="body2"
  //                       color="textSecondary"
  //                       style={{ paddingLeft: "1rem" }}
  //                     >
  //                       {index + 1}
  //                     </Typography>
  //                     <img
  //                       src={artist.image}
  //                       alt={artist.name}
  //                       style={{
  //                         height: "4rem",
  //                         borderRadius: "15px",
  //                         width: "4rem",
  //                         margin: "0 1rem",
  //                       }}
  //                     />
  //                     <div>
  //                       <Typography variant="body2">{artist.name}</Typography>
  //                       {artist.genres && (
  //                         <Typography
  //                           variant="body2"
  //                           color="textSecondary"
  //                           style={{
  //                             marginRight: ".2rem",
  //                           }}
  //                         >
  //                           {artist.genres.join(", ")}
  //                         </Typography>
  //                       )}
  //                     </div>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </div>
  //         </Grid>
  //       </Grid>
  //     </div>
  //   );
  // };
  const DesktopProfile = () => {
    return (
      <div className={classes.root}>
        <div className={classes.basic}>
          <Avatar
            alt={profile.info.displayName}
            src={profile.info.imageUrl}
            style={{ width: theme.spacing(15), height: theme.spacing(15) }}
          />
          <Typography variant="h4" color="textPrimary">
            @{profile.handle}
          </Typography>
        </div>
        <div className={classes.content}>
          <div className={classes.name}>
            <Typography
              variant="h4"
              style={{ marginRight: theme.spacing(1) }}
              color="textPrimary"
            >
              {profile.info.displayName}
            </Typography>
            <FaSpotify size={30} color={theme.palette.text.primary} />
          </div>
          <Button>Make a Playlist</Button>
          <Typography variant="body1" color="textPrimary">
            {profile.info.bio}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.base}>
      <Hidden smDown>
        <DesktopNav />
        <DesktopProfile />
      </Hidden>
      <Hidden mdUp>
        <MobileNav />
        <MobileProfile user={profile} />
      </Hidden>
      <div className={classes.tabs}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => {
            setTabValue(v);
          }}
        >
          <Tab label="recent" />
          <Tab label="artists" />
          <Tab label="playlists" />
        </Tabs>
      </div>
      <div className={classes.stuff}>
        {tabValue === 0 && <Recent data={profile} />}
        {tabValue === 1 && <Artists data={profile.topArtists} />}
        {tabValue === 2 && <Playlists handle={profile.handle} />}
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

export default connect(mapState, mapDispatch)(UserProfile);
