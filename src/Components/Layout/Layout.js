import React, { useState, useEffect } from "react";
import LayoutNavbar from "../LayoutNavbar/LayoutNavbar";
import LayoutSidebar from "../LayoutSidebar/LayoutSidebar";
import LayoutBody from "../LayoutBody/LayoutBody";
// import vitalsData from "../../Data/vitals.json";
import masterJson from "../../Data/master.json";
import { useSelector } from "react-redux";
import "./Layout.scss";
import { showNotificationWithMessage } from "../../store/actions";
const Layout = (props) => {
  const vitalsJsonTemplate = useSelector(state=>state.reducer.vitalsData);
  const [templateData, setTemplateData] = useState(null);
  const [currentSelectedJsonIndex, setCurrentSelectedJsonIndex] = useState(-1);
  const [currentJson, setCurrentJson] = useState({});
    
  const selectCurrentJsonFunc = (jsonIndexInTemplate) => {
    if (jsonIndexInTemplate > -1) {
      setCurrentSelectedJsonIndex(jsonIndexInTemplate);
      setCurrentJson(templateData[jsonIndexInTemplate]);
    } else {
      dispatch(showNotificationWithMessage({
        variant:"warning",
        message:"Please select Form object."
      }))
    }
  };
  
  const updateJsonTemplateData = (jsonObject, index) => {
    let tempTemplateData = [...templateData];
    tempTemplateData[index] = jsonObject;
    setTemplateData((prev) => [...tempTemplateData]);
  };

  const addNewJsonObject = () => {
    let tempTemplateData = [...templateData];
    tempTemplateData.push(masterJson)
    setTemplateData((prev) => [...tempTemplateData]);
  };

  const deleteJsonObject = (index)=>{
    let tempTemplateData = [...templateData];
    tempTemplateData.splice(index,1);
    setTemplateData((prev) => [...tempTemplateData]);
    
  }
  useEffect(() => {
    setCurrentSelectedJsonIndex(-1);
       setTemplateData(vitalsJsonTemplate);
       setCurrentJson(prev=>{})
    return () => {
      setTemplateData([]);
    };
  }, [vitalsJsonTemplate]);
  
  return (
    <div className="layout__content">
      <div className="layout__Navbar">
        <LayoutNavbar />
      </div>
      <div className="layout__sidebar">
        
          <LayoutSidebar
            templateData={templateData}
            selectCurrentJsonFunc={selectCurrentJsonFunc}
            currentSelectedJsonIndex={currentSelectedJsonIndex}
            addNewJsonObject={addNewJsonObject}
            deleteJsonObject={deleteJsonObject}
          />
      </div>
      <div className="layout__body">
        <LayoutBody
          jsonObject={currentJson}
          currentSelectedJsonIndex={currentSelectedJsonIndex}
          updateJsonTemplateData={updateJsonTemplateData}
          {...props}
        />
      </div>
    </div>
  );
};

export default Layout;
