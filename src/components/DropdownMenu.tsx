import React, { ReactElement, ReactNode, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface DropdownMenuProps {
  key: number;
  children: ReactElement | ReactNode;
}

const DropdownMenu = ({ key, children }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Логика для удаления элемента
    handleClose();
  };

  const handleEdit = () => {
    // Логика для редактирования элемента
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick}>Dropdown</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
