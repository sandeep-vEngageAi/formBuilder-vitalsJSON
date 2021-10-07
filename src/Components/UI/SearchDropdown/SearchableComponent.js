import React, { useState, useEffect } from "react";
import SearchDevExtreme from "./SearchDevExtreme";
function SearchableComponent(props) {
  const updateValueFunc = (updatedValue) => {
    props.setValue(updatedValue, props.name);
  };
  
  return (
    <div
      className="devextremeDropdown__container"
      style={{ width: props.width }}
      disabled={props.disabled}
    >
      <div className="devextremeDropdown__text default-font">
        {props.displayName}
      </div>
      <SearchDevExtreme
        width={props.width}

        placeholder={`${props.placeholder}`}
        optionsFetched={props.data}
        displayName={`${props.displayValue}`}
        displayExpr={`${props.displayValue}`}
        valueExpr={`${props.displayValue}`}
        defaultValue={props.value}
        updatedSelectedValue={updateValueFunc}
      />
      <div className="devextremeDropdown__text">{props.helperText}</div>
    </div>
  );
}

export default SearchableComponent;

