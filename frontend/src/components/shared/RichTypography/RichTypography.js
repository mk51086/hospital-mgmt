import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

const RichTypographyRoot = styled(Typography)(({ theme }) => ({
  "& a": {
    color: theme.palette.main,
  },
}));

const RichTypography = React.forwardRef(function RichTypography(
  { children, component, ...props },
  ref
) {
  if (!children) {
    return null;
  }
  if (typeof children === "string") {
    return (
      <RichTypographyRoot
        component={component || "div"}
        dangerouslySetInnerHTML={{
          __html: children,
        }}
        {...props}
        ref={ref}
      />
    );
  }
  return (
    <Typography component={component} {...props} ref={ref}>
      {children}
    </Typography>
  );
});

RichTypography.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
};

RichTypography.defaultProps = {
  children: undefined,
  component: undefined,
};

export default RichTypography;