const StyleModalBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledBoxColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const StyledBoxFlexEnd = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const StyledCenteredTypography = {
  display: "flex",
  justifyContent: "center",
  margin: "10px",
};

const StyledBoxCenter = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

export {
  StyleModalBox,
  StyledBoxColumn,
  StyledBoxFlexEnd,
  StyledCenteredTypography,
  StyledBoxCenter,
};
