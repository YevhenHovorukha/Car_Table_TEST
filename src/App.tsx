import React, { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import MyLoading from "./components/MyLoading";
import MyTable from "./components/MyTable";
import { ICar } from "./components/types/types";
import { Button } from "@mui/material";
import { getCarsData } from "./utils/getCarsData";
import AddModal from "./components/AddModal";

const App = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { isLoading, error, data } = useQuery("carsData", () => getCarsData(), {
    initialData: () => {
      const cahchedData = localStorage.getItem("carsData");
      return cahchedData ? JSON.parse(cahchedData) : undefined;
    },
    refetchOnWindowFocus: false,
    enabled: !localStorage.getItem("carsData"),
  }) as { isLoading: boolean; error: AxiosError; data: ICar[] };

  useEffect(() => {
    if (!isLoading && !error && data) {
      localStorage.setItem("carsData", JSON.stringify(data));
    }
  }, [data]);

  const handlAddOpen = (): void => {
    setOpenAddModal(!openAddModal);
  };

  const handleAddClose = (): void => {
    setOpenAddModal(!openAddModal);
  };

  if (isLoading) return <MyLoading />;

  if (error) {
    const axiosError = error as AxiosError;
    return <p>Ошибка: {axiosError.message}</p>;
  }

  return (
    <>
      <Button
        sx={{ margin: "10px" }}
        variant="contained"
        size="large"
        onClick={handlAddOpen}
      >
        Add new Car
      </Button>
      <MyTable />;
      <AddModal open={openAddModal} handleAddClose={handleAddClose} />
    </>
  );
};

export default App;
