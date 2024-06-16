import {
  LOGOUT,
  ON_FORGOT_PASSWORD,
  ON_FULFILLED,
  ON_FULFILLED_LOGIN,
  ON_FULFILLED_SIGNUP,
  ON_PENDING,
  ON_REJECTED,
  RESET,
} from "./authActions";

const authReducer = (state, action) => {
  switch (action.type) {
    case ON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ON_FULFILLED:
      return {
        isLoggedIn: action.payload.status,
        isLoading: false,
        isSuccess: true,
        isError: false,
        activeUser: action.payload.user,
      };
    case ON_FULFILLED_LOGIN:
      return {
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        activeUser: action.payload.user,
      };
    case ON_FULFILLED_SIGNUP:
      return {
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        activeUser: action.payload.user,
      };
    case ON_FORGOT_PASSWORD:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    case ON_REJECTED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    case RESET:
      return {
        isLoading: false,
        isSuccess: false,
        isError: false,
      };
    case LOGOUT: {
      return {
        isLoggedIn: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
        activeUser: {},
      };
    }
    default:
      return state;
  }
};

export default authReducer;
