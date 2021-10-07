import React from "react";
import "./LayoutSidebarJsonDropdown.scss";
import fileUploadIcon from "../../../Icons/fileupload_1.jpg";
import { useDispatch } from "react-redux";
import {
  showNotificationWithMessage,
  setVitalsData,
  setFileDetails
} from "../../../store/actions";
const LayoutSidebarJsonDropdown = (props) => {
  const dispatch = useDispatch();
  const getFileContent = async (fileHandle) => {
    const file = await fileHandle.getFile();
    dispatch(setFileDetails(file));
    const contents = await file.text();
    try {
      let jsonContent = JSON.parse(contents);
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
            message: "JSON File Chosen",
          })
        );
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
  const getFileAccess = async (getFileContent) => {
    const [fileHandle] = await window.showOpenFilePicker();
    props.setFileHandler(fileHandle);
    await getFileContent(fileHandle);
    dispatch(
      showNotificationWithMessage({
        variant: "success",
        message: "JSON File Picked!",
      })
    );
  };
  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    const contents = await file.text();
    try {
      dispatch(setVitalsData(JSON.parse(contents)));
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "JSON File Chosen",
        })
      );
    } catch (err) {
      if (contents.length == 0) {
        dispatch(setVitalsData(JSON.parse([])));
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
        onDrop={onDrop}
      >
        <img src={fileUploadIcon} className="layoutSidebarJson__image" />
      </div>
    </div>
  );
};

export default LayoutSidebarJsonDropdown;
