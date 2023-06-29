import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  open: boolean;
  handleDeleteClose?: () => void;
}

const DeleteModal = ({ open, handleDeleteClose }: DeleteModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            DeletModal
          </Typography>
          <Button onClick={handleDeleteClose}>Delete</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
