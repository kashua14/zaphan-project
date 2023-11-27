// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import FormField from "components/FormField";

import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { CustomAppContext } from "context/MyAppProvider";

function BioInfo({ locationDetails }) {
  const { currentUser } = useContext(CustomAppContext);

  const [countryState, setCountryState] = useState(
    currentUser?.countyId !== null ? "success" : "error"
  );

  const [country, setCountry] = useState(null);

  useEffect(() => {}, []);

  const getSearchCountry = (_, newValue) => {
    setCountry(newValue);
    setCountryState("success");
  };

  const countries = [];
  const nationalities = [];

  locationDetails?.countries?.map(({ countryname, id, natinality }) => {
    countries.push({ label: countryname, value: id });
    if (
      natinality !== null &&
      !nationalities.some(
        (e) => e.label !== null && e.label.toLowerCase() === natinality?.toLowerCase()
      )
    ) {
      nationalities.push({ label: natinality, value: id });
    }
    return 0;
  });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
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
