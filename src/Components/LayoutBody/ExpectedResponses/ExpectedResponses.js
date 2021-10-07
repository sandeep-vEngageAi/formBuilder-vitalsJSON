import React, { useState, useEffect } from "react";
import InputTag from "../../UI/InputTag/InputTag";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExpectedResponseItem from "./ExpectedResponseItem/ExpectedResponseItem";
import { v4 as uuidv4 } from "uuid";
import "./ExpectedResponses.scss";
import ToastNotification from '../../UI/ToastNotification';
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../store/actions";
const ExpectedResponses = (props) => {
  const dispatch = useDispatch()
  const [expectedResponseList, setExpectedResponseList] = useState(Array.isArray(props.value) ? props.value: [] );
  const [newExpectedResponse, setNewExpectedResponse] = useState({
    answer_type: "",
    match_type: "",
    value: "",
  });
  useEffect(() => {
    if(Array.isArray(props.value)){
      setExpectedResponseList(props.value);
    }
    return () => {
      setExpectedResponseList([]);
    };
  }, [props.value]);

  const updateNewExpectedResponse = (value, indentifier) => {
    setNewExpectedResponse((prev) => {
      return {
        ...prev,
        [indentifier]: value,
      };
    });
  };

  const saveNewExpectedResponseToList = () => {
    let tempNewExpectedResponse = { ...newExpectedResponse };
    let tempExpectedResponseList = [...expectedResponseList];
    tempExpectedResponseList.push(tempNewExpectedResponse);
    setNewExpectedResponse((prev) => {
      return {
        ...prev,
        answer_type: "",
        match_type: "",
        value: "",
      };
    });
    setExpectedResponseList((prev) => [...tempExpectedResponseList]);
    props.setValue(tempExpectedResponseList,props.name)
    dispatch(showNotificationWithMessage({
      variant:"success",
      message:"Expected Response Added",
      
    }))
  };
  
  const deleteResponse = (index)=>{
    let tempExpectedResponseList = [...expectedResponseList];
    tempExpectedResponseList.splice(index,1);
    setExpectedResponseList((prev)=>{
      return tempExpectedResponseList;
    })
    props.setValue(tempExpectedResponseList,props.name)
    
  }

  let renderedList = null;
  renderedList =
    Array.isArray(expectedResponseList) &&
    expectedResponseList.length > 0 &&
    expectedResponseList.map((item, index) => {
      return <ExpectedResponseItem key={uuidv4()} item={item} index={index} deleteResponse={deleteResponse} />;
    });

  return (
    <div className="expectedResponses__container">
      <div className="expectedResponses__header default-font">
        Expected Response
      </div>

      <div className="expectedResponses__texts">
        <InputTag
          width="90%"
          displayName="answer type"
          name="answer_type"
          value={newExpectedResponse["answer_type"]}
          setValue={updateNewExpectedResponse}
        ></InputTag>
        <InputTag
          width="90%"
          displayName="match type "
          name="match_type"
          value={newExpectedResponse["match_type"]}
          setValue={updateNewExpectedResponse}
        ></InputTag>
        <InputTag
          width="90%"
          displayName="value"
          name="value"
          value={newExpectedResponse["value"]}
          setValue={updateNewExpectedResponse}
        ></InputTag>
        <div className="expectedResponses__icon">
          <IconButton onClick={saveNewExpectedResponseToList}>
            <AddBoxIcon />
          </IconButton>
        </div>
       
      </div>
      <div className="expectedResponses__addedItems">{renderedList}</div>
    </div>
  );
};

export default ExpectedResponses;
