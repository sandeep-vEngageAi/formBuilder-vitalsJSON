import React from "react";
import "./LayoutSidebarJsonObject.scss";
import Card from "../../../UI/Card/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
const LayoutSidebarJsonObject = (props) => {
  return (
    <div className="layoutSidebarJsonObject__container">
      <div className="layoutSidebarJsonObject__card">
        <Card item={props.item} description="card represents each object" onClick ={()=>props.selectCurrentJsonFunc(props.index)} index={props.index} currentSelectedJsonIndex ={props.currentSelectedJsonIndex}/>
      </div>
      <div className="layoutSidebarJsonObject__icons">
        {/* <IconButton  >
          <EditIcon />
        </IconButton> */}
        <IconButton onClick={()=>props.deleteJsonObject(props.index)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default LayoutSidebarJsonObject;
