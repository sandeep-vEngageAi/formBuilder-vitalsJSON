import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import './CheckBox.scss';
export default function ControlledCheckbox(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    alert(event.target.checked);
    let valueToBeChecked = (event.target.checked==true) ? false: "";
    props.setValue(valueToBeChecked, props.name);
  };
  useEffect(() => {
    if (props.value) {
      if(props.value==false){
        setChecked(true);
      }else{
        setChecked(props.value)
      }
    }
  }, [props.value]);

  return (
    <div>
      <div className="default-font">{props.displayName}</div>
      <div className="checkbox__container">
       <div className="checkbox__text">False</div>
      <Checkbox
        checked={checked}
        inputProps={{ "aria-label": "controlled" }}
        name="controlled-radio-buttons-group"
        onChange={handleChange}
        />
        </div>
    </div>
  );
}
