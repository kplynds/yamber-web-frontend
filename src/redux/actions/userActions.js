import axios from "axios";

// *** Need to make sure signup flows push to /user and not /profile ***

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
  history.push("/login");
};

export const getAuthenticatedUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .get("/profileplaylists")
    .then((res) => {
      dispatch({
        type: "SET_USER_PROFILE_PLAYLISTS",
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response));
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: "SET_USER",
        payload: res.data,
      });
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

export const setSpotify = (user, querystring, history) => (dispatch) => {
  const urlParams = new URLSearchParams(querystring);
  const payload = {
    user: user,
    spotify: {
      access_token: urlParams.get("access_token"),
      refresh_token: urlParams.get("refresh_token"),
    },
  };
  console.log("posting to spotify from useractions");
  axios
    .post("/setspotify", payload)
    .then((res) => {
      console.log(res);
      history.push("/profile");
    })
    .catch((err) => {
      console.log("error posting to spotify from useractions");
      console.log(err.response);
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
      history.push("/profile");
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

export const makePlaylistWithSpotifyData = (spotify) => (dispatch) => {
  spotify
    .getMyTopTracks()
    .then((res) => {
      console.log(res);
      // const body = {
      //   tracks: res.items,
      //   title: "Top 20 Tracks"
      // }
      // axios.post("/playlist", body)
      //   .then((res) => {
      //     console.log(res)
      //   })
    })
    .catch((err) => {
      console.log(err.response);
    });
};
