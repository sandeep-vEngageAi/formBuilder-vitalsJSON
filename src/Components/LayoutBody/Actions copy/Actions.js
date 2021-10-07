import { Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputTag from "../../UI/InputTag/InputTag";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ActionItem from "./ActionItem/ActionItem";
import ToastNotification from "../../UI/ToastNotification";
import "./Actions.scss";
import {v4 as uuidv4} from 'uuid';
const Actions = (props) => {
  const [actionList, setActionList] = useState([]);
  const [newAction, setNewAction] = useState({
    answer_type: "",
    question_id: "",
  });
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    if (Array.isArray(props.value)) {
      setActionList(props.value);
    }
    return () => {
      setActionList([]);
    };
  }, [props.value]);

  const updateAction = (value, indentifier) => {
    setNewAction((prev) => {
      return {
        ...prev,
        [indentifier]: value,
      };
    });
  };

  const saveNewActionToList = () => {
    let tempNewAction = { ...newAction };
    let tempActionList = [...actionList];
    tempActionList.push(tempNewAction);
    setNewAction((prev) => {
      return {
        ...prev,
        answer_type: "",
        question_id: "",
      };
    });
    setActionList((prev) => [...tempActionList]);
    setNotification(true);
  };

  const deleteAction = (index) => {
    let tempActionList = [...actionList];
    tempActionList.splice(index, 1);
    setActionList((prev) => {
      return tempActionList;
    });
  };

  let renderedList = null;
  renderedList =
    Array.isArray(actionList) &&
    actionList.length > 0 &&
    actionList.map((item, index) => {
      
      return (
        <ActionItem
          key={uuidv4()}
          item={item}
          index={index}
          deleteAction={deleteAction}
        />
      );
    });

  return (
    <div className="actions__container">
      <div className="actions__header default-font">Action type</div>

      <div className="actions__texts">
        <InputTag
          width="90%"
          displayName="answer type"
          name="answer_type"
          value={newAction["answer_type"]}
          setValue={updateAction}
        ></InputTag>
        <InputTag
          width="90%"
          name="question_id"
          displayName="question id"
          value={newAction["question_id"]}
          setValue={updateAction}
        ></InputTag>
        {/* <InputTag width="90%" displayName="value"></InputTag> */}
        <div className="actions__icon">
          <IconButton onClick={saveNewActionToList}>
            <AddBoxIcon />
          </IconButton>
        </div>
        {notification &&   <ToastNotification
          variant="success" 
          setNotification = {setNotification}
          message="Action added"/>}
      </div>
      <div className="actions__addedItems">
       {renderedList}
      </div>
    </div>
  );
};

export default Actions;
