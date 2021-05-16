import Spotify from "spotify-web-api-js";
import axios from "axios";
const spotify = new Spotify();

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      dispatch({ type: "SET_AUTHENTICATED" });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch(getAuthenticatedUserData());
      history.push(`${res.data.user.handle}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data.message,
      });
    });
};

export const logout = (history) => (dispatch) => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "JUST_LOGGED_OUT" });
  window.location.href="/login";
};

export const getAuthenticatedUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .get("/authenticateduserplaylists")
    .then((res) => {
      if (res.data !== "user has no playlists") {
        dispatch({
          type: "SET_USER_PLAYLISTS",
          payload: res.data,
        });
      }
    })
    .catch((err) => console.log(err.response));
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: "SET_USER",
        payload: res.data,
      });
      if (res.data.spotify.authenticated) {
        // eventually this will become, if user is auth'd with spotify && user has set recentListening to auto update with spotify.
        dispatch(setSpotifyRecentData(res.data));
      }
    })
    .catch((err) => console.log(err.response));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .get(`/userbase/${userHandle}`)
    .then((res) => {
      dispatch({
        type: "SET_USER",
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: "CLEAR_ERRORS" });
    });
};

export const seedWithSpotify = (user, util) => (dispatch) => {
  const now = Date.now();
  if (util.type === "seed") {
    spotify.setAccessToken(user);
  } else if (user.spotify.expireTime > now) {
    spotify.setAccessToken(user.spotify.access_token);
  } else {
    const payload = { refresh_token: user.spotify.refresh_token };
    axios
      .post("/spotifyrefreshtoken", payload)
      .then((res) => {
        const body = { token: res.data.access_token };
        axios
          .post("/setnewspotifytoken", body)
          .then((res) => {
            spotify.setAccessToken(res.data);
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
  spotify
    .getMyTopTracks({
      time_range: "long_term",
      limit: 50,
    })
    .then((res) => {
      const songs = [];
      res.items.forEach((item) => {
        const artists = [];
        item.artists.forEach((artist) => {
          artists.push(artist.name);
        });
        const song = {
          name: item.name,
          artists: artists,
          preview: item.preview_url,
          href: item.href,
          images: item.album.images,
          spotifyId: item.id,
        };
        songs.push(song);
      });
      spotify
        .getMyTopArtists({
          time_range: "long_term",
          limit: 6,
        })
        .then((res) => {
          const artists = [];
          res.items.forEach((item) => {
            const artist = {
              name: item.name,
              href: item.href,
              spotifyId: item.id,
              images: item.images,
              genres: item.genres,
            };
            artists.push(artist);
          });
          const body = { songs: songs, artists: artists };
          axios
            .post("/seedspotifydata", body)
            .then((res) => {
              dispatch(getAuthenticatedUserData());
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err.response);
        });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const setSpotify = (user, querystring, history) => (dispatch) => {
  const urlParams = new URLSearchParams(querystring);
  const access_token = urlParams.get("access_token");
  const payload = {
    user: user,
    spotify: {
      access_token: access_token,
      refresh_token: urlParams.get("refresh_token"),
    },
  };
  axios
    .post("/setspotify", payload)
    .then((res) => {
      // dispatch(seedWithSpotify(access_token, { type: "seed" }));
      dispatch(getAuthenticatedUserData());
      history.push('/welcome/customize');
    })
    .catch((err) => {
      console.log("error posting to spotify from useractions");
      console.log(err);
    });
};

export const signupUser = (registerData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/signup", registerData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getAuthenticatedUserData());
      dispatch({ type: "JUST_SIGNED_UP" });
      dispatch({ type: "SET_AUTHENTICATED" });
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/welcome/streamingProvider");
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const signupUserWithSpotify = (registerData) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/signup", registerData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getAuthenticatedUserData());
      dispatch({ type: "JUST_SIGNED_UP" });
      dispatch({ type: "SET_AUTHENTICATED" });
      dispatch({ type: "CLEAR_ERRORS" });
      dispatch(redirectToSpotify());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const redirectToSpotify = () => (dispatch) => {
  window.location.href = `${axios.defaults.baseURL}/spotifylogin`;
};

export const updateProfileInfo = (values) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/update", values)
    .then((res) => {
      dispatch(getAuthenticatedUserData());
      dispatch({ type: "STOP_LOADING_UI" });
      document.location.reload(true);
    })
    .catch((err) => {
      console.log("error!!!");
    });
};

export const setSpotifyRecentData = (user) => (dispatch) => {
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
        dispatch({ type: "SET_RECENT_WITH_SPOTIFY", payload: finished });
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
        const body = { token: res.data.access_token };
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
                dispatch({
                  type: "SET_RECENT_WITH_SPOTIFY",
                  payload: finished,
                });
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
