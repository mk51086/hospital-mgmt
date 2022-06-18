import { Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import FooterNavList from "./FooterNavList";
import NavListItem from "./NavListItem";

const ListRoot = styled("div")(({ theme: { breakpoints, typography } }) => ({
  marginTop: typography.pxToRem(85),
  "& li::nth-last-of-type(2)": {
    marginTop: typography.pxToRem(20),
  },
  [breakpoints.up("md")]: {
    marginTop: 0,
  },
}));

function FooterLinks({ additionalLinks, menu }) {
  if (!additionalLinks) {
    return null;
  }
  return (
    <ListRoot>
      <FooterNavList menu={menu}>
        {additionalLinks.secondary.map((item) => (
          <NavListItem
            sx={{
              padding: 0,
              paddingBottom: "0.625rem",
              display: { md: "block", xs: "flex" },
              justifyContent: { md: "flex-start", xs: "center" },
            }}
            key={item.name}
          >
            <Link
              sx={{
                textDecoration: "none",
                color: "#161925",
                fontSize: { md: "16px", xs: "16px" },
              }}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavListItem>
        ))}
      </FooterNavList>
    </ListRoot>
  );
}

FooterLinks.propTypes = {
  additionalLinks: PropTypes.shape({}),
};

FooterLinks.defaultProps = {
  additionalLinks: undefined,
};

export default FooterLinks;