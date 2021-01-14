export const authRouteReached = () => (dispatch) => {
    console.log("auth route reached");
    dispatch({ type: "AUTHROUTE_REACHED", payload: { general: "You must be signed in to access this page"} })
}