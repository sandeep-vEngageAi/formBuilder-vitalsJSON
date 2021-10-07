import React, { useState, useEffect } from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import JsonPrettier from "../JsonPrettier/JsonPrettier";
import TextBox from "devextreme/ui/text_box";
import TextBoxTag from "../../UI/TextBoxTag/TextBoxTag";
const PreviewPopup = (props) => {
  const [showEditMode, setShowEditMode] = useState(false);
  const [previewState, setPreviewState] = useState({
    currentJson: {},
    popupVisible: false,
    positionOf: "",
  });
  useEffect(() => {
    setPreviewState((prev) => {
      return {
        ...prev,
        currentJson: props.value && props.value,
        popupVisible: props.visibility && props.visibility,
      };
    });
    return () => {};
  }, [props.visibility]);
  const showPopup = () => {
    setPreviewState((prev) => {
      return {
        ...prev,
        currentJson: props.value,
        popupVisible: true,
      };
    });
  };
  useEffect(() => {
    if (props.visibility == true) {
      showPopup();
    }
  }, [props.visibility]);
  const hidePopup = () => {
    props.setVisibility(false);
    setPreviewState((prev) => {
      return {
        ...prev,
        currentJson: {},
        popupVisible: false,
      };
    });
  };

  const openEditMode = () => {
    setShowEditMode(true);
  };
  const closeButtonOptions = {
    text: "Close",
    onClick: hidePopup,
  };
  const editButtonOptions = {
    text: "Edit",
    onClick: openEditMode,
  };
  const modifyJsonData = (jsonData) => {
    let stringiFiedResponse = [];

    if (typeof jsonData != "string") {
      stringiFiedResponse = JSON.stringify(jsonData, undefined, 2);
    } else {
      stringiFiedResponse = JSON.stringify(jsonData, undefined, 4);
    }
    return stringiFiedResponse;
  };
  return (
    <Popup
      visible={previewState.popupVisible}
      onHiding={hidePopup}
      dragEnabled={true}
      closeOnOutsideClick={true}
      showCloseButton={true}
      showTitle={true}
      title="Information"
      container=".dx-viewport"
      width={"90%"}
      height={"90%"}
    >
      <Position at="center" my="center" />

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        options={closeButtonOptions}
      />
      {/* <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        options={editButtonOptions}
      /> */}
      {/* <pre>{props.jsonData}</pre> */}
        <JsonPrettier jsonData={props.jsonData} />
     
    </Popup>
  );
};

export default PreviewPopup;
