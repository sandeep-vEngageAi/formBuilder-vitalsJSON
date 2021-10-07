import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup(props) {
  const [radioValue, setRadioValue] = React.useState("");
  useEffect(() => {
    setRadioValue(props.value);
  }, [props.value]);

  return (
    <FormControl component="fieldset">
      <div component="legend" className="default-font">
        {props.displayName}
      </div>
      <RadioGroup
        row
        aria-label="gender"
        // displayName="row-radio-buttons-group"
        value={radioValue}
        onChange={event=>props.setValue(event.target.value,props.name)}
      >
        <FormControlLabel value="true" control={<Radio />} label="True" />
        <FormControlLabel value="false" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
}
