import React, { useState, useEffect } from "react";
import "./BotUtterances.scss";
import InputTag from "../../UI/InputTag/InputTag";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../store/actions";
import BotUtteranceItem from "./BotUtteranceItem/BotUtteranceItem";
import { v4 as uuidv4 } from "uuid";
const BotUtterances = (props) => {
  const dispatch = useDispatch();
  const [botUtteranceList, setBotUtteranceList] = useState([]);
  const [newBotUtterance, setNewBotUtterance] = useState("");
  useEffect(() => {
    if (Array.isArray(props.value)) {
      setBotUtteranceList(props.value);
    }
    return () => {
      setBotUtteranceList([]);
    };
  }, [props.value]);
  const AddBotUtteranceToList = () => {
    const tempBotUtteranceList = [...botUtteranceList];
    tempBotUtteranceList.push(newBotUtterance);
    setNewBotUtterance("");
    setBotUtteranceList((prev) => [...prev, newBotUtterance]);
    props.setValue(tempBotUtteranceList,props.name);
    dispatch(showNotificationWithMessage({
      variant:"success",
      message:"Bot utterance added."
    }))

  };
  const updateBotUtterance = (value, index) => {
    let tempBotUtteranceList = [...botUtteranceList];
    tempBotUtteranceList[index] = value;
    setBotUtteranceList((prev) => [...tempBotUtteranceList]);
    props.setValue(tempBotUtteranceList,props.name)
    dispatch(showNotificationWithMessage({
      variant:"info",
      message:"Bot utterance edited."
    }))
  };
  const deleteBotUtterance = (index) => {
    let tempBotUtteranceList = [...botUtteranceList];
    tempBotUtteranceList.splice(index, 1);
    setBotUtteranceList((prev) => [...tempBotUtteranceList]);
    props.setValue(tempBotUtteranceList,props.name);
    dispatch(showNotificationWithMessage({
      variant:"warning",
      message:"Bot utterance deleted."
    }))
  };
  let renderedList = null;
  renderedList =
    Array.isArray(botUtteranceList) &&
    botUtteranceList.length > 0 &&
    botUtteranceList.map((item, index) => {
      return (
        <BotUtteranceItem
          key={uuidv4()}
          value={item}
          index={index}
          deleteUtterance={deleteBotUtterance}
          updateBotUtterance={updateBotUtterance}
        />
      );
    });
  return (
    <div className="botUtterance__container">
      <div className="botUtterance__adder">
        <InputTag
          value={newBotUtterance}
          setValue={setNewBotUtterance}
          width="95%"
          displayName={props.displayName}
        />
        <div className="botUtterance__addIcon">

        <IconButton onClick={AddBotUtteranceToList}>
          <AddBoxIcon />
        </IconButton>
        </div>
      </div>

    
      <div className="botUtterance__items">{renderedList}</div>
    </div>
  );
};

export default BotUtterances;
