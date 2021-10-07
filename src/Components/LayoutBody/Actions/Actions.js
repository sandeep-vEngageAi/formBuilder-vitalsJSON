import React, { useState, useEffect } from "react";
import "./Actions.scss";
import InputTag from "../../UI/InputTag/InputTag";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ActionItem from "./ActionItem/ActionItem";
import TextBoxTag from "../../UI/TextBoxTag/TextBoxTag";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";
const Actions = (props) => {
  const dispatch = useDispatch();
  const [actionList, setActionList] = useState([]);
  const [newAction, setNewAction] = useState("");
  useEffect(() => {
    if (Array.isArray(props.value)) {
      setActionList(props.value);
    }
    return () => {
      setActionList([]);
    };
  }, [props.value]);
  const AddActionToList = () => {
    const tempActionList = [...actionList];
    
    try {

      if (JSON.parse(newAction) !== "string") {
        tempActionList.push(JSON.parse(newAction));
        setNewAction("");
        setActionList((prev) => [...prev, newAction]);
        props.setValue(tempActionList, props.name);
        dispatch(
          showNotificationWithMessage({
            variant: "success",
            message: "Action added to the list",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotificationWithMessage({
          variant: "error",
          message: "Can't add string to ActionList",
        })
      );
    }
  };
  const updateAction = (value, index) => {
    let tempActionList = [...actionList];
    try {

      if (JSON.parse(value) !== "string") {
        tempActionList[index] = JSON.parse(value);
        setActionList((prev) => [...tempActionList]);
        props.setValue(tempActionList, props.name);
        dispatch(
          showNotificationWithMessage({
            variant: "success",
            message: "Action added to the list",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotificationWithMessage({
          variant: "error",
          message: "Can't add string to ActionList",
        })
      );
    }
  };
  const deleteAction = (index) => {
    let tempActionList = [...actionList];
    tempActionList.splice(index, 1);
    setActionList((prev) => [...tempActionList]);
    props.setValue(tempActionList, props.name);
  };
  let renderedList = null;
  renderedList =
    Array.isArray(actionList) &&
    actionList.length > 0 &&
    actionList.map((item, index) => {
      return (
        <ActionItem
          key={uuidv4()}
          value={JSON.stringify(item)}
          index={index}
          deleteUtterance={deleteAction}
          updateAction={updateAction}
        />
      );
    });
  return (
    <div className="actions__container">
      <div className="actions__adder">
        <TextBoxTag
          name={props.name}
          value={newAction}
          setValue={setNewAction}
          width="95%"
          displayName={props.displayName}
        />
        <div className="actions__icon">
          <IconButton onClick={AddActionToList}>
            <AddBoxIcon />
          </IconButton>
        </div>
      </div>
      <div className="actions__addedItems">{renderedList}</div>
    </div>
  );
};

export default Actions;
