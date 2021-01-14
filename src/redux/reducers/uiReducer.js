const initialState = {
  loading: false,
  errors: "",
};

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case "AUTHROUTE_REACHED":
      return {
        ...state,
        errors: action.payload,
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
    default:
      return state;
  }
}
