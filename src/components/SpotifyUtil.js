import { useEffect } from "react";
import { connect } from "react-redux";
import { setSpotify } from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";

const SpotifyUtil = ({ setSpotify, user }) => {
  const history = useHistory();
  useEffect(() => {
    // need to edit this so someone can't just visit /spotifyauth+randomQueryString and have it update the database.
    const querystring = window.location.search;
    const isUser = Object.keys(user.data).length > 0;
    if (querystring && isUser) {
      setSpotify(user.data, querystring, history);
    }
  }, [user, setSpotify, history]);
  return <div>Talking to Spotify...</div>;
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
  setSpotify,
};

export default connect(mapState, mapDispatch)(SpotifyUtil);
