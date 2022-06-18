import RichTypography from "../shared/RichTypography/RichTypography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const NewsletterSubscriptionRoot = styled(RichTypography)(
  ({ theme: { typography } }) => ({
    "& #mc_embed_signup": {
      ...typography.body1,
      backgroundColor: "unset",
      color: "inherit",
    },
    "& #mc_embed_signup input[type=text], & #mc_embed_signup input[type=email]":
      {
        border: "1px solid #D0CBCB",
        display: "flex",
        height: typography.pxToRem(36),
        width: "100%",
        marginBottom: typography.pxToRem(30),
        padding: `0 ${typography.pxToRem(12)}`,
      },
    "& #mc_embed_signup input[type=submit]": {
      ...typography.subtitle1,
      background: "none",
      border: "none",
      color: "inherit",
      padding: 0,
      textDecoration: "underline",
    },
  })
);


const NewsletterSubscription = React.forwardRef(function NewsletterSubscription(
  props,
  ref
) {
  const { children: childrenProp, embedCode } = props;
  const children = childrenProp || embedCode;

  if (!children) {
    return null;
  }
  return (
    <NewsletterSubscriptionRoot ref={ref}>
      {children}
    </NewsletterSubscriptionRoot>
  );
});

NewsletterSubscription.propTypes = {
  children: PropTypes.node,
  embedCode: PropTypes.node,
};

NewsletterSubscription.defaultProps = {
  children: undefined,
  embedCode: undefined,
};

export default NewsletterSubscription;