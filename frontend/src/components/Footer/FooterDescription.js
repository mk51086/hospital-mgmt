import RichTypography from "../shared/RichTypography/RichTypography";
import PropTypes from "prop-types";
import React from "react";
import Box from "@mui/material/Box";

import logo from "../../assets/images/footerlogo.png";

function FooterDescription({ description }) {
  if (!description) {
    return null;
  }
  return (
    <>
      <Box
        component="img"
        sx={{
          height: 77,
          width: 200,
          maxHeight: { xs: 200, md: 113 },
          maxWidth: { xs: 380, md: 251 },
        }}
        alt="HMS"
        src={logo}
      />
      <RichTypography
        variant="body1"
        sx={{ marginTop: "3.125rem", fontSize: { md: 12, xs: 12 } }}
      >
        {description}
      </RichTypography>
    </>
  );
}

FooterDescription.propTypes = {
  description: PropTypes.string,
};

FooterDescription.defaultProps = {
  description: undefined,
};

export default FooterDescription;