import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import "./ModalTag.scss";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
};

export default function TransitionsModal(props) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.showModal}
        onClose={() => props.setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showModal}>
          <Box sx={style}>
         
            <div className="modal__container">
              <div className="modal__header">Data Deletion</div>
              <div className="modal__body">
                {props.modalMessage
                  ? props.modalMessage
                  : "Are you sure you want to delete?"}
              </div>
              <div className="modal__footer">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Brightness4Icon />}
                  onClick={() => props.deleteData(false)}
                >
                  No
                </Button>{" "}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => props.deleteData(true)}
                  style={{ backgroundColor: "#f50057" }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
