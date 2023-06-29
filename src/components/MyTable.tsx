import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { ICarTableData } from "./types/types";
import DropdownMenu from "./DropdownMenu";

const MyTable = () => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns: string[] = [
    "Company",
    "Model",
    "VIN",
    "Color",
    "Year",
    "Price",
    "Availability",
    "Actions",
  ];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const newData = data?.map((car) => {
    return {
      ...car,
      Actions: [<DropdownMenu key={car.id}>Action</DropdownMenu>],
    };
  });
  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "10px",
        width: "98vw",
        border: "1px solid rgba(224, 224, 224, 1)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, columnIndex) => (
              <TableCell key={columnIndex}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {newData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((car, carIndex) => (
              <TableRow key={carIndex}>
                {columns.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {car[column as keyof typeof car]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MyTable;
