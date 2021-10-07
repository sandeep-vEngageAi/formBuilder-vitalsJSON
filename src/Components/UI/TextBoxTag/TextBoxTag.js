import * as React from "react";
import TextField from "@mui/material/TextField";

export default function MultilineTextFields(props) {

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  return (
    <div style={{width:props.width}}>
      <div className="inputTag__container default-font">{props.name}</div>

      <TextField
      fullWidth={true}

        id="outlined-multiline-static"
        // label="Action"
        multiline
        // max-rows={3}
        value={props.value}
        onChange={handleChange}
        disabled={props.disabled==true ? true: false}
      />
    </div>
  );
}
