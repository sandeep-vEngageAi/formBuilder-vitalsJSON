import {
  NOTIFICATION_WITH_MESSAGE,
  VITALS_DATA,
  FILE_DETAILS,
  RESET_DETAILS,
  HAS_FILE_UPDATED,
  SOME_FORMS_EMPTY
} from "./actionTypes";

const initialState = {
  notification: null,
  vitalsData: "",
  fileDetails: {},
  fileUpdated: false,
  someFormsEmpty:false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_WITH_MESSAGE:
      return {
        ...state,
        notification: action.notification,
      };
   // contains all contents of added file
    case VITALS_DATA:
      return {
        ...state,
        vitalsData: action.vitalsData,
      };
    // contains name of file added
    case FILE_DETAILS:
      return {
        ...state,
        fileDetails: action.fileDetails,
      };
    // to check whether individual json has been saved or not after editing
    case HAS_FILE_UPDATED:
      return {
        ...state,
        fileUpdated: action.status,
      };
      // check whether some newly added json form is saved or not
      case SOME_FORMS_EMPTY:
      return{
        ...state,
        someFormsEmpty:action.status
      }
    // reset all details in this redux
    case RESET_DETAILS:
      return {
        ...initialState,
      };
    
    default:
      return state;
  }
};

export default Reducer;
