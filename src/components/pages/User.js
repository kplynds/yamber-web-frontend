import React, { useState } from "react";
import { connect } from "react-redux";
import UserProfile from "./UserProfile";
import { getUserData, getAuthenticatedUserData } from "../../redux/actions/userActions";
import { useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Profile from "./Profile";

// This component figures out what component to display when someone goes to /:handle

const User = ({match, user, getAuthenticatedUserData}) => {
    const handle = match.params.handle
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        if (handle) {
            axios.get(`/userbase/${handle}`)
                .then((res) => {
                    setProfile(res.data.user)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.response)
                    setLoading(false)
                })
        }
    }, [handle])
    if (!loading) {
        if (profile) {
            if (profile.handle === user.data.handle) {
                return <Profile /> //render the profile component here. 
            } else {
                return <UserProfile profile={profile} />
            }
        } else {
            return <div>user not found</div>
        }
    } else {
        return <div>loading</div>
    }
};

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = {
    getUserData,
    getAuthenticatedUserData,
}

export default connect(mapState, mapDispatch)(User);
