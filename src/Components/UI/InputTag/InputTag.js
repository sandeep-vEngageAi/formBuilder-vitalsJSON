import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./InputTag.scss";
export default function ComposedTextField(props) {
  const handleChange = (event) => {
    props.setValue(event.target.value, props.name);
  };

  return (
    <FormControl style={{ width: props.width }}>
      <div className="inputTag__container default-font">
        {props.displayName}
      </div>

      <OutlinedInput
        style={{ height: "36px", width: props.width }}
        id="component-outlined"
        className="inputTag__outlinedInput"
        value={props.value}
        onChange={handleChange}
        label="Name"
        disabled={props.disabled ? true : false}
      />
      <FormHelperText id="component-helper-text">
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
}
