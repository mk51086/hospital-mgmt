import { Typography } from '@mui/material';
import React from "react";

function Title({ children }) {
  return (
    <Typography
      sx={{ marginBottom: { md: 0, xs: "1.438rem" } }}
      variant="body2"
    >
      {children}
    </Typography>
  );
}

export default Title;