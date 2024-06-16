import {
  ON_FULFILLED,
  ON_GET_ALL_FILES,
  ON_PENDING,
  ON_REJECTED,
  RESET,
} from "./filesActions";

const filesReducer = (state, action) => {
  switch (action.type) {
    case ON_PENDING:
      return { ...state, file_isLoading: true };
    case ON_FULFILLED:
      return {
        ...state,
        file_isLoading: false,
        file_isSuccess: true,
        file_isError: false,
      };
    case ON_GET_ALL_FILES:
      return {
        file_isLoading: false,
        file_isSuccess: true,
        file_isError: false,
        allFiles: action.payload.Files,
      };
    case ON_REJECTED:
      return {
        ...state,
        file_isLoading: false,
        file_isSuccess: false,
        file_isError: true,
      };
    case RESET:
      return {
        ...state,
        file_isLoading: false,
        file_isSuccess: false,
        file_isError: false,
      };
    default:
      return state;
  }
};
export default filesReducer;
