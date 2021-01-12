const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: [],
  playlists: [],
  testCounter: 0,
};

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return {
        ...state,
        authenticated: true,
      };
    case "SET_UNAUTHENTICATED":
      return initialState;
    case "SET_USER":
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case "INCREMENT": 
      return {
        ...state,
        testCounter: state.testCounter + 1,
      };
    default:
      return state;
  }
}
