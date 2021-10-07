import React from "react";
import "./LayoutSidebarJsonDropdown.scss";
import fileUploadIcon from "../../../Icons/fileupload_1.jpg";
import { useDispatch } from "react-redux";
import {
  showNotificationWithMessage,
  setVitalsData,
  setFileDetails,
} from "../../../store/actions";
const LayoutSidebarJsonDropdown = (props) => {
  const dispatch = useDispatch();

  const getFileContent = async (file) => {
    const contents = await file.text();

    try {
      let jsonContent = JSON.parse(contents);
      dispatch(setFileDetails(file));
      dispatch(setVitalsData(jsonContent));
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "JSON File Chosen",
        })
      );
    } catch (err) {
      if (contents.length == 0) {
        dispatch(
          showNotificationWithMessage({
            variant: "success",
            message: "Empty JSON File Chosen",
          })
        );
        dispatch(setFileDetails(file));
        dispatch(setVitalsData([]));
      } else {
        dispatch(
          showNotificationWithMessage({
            variant: "warning",
            message: "Please choose Array of JSON",
          })
        );
      }
    }
  };

  // getFileContent is a function defined above
  const getFileAccess = async (getFileContent) => {
    // fileHandle
    const [fileHandle] = await window.showOpenFilePicker();
    props.setFileHandler(fileHandle);
    const file = await fileHandle.getFile();

    await getFileContent(file);
  };
  const onDrop = async (e, getFileContent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    await getFileContent(file);
  };
  return (
    <div className="layoutSidebarJsonDropdown__container">
      <div className="layoutSidebarJsonDropdown__text">
        Please Select Template
      </div>
      <div
        className="layoutSidebarJsonDropdown__SearchBox"
        onClick={(e) => getFileAccess(getFileContent)}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => onDrop(e, getFileContent)}
      >
        <img src={fileUploadIcon} className="layoutSidebarJson__image" />
      </div>
    </div>
  );
};

export default LayoutSidebarJsonDropdown;
