import React, { useState, useEffect } from 'react';
import './ActionItem.scss';
import { Icon, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import InputTag from '../../../UI/InputTag/InputTag';
import TextBoxTag from '../../../UI/TextBoxTag/TextBoxTag';
const ActionItem = (props) => {
    const [buttonInEditMode,setButtonInEditMode] = useState(false);
    const [botUtterance,setBotUtterance] = useState(props.value);
  
   const  updateAction = ()=>{
    props.updateAction(botUtterance,props.index);
    }
    return (
        <div className="botUtteranceItem__container">
            <TextBoxTag value={botUtterance} setValue={setBotUtterance} width="98%" 
            disabled={!buttonInEditMode}
            />
          {!buttonInEditMode ?  <IconButton onClick={()=>setButtonInEditMode(true)}><EditIcon /></IconButton>
            :<IconButton onClick={updateAction}><SaveIcon /></IconButton>}

            <IconButton onClick={()=>props.deleteUtterance(props.index)}><DeleteIcon /></IconButton>
        </div>
    )
}

export default ActionItem
