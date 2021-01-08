import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post(
        "https://us-central1-flumes-company.cloudfunctions.net/api/login",
        userData
      )
      .then((res) => {
        setLoading(false);
        history.push("/protected");
      })
      .catch((err) => {
        console.log(err.response.data.general);
        setRenderedErrors({ error: `${err.response.data.general}` });
        setLoading(false);
      });
}

export const getUserData = () => (dispatch) => {
    
}