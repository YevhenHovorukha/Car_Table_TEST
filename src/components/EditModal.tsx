import React, { ChangeEvent, useState } from "react";
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
import { inputIsDisabled } from "../utils/getCarsData";

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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {car.Company} {car.Model}
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Company"
              name="Company"
              value={carData.Company}
              onChange={handleChangeTextField}
              placeholder="Company"
              style={{ marginBottom: "10px" }}
              disabled
            />

            <TextField
              fullWidth
              label="Model"
              name="Model"
              value={carData.Model}
              onChange={handleChangeTextField}
              placeholder="Model"
              style={{ marginBottom: "10px" }}
              disabled
            />
            <TextField
              fullWidth
              label="VIN"
              name="VIN"
              value={carData.VIN}
              onChange={handleChangeTextField}
              placeholder="VIN"
              style={{ marginBottom: "10px" }}
              disabled
            />
            <TextField
              fullWidth
              label="Color"
              name="Color"
              value={carData.Color}
              onChange={handleChangeTextField}
              placeholder="Color"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              type="number"
              label="Year"
              name="Year"
              value={carData.Year}
              onChange={handleChangeTextField}
              placeholder="Year"
              style={{ marginBottom: "10px" }}
              disabled
            />
            <TextField
              fullWidth
              label="Price"
              name="Price"
              value={carData.Price}
              onChange={handleChangeTextField}
              placeholder="Price"
              style={{ marginBottom: "10px" }}
            />
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
              fullWidth
              labelId="availability-label"
              name="Availability"
              value={carData.Availability}
              onChange={handleChangeSelect}
              placeholder="Availability"
              style={{ marginBottom: "10px" }}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleAdd}
                style={{ marginRight: "10px" }}
                disabled={inputIsDisabled(carData)}
              >
                Edit
              </Button>
              <Button variant="contained" onClick={handleEditClose}>
                Close
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
