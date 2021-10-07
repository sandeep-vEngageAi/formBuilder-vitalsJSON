import React,{useState,useEffect} from "react";
import "./LayoutSidebarJsonObject.scss";
import Card from "../../../UI/Card/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ModalTag from '../../../UI/Modal/ModalTag';
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../../store/actions";
const LayoutSidebarJsonObject = (props) => {
  const dispatch =useDispatch();
  const [showModal,setShowModal] = useState(false);
   
 
  const deleteData =(status)=>{


    if(status==true){
      props.deleteJsonObject(props.index);
      setShowModal(false);
      dispatch(showNotificationWithMessage({
        variant:"success",
        message:"JSON object deletion Successful!"
      }))
    }else if(status ==false){
      setShowModal(false);
      dispatch(showNotificationWithMessage({
        variant:"info",
        message:"JSON object deletion declined!"
      }))
    }
  }

  return (
    <div className="layoutSidebarJsonObject__container">
      <div className="layoutSidebarJsonObject__card">
        <Card item={props.item} description="card represents each object" onClick ={()=>props.selectCurrentJsonFunc(props.index)} index={props.index} currentSelectedJsonIndex ={props.currentSelectedJsonIndex}/>
      </div>
      <div className="layoutSidebarJsonObject__icons">
        {/* <IconButton  >
          <EditIcon />
        </IconButton> */}
        <IconButton onClick={()=>setShowModal(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <ModalTag 
      showModal={showModal}
      setShowModal={setShowModal}
      deleteData ={deleteData}

      />
    </div>
  );
};

export default LayoutSidebarJsonObject;
