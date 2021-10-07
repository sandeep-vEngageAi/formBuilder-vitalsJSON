import React from "react";
import { SelectBox } from "devextreme-react/select-box";

// import { products } from "./data.js";

class App extends React.Component {
  constructor() {
    super();
    this.applyFilterTypes = [
      {
        key: "auto",
        name: "Immediately",
      },
      {
        key: "onClick",
        name: "On Button Click",
      },
    ];
    this.state = {
      editBoxValue: [],
    };
    this.editBoxValueChanged = ({ component }) => {
       
      this.props.updatedSelectedValue(component.option("selectedItem"));
      this.setState({ editBoxValue: component.option("selectedItem") });

    };
    this.state = {
      showFilterRow: true,
      showHeaderFilter: true,
      currentFilter: this.applyFilterTypes[0].key,
    };
  }
  

  render() {
    return (
      <div
        style={{
          display: "flex",
          width:`${this.props.width}`
        }}
      >
        <div className="widget-container">
          <div className="dx-field">
            <SelectBox
              id="selectionBoxID"
              className="searchDropdown__container"
              required
              placeholder={this.props.placeholder}
              dataSource={this.props.optionsFetched}
              displayExpr={this.props.displayName}
              valueExpr={this.props.valueExpr}
              searchEnabled={true}
              onValueChanged={this.editBoxValueChanged}
              defaultValue={this.props.defaultValue}
              width={this.props.width}
              value={this.props.defaultValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
