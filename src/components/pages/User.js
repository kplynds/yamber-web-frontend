import React, { useState } from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile";
import {
  getUserData,
  getAuthenticatedUserData,
  setLoggedInUser,
} from "../../redux/actions/userActions";
import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Profile from "./Profile";
import NotFound from "../NotFound";
import CenterLoadingWithNav from "../CenterLoadingWithNav";

// This component figures out what component to display when someone goes to /:handle
const User = ({ match, user, setLoggedInUser }) => {
  const handle = match.params.handle;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (handle === "undefined") {
      localStorage.clear();
      window.location = "/login";
    }
    if (handle) {
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          // setProfile(res.data.user);
          if (
            res.data.user.songsDataPreference === "autoSpotify" &&
            res.data.user.recentListening.expireTime < Date.now()
          ) {
            axios
              .get(`/spotifyrecentdata/${handle}`)
              .then((recentRes) => {
                if (recentRes.data.handle === user.data.handle) {
                  setLoggedInUser(recentRes.data);
                }
                setProfile(recentRes.data);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
            //   body.token = res.data.user.spotify.access_token;
            //   body.user = res.data.user;
            //   axios
            //     .post(`/spotifyrecentdata/${handle}`, body)
            //     .then((resFinal) => {
            //       if (resFinal.data.handle !== user.data.handle) {
            //         setProfile(resFinal.data);
            //       } else {
            //         setLoggedInUser(resFinal.data);
            //       }
            //       setLoading(false);
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //       setLoading(false);
            //     });
            // } else {
            //   const payload = {
            //     refresh_token: res.data.user.spotify.refresh_token,
            //   };
            //   axios
            //     .post("/spotifyrefreshtoken", payload)
            //     .then((refreshRes) => {
            //       const settingBody = {
            //         token: refreshRes.data.access_token,
            //         handle: handle,
            //       };
            //       axios
            //         .post("/setnewspotifytoken", settingBody)
            //         .then((last) => {
            //           body.token = last.data;
            //           body.user = res.data.user;
            //           axios
            //             .post(`/spotifyrecentdata/${handle}`, body)
            //             .then((resFinal) => {
            //               if (resFinal.data.handle !== user.data.handle) {
            //                 setProfile(resFinal.data);
            //               } else {
            //                 setLoggedInUser(resFinal.data);
            //               }
            //               setLoading(false);
            //             })
            //             .catch((err) => {
            //               console.log(err);
            //               setLoading(false);
            //             });
            //         })
            //         .catch((err) => {
            //           console.log("error when posting to /setnewspotifytoken");
            //           console.log(err);
            //         });
            //     })
            //     .catch((err) => {
            //       console.log("error when posting to /spotifyrefreshtoken");
            //       console.log(err);
            //     });
            // }
          } else {
            setProfile(res.data.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }
  }, [handle, setLoggedInUser, user.data.handle]);
  if (!loading) {
    if (profile) {
      if (profile.handle === user.data.handle) {
        return <Profile />; //render the profile component here.
      } else {
        return <UserProfile profile={profile} />;
      }
    } else {
      return <NotFound user={user} />;
    }
  } else {
    return <CenterLoadingWithNav />;
  }
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setLoggedInUser: PropTypes.func.isRequired,
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  getUserData,
  getAuthenticatedUserData,
  setLoggedInUser,
};

export default connect(mapState, mapDispatch)(User);
