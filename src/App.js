import React, { useState, useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import "./dx.common.css";
import "./dx.light.css";

import "./App.scss";
import Layout from "./Components/Layout/Layout";
import { useSelector } from "react-redux";
import ToastNotification from "./Components/UI/ToastNotification";
import { useFetch } from "./HighOrderFunctions/FetchFunction/getFetchFunction";
import * as apiEndPoint from "./HighOrderFunctions/API/allGetAPI";
import backgroundIcon from './Icons/transparentVEngageLogo.png';
import {
  typeOptions,
  measureTypeOptions,
} from "./HighOrderFunctions/API/APIData";
import NavigatorOnline from "react-navigator-online";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage,resetDetails } from "./store/actions";
function App() {
  const [showLayout,setShowLayout] = useState(false);
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.reducer.notification);
  const { response: clinicalEntitiesData } = useFetch(
    apiEndPoint.getClinicalEntititesEndPoint,
    false
  );
  const { response: vitalsData } = useFetch(
    apiEndPoint.getAllVitalsEndPoint,
    false
  );
  const { response: symptomData } = useFetch(
    apiEndPoint.getSymptomsEndPoint,
    false
  );
  const showOnlineMessage = (status) => {
    if (status) {
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "You are online.! 👍",
        })
      );
    } else {
      dispatch(
        showNotificationWithMessage({
          variant: "warning",
          message: "You are offline.! 😥",
        })
      );
    }
  };
  useEffect(() => {
    showOnlineMessage(navigator.onLine);
    dispatch(resetDetails())
    setShowLayout(true);
  }, []);
  return (
    <div className="app__container">
      <img className="app__backgroundImage" src={backgroundIcon} />
      {notificationState !== null && (
        <ToastNotification notification={notificationState} />
      )}
      <NavigatorOnline onChange={(status) => showOnlineMessage(status)} />
     {showLayout &&  <Layout
        clinicalEntitiesData={clinicalEntitiesData}
        vitalsData={vitalsData}
        symptomData={symptomData}
        typeOptionsData={typeOptions}
        measureTypeOptionsData={measureTypeOptions}
      />
     }
    </div>
  );
}
export default App;
