const initialState = {
  loading: false,
  errors: "",
  audio: {
    active: false,
    src: "",
  },
  fullyMounted: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHROUTE_REACHED":
      return {
        ...state,
        errors: action.payload,
      };
    case "PLAY_AUDIO": {
      return {
        ...state,
        audio: {
          active: true,
          src: action.payload,
        },
      };
    }
    case "RESET_AUDIO": {
      return {
        ...state,
        audio: {
          active: false,
          src: "",
        },
      };
    }
    case "SET_ERRORS":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loading: false,
        errors: "",
      };
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING_UI":
      return {
        ...state,
        loading: false,
      };
    case "FULLY_MOUNTED":
      return {
        ...state,
        fullyMounted: true,
      };
    default:
      return state;
  }
}
