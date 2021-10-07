import React,{useState} from "react";
import "./ExpectedResponseItem.scss";
import InputTag from "../../../UI/InputTag/InputTag";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { showNotificationWithMessage } from "../../../../store/actions";
import TransitionsModal from "../../../UI/Modal/ModalTag";
const ExpectedResponseItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const deleteData = (status) => {
    if (status == true) {
      props.deleteResponse(props.index);
      setShowModal(false);
      dispatch(
        showNotificationWithMessage({
          variant: "success",
          message: "JSON object deletion Successful!",
        })
      );
    } else if (status == false) {
      setShowModal(false);
      dispatch(
        showNotificationWithMessage({
          variant: "info",
          message: "JSON object deletion declined!",
        })
      );
    }
  };
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
        <IconButton onClick={()=>setShowModal(true)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <TransitionsModal 
      showModal={showModal}
      setShowModal={setShowModal}
      deleteData ={deleteData}
      />
    </div>
  );
};

export default ExpectedResponseItem;
