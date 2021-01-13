import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  console.log("connected to action");
  dispatch({ type: "LOADING_UI" });
  axios
    .post(
      "https://us-central1-flumes-company.cloudfunctions.net/api/login",
      userData
    )
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      history.push("/protected");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const test = () => {
  console.log("test");
};
