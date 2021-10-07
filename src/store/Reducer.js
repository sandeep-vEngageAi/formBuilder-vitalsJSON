import {
  NOTIFICATION_WITH_MESSAGE,
  VITALS_DATA,
  FILE_DETAILS,
  RESET_DETAILS,
  HAS_FILE_UPDATED
} from "./actionTypes";

const initialState = {
  notification: null,
  vitalsData: "",
  fileDetails: {},
  fileUpdated: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_WITH_MESSAGE:
      return {
        ...state,
        notification: action.notification,
      };

    case VITALS_DATA:
      return {
        ...state,
        vitalsData: action.vitalsData,
      };
    case FILE_DETAILS:
      return {
        ...state,
        fileDetails: action.fileDetails,
      };
    case HAS_FILE_UPDATED:
      return {
        ...state,
        fileUpdated: action.status,
      };
    case RESET_DETAILS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default Reducer;
