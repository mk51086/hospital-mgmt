import Section from "../shared/Section/Section";
import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import Copyright from "../Copyright/Copyright";
import FooterDescription from "./FooterDescription";
import FooterLinks from "./FooterLinks";
import NewsletterSubscription from "../NewsLetterSubscription/NewsLetterSubscription";
import Typography from '@mui/material/Typography';

import StayInTouch from "../StayInTouch/StayInTouch";
import Divider from '@mui/material/Divider';

const FooterRoot = styled(Box)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    backgroundColor: palette.common.white,
    color: '#161925',
    padding: `${typography.pxToRem(80)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(110)} 0`,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(100)} 0`,
    },
  })
);

const Footer = React.forwardRef(function Footer(props, ref) {
  const { subscription, description, additionalLinks, socialMedia, menu } =
    props;

  return (
    <>
    <Divider variant="middle" />
    
    <FooterRoot component="footer" ref={ref}>
      <Section sx={{ px: { xs: "20px", sm: 0 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 0 } }}>
            <Grid container>
              <Grid
                sx={{ textAlign: { xs: "center", md: "left" } }}
                item
                xs={12}
              >
                <FooterDescription description={description} />
              </Grid>
              <Grid item xs={12}>
                <StayInTouch socialMedia={socialMedia} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            xs={12}
            md={4}
            sx={{ order: { xs: 2, md: 1 } }}
          >
            <FooterLinks additionalLinks={additionalLinks} menu={menu} />
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: { md: 2 } }}>
          <Typography variant="body1" gutterBottom component="div">
        Subscribe to our newsletter
      </Typography>
            <NewsletterSubscription {...subscription} />
          </Grid>
        </Grid>
      </Section>
    </FooterRoot>
    </>
  );
});

Footer.propTypes = {
  subscription: PropTypes.shape({}),
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

Footer.defaultProps = {
  subscription: undefined,
  menu: undefined,
};

export default Footer;