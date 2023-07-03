import React from "react";
import axios from "axios";
import DropdownMenu from "../components/DropdownMenu";
import { ICar, ICarTableData } from "../components/types/types";

const URL = "https://myfakeapi.com/api/cars/";

const getCarsData = async () => {
  const data = await axios.get(URL);

  const newData = await data.data.cars.map((car: ICar) => ({
    id: car.id,
    Company: car.car,
    Model: car.car_model,
    VIN: car.car_vin,
    Color: car.car_color,
    Year: car.car_model_year,
    Price: car.price,
    Availability: car.availability ? "yes" : "no",
  }));
  return newData;
};

const inputIsDisabled = (obj: ICarTableData): boolean => {
  return Object.values(obj).some((value) => value === "" || value === 0);
};

const getTableColumns = () => {
  return [
    "Company",
    "Model",
    "VIN",
    "Color",
    "Year",
    "Price",
    "Availability",
    "Actions",
  ];
};

const filterData = (
  data: ICarTableData[],
  searchValue: string
): ICarTableData[] => {
  if (!searchValue) return data;

  const searchTerm = searchValue.toLowerCase();
  return data.filter((car) => {
    return Object.values(car).some((value) => {
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
      if (typeof value === "number" && value.toString().includes(searchTerm)) {
        return true;
      }
      return false;
    });
  });
};

export { getCarsData, inputIsDisabled, getTableColumns, filterData };
