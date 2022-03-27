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
import LoadingSongs from "../../Loading/LoadingSongs";
import LoadingDesktopProfile from "../../Loading/LoadingDesktopProfile";

// This component figures out what component to display when someone goes to /:handle
const User = ({ match, user, setLoggedInUser }) => {
  const handle = match.params.handle;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [songsLoading, setSongsLoading] = useState({
    short_term: true,
    medium_term: true,
    long_term: true,
  });
  const [artistsLoading, setArtistsLoading] = useState(true);
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
          const user = res.data.user;
          setProfile(user);
          setLoading(false);
          if (user.songsAutoUpdateTime < Date.now() && profile) {
            const keys = ["short_term", "medium_term", "long_term"];
            for (let i = 0; i < 3; i++) {
              axios
                .get(`/refreshspotifysongs/${handle}/${keys[i]}/${i}`)
                .then((res) => {
                  setProfile({
                    ...profile,
                    [keys[i]]: res.data,
                  });
                  setProfile({
                    ...profile,
                    songsUpdateTime_english: new Date().toLocaleString(
                      "en-US",
                      {
                        timeZone: "America/Los_Angeles",
                      }
                    ),
                  });
                  setSongsLoading({
                    short_term: false,
                    medium_term: i < 1 ? true : false,
                    long_term: i < 2 ? true : false,
                  });
                })
                .catch((err) => {
                  alert("there has getting new songs been an error so sorry");
                });
            }
          } else if (profile) {
            setSongsLoading({
              short_term: false,
              medium_term: false,
              long_term: false,
            });
          } else {
            setProfile(res.data.user);
            setSongsLoading({
              short_term: false,
              medium_term: false,
              long_term: false,
            });
          }
          if (user.artistsAutoUpdateTime < Date.now() && profile) {
            axios
              .get(`/refreshspotifyartists/${handle}`)
              .then((res) => {
                setProfile({
                  ...profile,
                  topArtists: res.data,
                });
                setArtistsLoading(false);
              })
              .catch((err) => {
                console.error(err);
                alert("there has been an error so sorry");
              });
          } else if (profile) {
            setArtistsLoading(false);
          } else {
            setProfile(res.data.user)
            setArtistsLoading(false);
          }
        })
        .catch((err) => {
          alert("booo we couldn't find this user");
        });
    }
  }, [handle, setLoggedInUser, user.data.handle]);

  if (!loading) {
    if (profile) {
      if (profile.handle === user.data.handle) {
        return (
          <Profile
            songsLoading={songsLoading}
            artistsLoading={artistsLoading}
          />
        ); //render the profile component here.
      } else {
        return (
          <UserProfile
            songsLoading={songsLoading}
            artistsLoading={artistsLoading}
            profile={profile}
          />
        );
      }
    } else {
      return <NotFound user={user} />;
    }
  } else {
    return (
      <div>
        <LoadingDesktopProfile />
        <LoadingSongs />
      </div>
    );
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
