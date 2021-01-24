import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: "LOADING_UI" });
  axios
    .post("/login", userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getUserData());
      dispatch({ type: "SET_AUTHENTICATED" });
      dispatch({ type: "CLEAR_ERRORS" });
      history.push("/profile");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "JUST_LOGGED_OUT" });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: "LOADING_USER" });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: "SET_USER",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: "CLEAR_ERRORS" });
    });
};

export const setSpotify = (querystring) => (dispatch) => {
  console.log("trying to save stuff!");
  const urlParams = new URLSearchParams(querystring);
  const payload = {
    spotify: {
      access_token: urlParams.get("access_token"),
      refresh_token: urlParams.get("refresh_token"),
    },
  };
  dispatch({
    type: "SET_SPOTIFY",
    payload: payload,
  });
};
