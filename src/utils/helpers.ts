import axios from "axios";
import { ICar, ICarTableData } from "../components/types/types";

const getCarsData = async () => {
  const data = await axios.get("https://myfakeapi.com/api/cars/");

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

export { getCarsData, inputIsDisabled };
