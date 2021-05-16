import React, { useState } from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile";
import {
  getUserData,
  getAuthenticatedUserData,
} from "../../redux/actions/userActions";
import { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Profile from "./Profile";
import NotFound from "../NotFound";
import CenterLoadingWithNav from "../CenterLoadingWithNav";

// This component figures out what component to display when someone goes to /:handle

const User = ({ match, user }) => {
  const handle = match.params.handle;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (handle) {
      axios
        .get(`/userbase/${handle}`)
        .then((res) => {
          if (
            res.data.user.recentListeningPreference === "spotify" &&
            res.data.user.recentListening.expireTime < Date.now()
          ) {
            console.log("gonna set new recentListening");
            let body = {};
            if (res.data.user.spotify.expireTime > Date.now()) {
              body.token = res.data.user.spotify.access_token;
            } else {
              const payload = {
                refresh_token: res.data.user.spotify.refresh_token,
              };
              axios
                .post("/spotifyrefreshtoken", payload)
                .then((refreshRes) => {
                  const settingBody = {
                    token: refreshRes.data.access_token,
                    handle: handle,
                  };
                  axios
                    .post("/setnewspotifytoken", settingBody)
                    .then((res) => {
                      body.token = res.data.user.spotify.access_token;
                    })
                    .catch((err) => {
                      console.log("error when posting to /setnewspotifytoken");
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log("error when posting to /spotifyrefreshtoken");
                  console.log(err);
                });
            }
            axios
              .post(`/spotifyrecentdata/${handle}`, body)
              .then((resFinal) => {
                setProfile(res.data.user);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
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
  }, [handle]);
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
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  getUserData,
  getAuthenticatedUserData,
};

export default connect(mapState, mapDispatch)(User);
