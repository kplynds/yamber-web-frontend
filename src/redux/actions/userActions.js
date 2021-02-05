import axios from "axios";

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
      history.push("/profile");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data.message,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "JUST_LOGGED_OUT" });
};

export const getAuthenticatedUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
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
      console.log(err.response.data);
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
  console.log("posting to spotify from useractions") 
  axios.post("/setspotify", payload)
    .then((res) => {
      console.log(res)
      history.push("/profile")
    })
    .catch((err) => {
      console.log("error posting to spotify from useractions")
      console.log(err.response)
    })
};

// Spotify register flow:
//   When they click spot Button, signup the user and add them to the db
//   Redirect to spotify sso
//   Once they sign in with spot, redirect to this page:
//   Build a landing page from spotify redirect which:
//     catches tokens from params and adds them to the db

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
}

export const redirectToSpotify = () => (dispatch) => {
  window.location.href = `${axios.defaults.baseURL}/spotifylogin`;
}

export const makePlaylistWithSpotifyData = (spotify) => (dispatch) => {
  spotify.getMyTopTracks()
      .then((res) => {
        const body = {
          tracks: res.items,
          title: "Top 20 Tracks"
        }
        axios.post("/playlist", body)
          .then((res) => {
            console.log(res)
          })
      })
      .catch((err) => {
        console.log(err.response)
      })
}