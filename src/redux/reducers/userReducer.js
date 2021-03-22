const initialState = {
  authenticated: false,
  loading: false,
  justLoggedOut: false,
  justSignedUp: false,
  data: {},
  playlists: [],
  recentListening: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return initialState;
    case "LOADING_USER":
      return {
        ...state,
        loading: true,
      };
    case "SET_USER":
      return {
        ...state,
        authenticated: true,
        loading: false,
        data: action.payload,
      };
    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
      };
    case "SET_RECENT_WITH_SPOTIFY":
      return {
        ...state,
        recentListening: action.payload,
      };
    case "JUST_LOGGED_OUT":
      return {
        ...state,
        justLoggedOut: true,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        ...action.payload,
      };
    case "JUST_SIGNED_UP":
      return {
        ...state,
        justSignedUp: true,
      };
    default:
      return state;
  }
}
