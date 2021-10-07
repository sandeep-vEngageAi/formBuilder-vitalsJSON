import React,{useState,useEffect} from "react";
import "./LayoutSidebarJsonObject.scss";
import Card from "../../../UI/Card/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ModalTag from '../../../UI/Modal/ModalTag';
import { useDispatch ,useSelector} from "react-redux";
import { hasFileUpdated, showNotificationWithMessage } from "../../../../store/actions";
const LayoutSidebarJsonObject = (props) => {
  const dispatch =useDispatch();
  const [showModal,setShowModal] = useState(false);
  const [showSelectedModal,setShowSelectedModal] = useState(false);
  const fileUpdated = useSelector(state=>state.reducer.fileUpdated)
 
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
  const updateSelectedCardIndex = (status) =>{
    if(status==true){
      props.selectCurrentJsonFunc(props.index)
      setShowSelectedModal(false);
      dispatch(showNotificationWithMessage({
        variant:"success",
        message:"JSON Selected!"
      }))
      dispatch(hasFileUpdated(false));
    }else if(status ==false){
      setShowSelectedModal(false);
      dispatch(showNotificationWithMessage({
        variant:"info",
        message:"JSON navigation Declined!"
      }))
    }
  }
  const shouldAllClickingToJSON = () =>{
    if(fileUpdated){
      setShowSelectedModal(true)
    }else{
      props.selectCurrentJsonFunc(props.index)
      
    }
  }
  return (
    <div className="layoutSidebarJsonObject__container">
      <div className="layoutSidebarJsonObject__card">
        <Card item={props.item} description="card represents each object" onClick ={shouldAllClickingToJSON} index={props.index} currentSelectedJsonIndex ={props.currentSelectedJsonIndex}/>
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
      <ModalTag 
      showModal={showSelectedModal}
      setShowModal={setShowSelectedModal}
      deleteData ={updateSelectedCardIndex}
      modalMessage="Are you sure you want to navigate without saving data?"
      modalHeader="Chose another Form"
      />
    </div>
  );
};

export default LayoutSidebarJsonObject;
