// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";

// Data
import { useState } from "react";
// import MDDropzone from "components/MDDropzone";

import PropTypes from "prop-types";

function BioInfo({ locationDetails }) {
  const [countryState, setCountryState] = useState("");
  const [country, setCountry] = useState(null);

  const getSearchCountry = (_, newValue) => {
    setCountry(newValue);
    setCountryState("success");
  };

  const countries = [];

  locationDetails?.countries?.map(({ countryname, id, natinality }) => {
    countries.push({ label: countryname, value: id });

    return 0;
  });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5"></MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={country}
              options={countries}
              defaultValue={country}
              onChange={getSearchCountry}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Select Position"
                  InputLabelProps={{ shrink: true }}
                  success={countryState === "success"}
                  error={countryState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Birth Certificate&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDDropzone options={{ addRemoveLinks: true }} /> */}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo
BioInfo.propTypes = {
  nextStep: PropTypes.string.isRequired,
  setClearedBioInfo: PropTypes.func.isRequired,
  locationDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default BioInfo;
