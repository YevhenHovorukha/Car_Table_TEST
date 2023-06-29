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

interface DropdownMenuProps {
  children: ReactElement | ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
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
      <Button onClick={handleClick}>Dropdown</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handlDeleteOpen}>Delete</MenuItem>
        <MenuItem onClick={handlEditOpen}>Edit</MenuItem>
      </Menu>
      <DeleteModal
        open={openDeleteModal}
        handleDeleteClose={handleDeleteClose}
      />
      <EditModal open={openEditModal} handleEditClose={handleEditClose} />
    </>
  );
};

export default DropdownMenu;
