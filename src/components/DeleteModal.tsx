import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ICarTableData } from "./types/types";
import { useQueryClient } from "react-query";
import {
  StyledBoxCenter,
  StyledCenteredTypography,
  StyleModalBox,
} from "./styles/styles";

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
    <Modal
      open={open}
      onClose={handleDeleteClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={StyleModalBox}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={StyledCenteredTypography}
        >
          Are you Sure?
        </Typography>
        <Box sx={StyledBoxCenter}>
          <Button variant="contained" onClick={handlerDeteleCar}>
            Yes
          </Button>
          <Button variant="contained" onClick={handleDeleteClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
