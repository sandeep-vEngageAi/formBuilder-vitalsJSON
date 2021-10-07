import {NOTIFICATION_WITH_MESSAGE,VITALS_DATA ,FILE_DETAILS,RESET_DETAILS} from './actionTypes';

export const showNotificationWithMessage = (status)=>{
    return{
        type:NOTIFICATION_WITH_MESSAGE,
        notification:status
    }
}

export const setVitalsData = (data)=>{
    return {
        type:VITALS_DATA,
        vitalsData:data
    }
}

export const setFileDetails =(fileDetails)=>{
    return{
        type:FILE_DETAILS,
        fileDetails:fileDetails
    }
}

export const resetDetails = ()=>{
    return{
        type:RESET_DETAILS
    }
}
