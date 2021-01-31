import { useEffect } from "react";
import { connect } from "react-redux";
import {setSpotify} from "../redux/actions/userActions";

const SpotifyUtil = ({ setSpotify, user }) => {
    useEffect(() => {
        // check params
        if (window.location.search) {
            console.log(user)
        }
    }, [user])
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