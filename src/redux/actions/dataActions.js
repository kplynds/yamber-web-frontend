import { Howl, Howler } from "howler";

export const uiLoading = () => (dispatch) => {
  dispatch({
    type: "LOADING_UI"
  })
}

export const authRouteReached = () => (dispatch) => {
  console.log("auth route reached");
  dispatch({
    type: "AUTHROUTE_REACHED",
    payload: { general: "You must be signed in to access this page" },
  });
};

export const playButtonClick = (src, audio) => (dispatch) => {
  if (src && src.trim() !== "") {
    if (audio.active === false) {
      dispatch({ type: "PLAY_AUDIO", payload: src });
      const sound = new Howl({
        src,
        html5: true,
      });
      sound.play();
      sound.on("end", function () {
        dispatch({ type: "RESET_AUDIO" });
      });
    } else {
      if (audio.src === src) {
        Howler.stop();
        dispatch({ type: "RESET_AUDIO" });
      } else {
        Howler.stop();
        dispatch({ type: "RESET_AUDIO" });
        dispatch({ type: "PLAY_AUDIO", payload: src });
        const sound = new Howl({
          src,
          html5: true,
        });
        sound.play();
        sound.on("end", function () {
          dispatch({ type: "RESET_AUDIO" });
        });
      }
    }
  } else {
    alert("there is no preview for this track")
  }
};
