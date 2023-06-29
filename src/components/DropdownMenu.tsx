import React, {
  HtmlHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { ICarTableData } from "./types/types";

interface DropdownMenuProps {
  car: ICarTableData;
  children?: ReactElement | ReactNode;
}

const DropdownMenu = ({ car, children }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);
  const [openEditModal, setEditOpenModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlDeleteOpen = (): void => {
    setDeleteOpenModal(!openDeleteModal);
  };

  const handleDeleteClose = (): void => {
    setDeleteOpenModal(!openDeleteModal);
  };

  const handlEditOpen = (): void => {
    setEditOpenModal(!openEditModal);
  };

  const handleEditClose = (): void => {
    setEditOpenModal(!openEditModal);
  };

  return (
    <>
      <Button onClick={handleClick}>Action</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handlDeleteOpen}>Delete</MenuItem>
        <MenuItem onClick={handlEditOpen}>Edit</MenuItem>
      </Menu>
      <DeleteModal
        car={car}
        open={openDeleteModal}
        handleDeleteClose={handleDeleteClose}
      />
      <EditModal
        car={car}
        open={openEditModal}
        handleEditClose={handleEditClose}
      />
    </>
  );
};

export default DropdownMenu;
