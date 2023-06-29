import React, { useEffect } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import MyLoading from "./components/MyLoading";
import MyTable from "./components/MyTable";
import { ICar } from "./components/types/types";
import { Button } from "@mui/material";

const App = () => {
  const { isLoading, error, data } = useQuery(
    "carsData",
    () =>
      axios.get("https://myfakeapi.com/api/cars/").then((data) =>
        data.data.cars.map((car: ICar) => ({
          id: car.id,
          Company: car.car,
          Model: car.car_model,
          VIN: car.car_vin,
          Color: car.car_color,
          Year: car.car_model_year,
          Price: car.price,
          Availability: car.availability ? "yes" : "no",
          Actions: [<Button key={car.id}>Nike</Button>],
        }))
      ),
    {
      initialData: () => {
        const cahchedData = localStorage.getItem("carsData");
        return cahchedData ? JSON.parse(cahchedData) : undefined;
      },
      refetchOnWindowFocus: false,
      enabled: !localStorage.getItem("carsData"),
    }
  ) as { isLoading: boolean; error: AxiosError; data: ICar[] };

  useEffect(() => {
    if (!isLoading && !error && data) {
      localStorage.setItem("carsData", JSON.stringify(data));
    }
  }, [data]);

  console.log(data);

  if (isLoading) return <MyLoading />;

  if (error) {
    const axiosError = error as AxiosError;
    return <p>Ошибка: {axiosError.message}</p>;
  }

  return <MyTable />;
};

export default App;
