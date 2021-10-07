import React from 'react';
import './ExpectedResponseItem.scss';
import InputTag from '../../../UI/InputTag/InputTag';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
const ExpectedResponseItem = (props) => {
    return (
        <div className="expectedResponseItem__container">
        <div className="expectedResponseItem__inputTags">

            <InputTag disabled width="90%" value={props.item.answer_type} />
            <InputTag disabled width="90%" value={props.item.match_type} />
            <InputTag disabled width="90%" value={props.item.value} />
        </div>
        <div className="expectedResponseItem__actions">
         {/* <IconButton>
             <EditIcon />
         </IconButton> */}
         <IconButton onClick={()=>props.deleteResponse(props.index)}>
             <DeleteIcon  />
         </IconButton>
        </div>
        </div>
    )
}

export default ExpectedResponseItem
