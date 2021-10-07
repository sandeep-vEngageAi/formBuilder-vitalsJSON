import React, { useState, useEffect, useRef } from "react";
import LayoutSidebarJsonDropdown from "../LayoutSidebarJsonDropdown/LayoutSidebarJsonDropdown";
import LayoutSidebarJsonObject from "./LayoutSidebarJsonObject/LayoutSidebarJsonObject";
import { v4 as uuidv4 } from "uuid";
import "./LayoutSidebarListOfJsons.scss";
const LayoutSidebarListOfJsons = (props) => {
  const jsonRef = useRef();
  const [listOfJsons, setListOfJsons] = useState([]);
  
  useEffect(() => {
    setListOfJsons(props.templateData);
    return () => {
      setListOfJsons([]);
    };
  }, [props.templateData]);
  let renderedList = null;
  renderedList =
    Array.isArray(listOfJsons) &&
    listOfJsons.length > 0 &&
    listOfJsons.map((item, index) => {
      return (
        <LayoutSidebarJsonObject
          item={item}
          key={uuidv4()}
          index={index}
          selectCurrentJsonFunc={props.selectCurrentJsonFunc}
          currentSelectedJsonIndex={props.currentSelectedJsonIndex}
          deleteJsonObject={props.deleteJsonObject}
        />
      );
    });

  return (
    <div className="layoutSidebarListOfJsons__container">
      <div>{renderedList}</div>
      <div ref={jsonRef} />
    </div>
  );
};

export default LayoutSidebarListOfJsons;
