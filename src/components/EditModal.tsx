import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ICarTableData } from "./types/types";
import { useQueryClient } from "react-query";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { inputIsDisabled } from "../utils/helpers";
import {
  StyledBoxColumn,
  StyledBoxFlexEnd,
  StyleModalBox,
} from "./styles/styles";

interface EditModalProps {
  car: ICarTableData;
  open: boolean;
  handleEditClose: () => void;
}

const EditModal = ({ car, open, handleEditClose }: EditModalProps) => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];
  const [carData, setCarData] = useState<ICarTableData>({
    id: car.id,
    Company: car.Company,
    Model: car.Model,
    VIN: car.VIN,
    Color: car.Color,
    Year: car.Year,
    Price: car.Price,
    Availability: car.Availability,
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
    const newData = data
      .slice()
      .map((item) => (item.id === car.id ? carData : item));
    queryClient.setQueryData("carsData", newData);
    handleEditClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={StyleModalBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {car.Company} {car.Model}
          </Typography>
          <Box sx={StyledBoxColumn}>
            <TextField
              fullWidth
              label="Company"
              name="Company"
              value={carData.Company}
              onChange={handleChangeTextField}
              placeholder="Company"
              disabled
            />

            <TextField
              fullWidth
              label="Model"
              name="Model"
              value={carData.Model}
              onChange={handleChangeTextField}
              placeholder="Model"
              disabled
            />
            <TextField
              fullWidth
              label="VIN"
              name="VIN"
              value={carData.VIN}
              onChange={handleChangeTextField}
              placeholder="VIN"
              disabled
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
              disabled
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
                Edit
              </Button>
              <Button variant="contained" onClick={handleEditClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
