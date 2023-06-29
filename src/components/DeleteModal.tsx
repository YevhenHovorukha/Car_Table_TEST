import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ICarTableData } from "./types/types";
import { useQueryClient } from "react-query";

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
  car: ICarTableData;
  open: boolean;
  handleDeleteClose?: () => void;
}

const DeleteModal = ({ car, open, handleDeleteClose }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];

  const handlerDeteleCar = (): void => {
    const newData = data.filter((item) => item.id !== car.id);
    queryClient.setQueryData("carsData", newData);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Are you Sure?
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={handlerDeteleCar}
            >
              Yes
            </Button>
            <Button variant="contained" onClick={handleDeleteClose}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
