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
import { getTableColumns, filterData } from "../utils/helpers";
import TextField from "@mui/material/TextField";
import { StyledTableContainer, StyledTextFieldTable } from "./styles/styles";

const MyTable = () => {
  const queryClient = useQueryClient();
  const data: ICarTableData[] = queryClient.getQueryData("carsData") ?? [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

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

  const hanlderChangeSeacrh = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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

  const filteredData = filterData(newData, searchValue);

  return (
    <>
      <TextField
        sx={StyledTextFieldTable}
        label="Search"
        name="Search"
        value={searchValue}
        onChange={hanlderChangeSeacrh}
        placeholder="Search"
      />
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
            {filteredData
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default MyTable;
