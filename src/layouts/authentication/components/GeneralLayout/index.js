// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Material Dashboard 2 PRO React page layout routes
import pageRoutes from "page.routes";

// Authentication pages components
import Footer from "layouts/authentication/components/Footer";

function GeneralLayout({ image, children, showHeaderAndFooter }) {
  return (
    <PageLayout>
      {showHeaderAndFooter && (
        <DefaultNavbar
          sx={{ position: "relative", zIndex: 20000 }}
          routes={pageRoutes}
          transparent
          light
        />
      )}

      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(41, 106, 176, 0.7), rgba(0, 0, 0, 0.83)), url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox sx={{ zIndex: 10, position: "relative" }}>
        <MDBox px={1} width="100%" height="100vh" mx="auto">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={12} sm={11}>
              {children}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {showHeaderAndFooter && (
        <MDBox sx={{ zIndex: 500 }}>
          <Footer sx={{ zIndex: -1 }} light />
        </MDBox>
      )}
    </PageLayout>
  );
}

GeneralLayout.defaultProps = {
  showHeaderAndFooter: false,
};

// Typechecking props for the BasicLayout
GeneralLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showHeaderAndFooter: PropTypes.bool,
};

export default GeneralLayout;
