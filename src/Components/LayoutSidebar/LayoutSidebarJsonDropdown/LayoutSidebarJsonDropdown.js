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
  // call this function when picking file on clicking
  const getFileAccess = async (getFileContent) => {
    // fileHandle
    const [fileHandle] = await window.showOpenFilePicker();
    props.setFileHandler(fileHandle);
    const file = await fileHandle.getFile();
    await getFileContent(file);
  };
  
  // getting file on droping item
  const onDrop = async (e, getFileContent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Process all of the items.
    for (const item of e.dataTransfer.items) {
      // kind will be 'file' for file/directory entries.
      if (item.kind === 'file') {
        // const entry = await item.getAsFileSystemHandle();
        const entry = await e.dataTransfer.items[0].getAsFileSystemHandle();
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          props.setFileHandler(entry);
          // run code for if entry is a file
          await getFileContent(file); 

      } else if (entry.kind === 'directory') {
        // run code for is entry is a directory
      }
    }
  }
  };
  return (
    <div className="layoutSidebarJsonDropdown__container">
      <div className="layoutSidebarJsonDropdown__text">
        Select or Drop File Here 🙂
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
