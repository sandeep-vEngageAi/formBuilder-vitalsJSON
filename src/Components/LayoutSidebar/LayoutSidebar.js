import React, { useEffect, useState } from "react";
import "./LayoutSidebar.scss";
import LayoutSidebarJsonDropdown from "./LayoutSidebarJsonDropdown/LayoutSidebarJsonDropdown";
import LayoutSidebarListOfJsons from "./LayoutSidebarListOfJsons/LayoutSidebarListOfJsons";
import Button from "@mui/material/Button";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import PreviewPopup from "../UI/PreviewComponent/PreviewPopup";
import { TextareaAutosize } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import {
  showNotificationWithMessage,
  setFileDetails,
  setVitalsData
} from "../../store/actions";
const LayoutSidebar = (props) => {
  const fileDetails = useSelector(state=>state.reducer.fileDetails);
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [fileHandler, setFileHandler] = useState("");
  const [addNewFormClicked, setAddNewFormClicked] = useState(false);
  const addNewJsonToTemplate = () => {
    props.addNewJsonObject();
    setAddNewFormClicked(true);
  };
  const saveDataToLocal = async () => {
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
          message: "Error in saving File",
        })
      );
    }
  };
  const createNewFile = async () => {
    async function getNewFileHandle() {
      const options = {
        suggestedName: 'Untitled Text.json',
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
    const fileHandle = await getNewFileHandle();
    setFileHandler(fileHandle);
    const file = await fileHandle.getFile();
    console.log("FILE HANDLER: ", fileHandle.getFile());
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
        <Button
          variant="contained"
          startIcon={<AddBoxSharpIcon />}
          style={{
            backgroundColor: "#f50057",
            border: "1px solid grey",
            padding: "10px",
            marginBottom: "5px",
          }}
          onClick={createNewFile}
        >
          Create New File
        </Button>
        {fileDetails.name &&<Button
          variant="contained"
          startIcon={<AddBoxSharpIcon />}
          onClick={addNewJsonToTemplate}
        >
          Add New Form
        </Button>}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VisibilitySharpIcon />}
          onClick={() => setVisibility(TextareaAutosize)}
        >
          Complete Form Preview
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveSharpIcon />}
          onClick={saveDataToLocal}
        >
          Save Form
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
