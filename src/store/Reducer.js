import {NOTIFICATION_WITH_MESSAGE,VITALS_DATA,FILE_DETAILS } from './actionTypes';

const initialState = {
    notification:null,
    vitalsData:"",
    fileDetails:{}
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case NOTIFICATION_WITH_MESSAGE:
        return {
          ...state,
          notification: action.notification,
        };
      
      case VITALS_DATA:
        return{
          ...state,
          vitalsData:action.vitalsData
        }
      case FILE_DETAILS:
        return{
          ...state,
          fileDetails:action.fileDetails
        }
      
      default:
        return state;
    }
  };
  
  export default Reducer;