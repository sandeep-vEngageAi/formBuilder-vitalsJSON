import React, { useState, useEffect } from "react";
import "./ActionItem.scss";
import { Icon, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextBoxTag from "../../../UI/TextBoxTag/TextBoxTag";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../../store/actions";
import TransitionsModal from "../../../UI/Modal/ModalTag";
const ActionItem = (props) => {
  const [buttonInEditMode, setButtonInEditMode] = useState(false);
  const [botUtterance, setBotUtterance] = useState(props.value);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const deleteData = (status) => {
    if (status == true) {
      props.deleteAction(props.index);
      setShowModal(false);
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "Action item deletion Successful!",
        })
      );
    } else if (status == false) {
      setShowModal(false);
      dispatch(
        showNotificationWithMessage({
          variant: "info",
          message: "Action item deletion declined!",
        })
      );
    }
  };
  const updateAction = () => {
    props.updateAction(botUtterance, props.index);
  };
  return (
    <div className="botUtteranceItem__container">
      <TextBoxTag
        value={botUtterance}
        setValue={setBotUtterance}
        width="98%"
        disabled={!buttonInEditMode}
      />
      {!buttonInEditMode ? (
        <IconButton onClick={() => setButtonInEditMode(true)}>
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton onClick={updateAction}>
          <SaveIcon />
        </IconButton>
      )}

      <IconButton onClick={() => setShowModal(true)}>
        <DeleteIcon />
      </IconButton>
      <TransitionsModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteData={deleteData}
      />
    </div>
  );
};

export default ActionItem;
