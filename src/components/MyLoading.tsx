import { Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const StyledBox = {
  width: 600,
  margin: "30vh auto",
};

const MyLoading = () => {
  return (
    <Box sx={StyledBox}>
      <Typography variant="h1" gutterBottom color="primary">
        ...LOADING
      </Typography>
      <LinearProgress />
    </Box>
  );
};

export default MyLoading;
