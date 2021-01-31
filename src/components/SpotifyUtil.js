import { useEffect } from "react";
import { connect } from "react-redux";
import {setSpotify} from "../redux/actions/userActions";
import { useHistory } from "react-router-dom";

const SpotifyUtil = ({ setSpotify, user }) => {
    const history = useHistory()
    useEffect(() => {
        // check params
        const querystring = window.location.search
        if (querystring) {
            setSpotify(user, querystring, history)
        }
    }, [user, setSpotify, history])
    return (
        <div>loading...</div>
    )
}

const mapState = (state) => {
    return {
      user: state.user.data,
    };
  };
  
  const mapDispatch = {
    setSpotify,
  };

export default connect(mapState, mapDispatch) (SpotifyUtil)