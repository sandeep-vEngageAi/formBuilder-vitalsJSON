import React, { useEffect, useState } from "react";
import "./LayoutSidebar.scss";
import LayoutSidebarJsonDropdown from "./LayoutSidebarJsonDropdown/LayoutSidebarJsonDropdown";
import LayoutSidebarListOfJsons from "./LayoutSidebarListOfJsons/LayoutSidebarListOfJsons";
import Button from "@mui/material/Button";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import PreviewPopup from "../UI/PreviewComponent/PreviewPopup";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useDispatch, useSelector } from "react-redux";

import {
  showNotificationWithMessage,
  setFileDetails,
  setVitalsData,
  checkIfSomeFormsEmpty,
} from "../../store/actions";
const LayoutSidebar = (props) => {
  const fileDetails = useSelector((state) => state.reducer.fileDetails);
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [fileHandler, setFileHandler] = useState("");
  const [addNewFormClicked, setAddNewFormClicked] = useState(false);

 // function to Check if any form in file is empty
 const functionToCheckEmptyJsons = (fileData) => {
  try {
    if (Array.isArray(fileData)) {
      let tempSomeFormEmpty = fileData.map(
        (item) => Object.keys(item).length == 0
      );
      let tempCheckSomeFormsEmpty = tempSomeFormEmpty.some(
        (item) => item == true
      );
      if (tempCheckSomeFormsEmpty) {
        dispatch(checkIfSomeFormsEmpty(tempCheckSomeFormsEmpty));
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log(
      "Error occured in checking if some forms empty or not in LayoutSidebar Component"
    );
  }
};

// function for adding new form 
  const addNewJsonToTemplate = async() => {
    let areSomeFormsEmpty = functionToCheckEmptyJsons(props.templateData);
    if (areSomeFormsEmpty == false) {
      dispatch(checkIfSomeFormsEmpty(areSomeFormsEmpty));
    }
    props.addNewJsonObject();
    setAddNewFormClicked(true);
    dispatch(
      showNotificationWithMessage({
        variant: "success",
        message: "New Empty Form added! 🔽",
      })
    );
  };

 

  const saveDataToLocalFolder = async (fileHandler) => {
    try {
      let areSomeFormsEmpty = functionToCheckEmptyJsons(props.templateData);
      if (areSomeFormsEmpty === false) {
        try {
          const writable = await fileHandler?.createWritable();
          // Write the contents of the file to the stream.
          await writable.write(JSON.stringify(props.templateData));
          // Close the file and write the contents to disk.
          await writable.close();
          dispatch(
            showNotificationWithMessage({
              variant: "success",
              message: "File updated in Local Directory",
            })
          );
        } catch (err) {
          dispatch(
            showNotificationWithMessage({
              variant: "error",
              message: "File Saving Aborted",
            })
          );
        }
      } else {
        dispatch(
          showNotificationWithMessage({
            variant: "error",
            message: "Please Either delete or update Empty Forms",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotificationWithMessage({
          variant: "error",
          message: "Error in saving File",
        })
      );
    }
  };

  // get New File Handle Function
  async function getNewFileHandle() {
    const options = {
      suggestedName: "Untitled Text.json",
      types: [
        {
          description: "JSON Files",
          accept: {
            "text/plain": [".json"],
          },
        },
      ],
    };
    const handle = await window?.showSaveFilePicker(options);
    return handle;
  }
  const createNewFile = async () => {
    dispatch(checkIfSomeFormsEmpty(false));
    const fileHandle = await getNewFileHandle();
    // setting fileHandle to local state fileHandler defined above
    setFileHandler(fileHandle);

    const file = await fileHandle.getFile();
    dispatch(setFileDetails(file));

    // contents of  newly created file
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
            message: "Please choose Empty Array of JSON",
          })
        );
      }
    }
  };

  // function for file save as:
  const saveFormAs = async () => {
    try {
      let areSomeFormsEmpty = checkIfSomeFormsEmpty(props.templateData);
      if (areSomeFormsEmpty == false) {
        const newFileHandle = await getNewFileHandle();
        saveDataToLocalFolder(newFileHandle);
      } else {
        dispatch(
          showNotificationWithMessage({
            variant: "error",
            message: "Please Either delete or update Empty Forms",
          })
        );
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (props.templateData) {
      setTemplateData(props.templateData);
    }
  }, [props.templateData]);
  return (
    <div className="layoutSidebar__container">
      <div className="layoutSidebar__jsonDropdown">
        <LayoutSidebarJsonDropdown setFileHandler={setFileHandler} />
      </div>
      <div className="layoutSidebar__jsonObjects">
        <LayoutSidebarListOfJsons
          templateData={templateData}
          selectCurrentJsonFunc={props.selectCurrentJsonFunc}
          currentSelectedJsonIndex={props.currentSelectedJsonIndex}
          deleteJsonObject={props.deleteJsonObject}
          addNewFormClicked={addNewFormClicked}
          setAddNewFormClicked={setAddNewFormClicked}
        />
      </div>
      <div className="layoutSidebar__buttons">
        <div className="layoutSidebar__createNewFileButton">
          <Button
            variant="contained"
            startIcon={<AddBoxSharpIcon />}
            style={{
              // backgroundColor: "#f50057",
              backgroundColor: "#95D03A",
              border: "1px solid grey",
              padding: "10px",
              marginBottom: "5px",
              width: "100%",
            }}
            onClick={() => createNewFile()}
          >
            Create New JSON File
          </Button>
        </div>
        {fileDetails.name && (
          <Button
            variant="contained"
            startIcon={<AddBoxSharpIcon />}
            onClick={addNewJsonToTemplate}
          >
            Add New Form
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VisibilitySharpIcon />}
          onClick={() => setVisibility(true)}
        >
          Complete Form Preview
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveSharpIcon />}
          onClick={() => saveDataToLocalFolder(fileHandler)}
        >
          Save to Existing File
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileDownloadIcon />}
          onClick={saveFormAs}
          style={{
            backgroundColor: "#f50057",
          }}
        >
          Save File content with New Name
        </Button>
      </div>
      <PreviewPopup
        visibility={visibility}
        setVisibility={setVisibility}
        jsonData={props.templateData}
      />
    </div>
  );
};

export default LayoutSidebar;
