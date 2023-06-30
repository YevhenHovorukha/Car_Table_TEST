import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { ICarTableData } from "./types/types";
import DropdownMenu from "./DropdownMenu";
import { getTableColumns } from "../utils/helpers";

const StyledTableContainer = {
  margin: "10px",
  width: "98vw",
  border: "1px solid rgba(224, 224, 224, 1)",
};

const MyTable = () => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns: string[] = getTableColumns();

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

  const newData: ICarTableData[] = useMemo(() => {
    return data?.map((car) => {
      return {
        ...car,
        Actions: [<DropdownMenu key={car.id} car={car} />],
      };
    });
  }, [data]);

  return (
    <TableContainer component={Paper} sx={StyledTableContainer}>
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
