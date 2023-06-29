import React from "react";
import { Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const MyLoading = () => {
  return (
    <Box sx={{ width: 600, margin: "30vh auto" }}>
      <Typography variant="h1" gutterBottom color="primary">
        ...LOADING
      </Typography>
      <LinearProgress />
    </Box>
  );
};

export default MyLoading;
