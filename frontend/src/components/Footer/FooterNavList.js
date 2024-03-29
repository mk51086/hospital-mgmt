import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";

import NavList from "./NavList";
import NavListItem from "./NavListItem";

function FooterNavList({ menu, children }) {
  if (!menu?.length) {
    return null;
  }
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <NavList
        direction="column"
        sx={{ padding: 0, alignItems: { xs: "center", md: "flex-start" } }}
      >
        {menu.map((item) => (
          <NavListItem key={item.label} sx={{ mb: "20px" }}>
            <Link
              href={item.href}
              color="#161925"
              underline="none"
              variant="h5"
              fontWeight="700"
              sx={{
                "&:hover, &:active, &:focus, &:focus-within": {
                  textDecoration: "none",
                  color: "#23395B",
                },
              }}
            >
              {item.label}
            </Link>
          </NavListItem>
        ))}
        {children}
      </NavList>
    </Box>
  );
}

FooterNavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

FooterNavList.defaultProps = {
  menu: undefined,
};

export default FooterNavList;