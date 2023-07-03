import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ICarTableData } from "./types/types";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { SelectChangeEvent } from "@mui/material";
import { useQueryClient } from "react-query";
import { inputIsDisabled } from "../utils/helpers";
import {
  StyledBoxColumn,
  StyledBoxFlexEnd,
  StyleModalBox,
} from "./styles/styles";

interface AddModalProps {
  open: boolean;
  handleAddClose: () => void;
}

const AddModal = ({ open, handleAddClose }: AddModalProps) => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];
  const [carData, setCarData] = useState<ICarTableData>({
    id: 2000,
    Company: "",
    Model: "",
    VIN: "",
    Color: "",
    Year: 0,
    Price: "$1000",
    Availability: "",
    Actions: [],
  });

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setCarData((prevData) => ({
      ...prevData,
      Availability: value,
    }));
  };

  const handleAdd = () => {
    const newCar: ICarTableData = {
      ...carData,
      id: Date.now(),
      Actions: [],
    };
    const newData = data.slice();
    newData.unshift(newCar);
    queryClient.setQueryData("carsData", newData);
    handleAddClose();
    setCarData({
      id: 2000,
      Company: "",
      Model: "",
      VIN: "",
      Color: "",
      Year: 0,
      Price: "$1000",
      Availability: "",
      Actions: [],
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleAddClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={StyleModalBox}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Car
        </Typography>
        <Box sx={StyledBoxColumn}>
          <TextField
            fullWidth
            label="Company"
            name="Company"
            value={carData.Company}
            onChange={handleChangeTextField}
            placeholder="Company"
          />

          <TextField
            fullWidth
            label="Model"
            name="Model"
            value={carData.Model}
            onChange={handleChangeTextField}
            placeholder="Model"
          />
          <TextField
            fullWidth
            label="VIN"
            name="VIN"
            value={carData.VIN}
            onChange={handleChangeTextField}
            placeholder="VIN"
          />
          <TextField
            fullWidth
            label="Color"
            name="Color"
            value={carData.Color}
            onChange={handleChangeTextField}
            placeholder="Color"
          />
          <TextField
            fullWidth
            type="number"
            label="Year"
            name="Year"
            value={carData.Year}
            onChange={handleChangeTextField}
            placeholder="Year"
          />
          <TextField
            fullWidth
            label="Price"
            name="Price"
            value={carData.Price}
            onChange={handleChangeTextField}
            placeholder="Price"
          />
          <InputLabel id="availability-label">Availability</InputLabel>
          <Select
            fullWidth
            labelId="availability-label"
            name="Availability"
            value={carData.Availability}
            onChange={handleChangeSelect}
            placeholder="Availability"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          <Box sx={StyledBoxFlexEnd}>
            <Button
              variant="contained"
              onClick={handleAdd}
              disabled={inputIsDisabled(carData)}
            >
              Add
            </Button>
            <Button variant="contained" onClick={handleAddClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
