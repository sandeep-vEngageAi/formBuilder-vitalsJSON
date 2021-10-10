import React from "react";
import vEngageLogo from "../../Icons/transparentVEngageLogo.png";
import CustomizedTooltip from "../UI/Tooltip/CustomizedTooltip";
const LayoutHeader = () => {
  return (
    <div
      className="layoutHeader__container"
      onClick={() => window.location.reload()}
      style={{ cursor: "pointer" }}
    >
      <CustomizedTooltip
      title={`This Project is @copyright content of vEngage.Ai. It's built for Handling,creating and Editing JSON Template`}
      >
        <img
          className="layoutHeader__image"
          src={vEngageLogo}
          style={{ height: "50px", objectFit: "contain" }}
        />
      </CustomizedTooltip>
    </div>
  );
};

export default LayoutHeader;
