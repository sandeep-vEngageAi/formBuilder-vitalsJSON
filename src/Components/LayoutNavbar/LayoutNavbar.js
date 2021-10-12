import React from "react";
import vEngageLogo from "../../Icons/transparentVEngageLogo.png";
import CustomizedTooltip from "../UI/Tooltip/CustomizedTooltip";
import { Button } from "@mui/material";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import "./LayoutNavbar.scss";
const LayoutHeader = () => {
  return (
    <div className="layoutNavbar__container">
      <div
        className="layoutNavbar__logo"
        onClick={() => window.location.reload()}
        style={{ cursor: "pointer" }}
      >
        <CustomizedTooltip
          title={`This Project is @copyright content of vEngage.Ai. It's built for Handling,creating and Editing JSON Template`}
        >
          <img
            className="layoutNavbar__image"
            src={vEngageLogo}
            style={{ height: "50px", objectFit: "contain" }}
          />
        </CustomizedTooltip>
      </div>
      <div className="layoutNavbar__buttons">
        <Button
          className="layoutNavbar__button"
          variant="contained"
          color="success"
          startIcon={<AccessibilityNewIcon />}
          onClick={()=>window.open("https://jsoneditoronline.org/")}
          style={{
            backgroundColor: "#001E3C",
          }}
          >
          Online Available JSON Editor
        </Button>
        <Button
          className="layoutNavbar__button"
          variant="contained"
          color="success"
          startIcon={<AutoFixHighIcon />}
          onClick={()=>window.open("https://googlechromelabs.github.io/text-editor/")}
          style={{
            backgroundColor: "#2A3B93",
          }}
        >
          Other Available JSON Editor
        </Button>
      </div>
    </div>
  );
};

export default LayoutHeader;
