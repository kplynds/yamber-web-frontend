import React from "react";
import { connect } from "react-redux";

function EditArtistsAdjust({ artists, user }) {
  return (
    <div>
      {artists.map((artist) => {
        return <div>{artist.name}</div>;
      })}
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    loading: state.ui.loading,
  };
};

export default connect(mapState)(EditArtistsAdjust);
