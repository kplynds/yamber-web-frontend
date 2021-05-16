import Spotify from "spotify-web-api-js";
import axios from "axios";

const spotify = new Spotify();

const getSpotifyData = (user) => {
  const now = Date.now();
  if (user.spotify.expireTime > now) {
    spotify.setAccessToken(user.spotify.access_token);
    const spotToken = spotify.getAccessToken();
    const ret = {
      update: false,
      spotToken,
    };
    return ret;
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
            const spotToken = spotify.getAccessToken();
            const ret = {
              update: true,
              spotToken,
            };
            return ret;
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
};

export default getSpotifyData;
