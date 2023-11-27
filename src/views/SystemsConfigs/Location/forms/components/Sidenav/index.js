// @mui material components
import { CheckCircle } from "@mui/icons-material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import rgba from "assets/theme/functions/rgba";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

function Sidenav({ setCurrentPage, clearedBioInfo, currentPage }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const sidenavItems = [
    { icon: "places", label: "Countries", href: "countries", page: 1 },
    { icon: "places", label: "Districts", href: "districts", page: 2 },
    { icon: "places", label: "Counties", href: "counties", page: 3},
    { icon: "places",label: "Sub Counties",href: "sub_counties",page: 4},
    { icon: "places", label: "Parishes", href: "parishes", page: 5 },
    { icon: "places", label: "Villages", href: "villages", page: 6 },
    // { icon: "fact_check", label: "A`Level Information", href: "a-level-info", page: 6 },
    // { icon: "task", label: "O`Level Information", href: "o-level-info", page: 7 },
    // { icon: "group", label: "Referee Details", href: "referee-details", page: 9 },
  
    
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, page, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <MDBox key={itemKey} component="li" pt={0}>
        <MDTypography
          component="a"
          href={`#${href}`}
          onClick={() => setCurrentPage(page)}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            backgroundColor: page === currentPage ? rgba(light.main, darkMode ? 0.2 : 1) : "black",
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: rgba(light.main, darkMode ? 0.05 : 0.4),
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={darkMode ? "white" : "dark"}>
            <Icon fontSize="small">{icon}</Icon>
          </MDBox>
          {label}
          <MDBox ml={2} lineHeight={1} color={darkMode ? "white" : "dark"}>
            {href === "bio-info" && clearedBioInfo && (
              <CheckCircle fontSize="small" color="success" />
            )}
          </MDBox>
        </MDTypography>
      </MDBox>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "2%",
      }}
    >
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </MDBox>
    </Card>
  );
}
Sidenav.defaultProps = {
  clearedBioInfo: false,
  currentPage: 1,
};

// Typechecking props for the BioInfo
Sidenav.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  clearedBioInfo: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default Sidenav;
