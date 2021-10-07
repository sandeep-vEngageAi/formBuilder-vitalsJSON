import React from "react";
import "./ActionItem.scss";
import InputTag from "../../../UI/InputTag/InputTag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
const ActionItem = (props) => {
  return (
    <div className="actionItem__container">
      <div className="actionItem__inputTags">
        <InputTag width="90%" disabled value={props.item?.answer_type} />
        <InputTag width="90%" disabled value={props.item?.question_id} />
        {/* <InputTag  width="90%" /> */}
      </div>
      <div className="actionItem__actions">
        {/* <IconButton>
             <EditIcon />
         </IconButton> */}
        <IconButton onClick={()=>props.deleteAction(props.index)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ActionItem;
