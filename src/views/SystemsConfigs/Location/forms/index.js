// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import { useState } from "react";
import PropTypes from "prop-types";
import Sidenav from "./components/Sidenav";
import Countries from "./components/Countries";
import Districts from "./components/Districts";
import Counties from "./components/Counties";
import SubCounties from "./components/SubCounties";
import Parishes from "./components/Parishes";
import Villages from "./components/Villages";

export default function Apply({ locationDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [clearedBioInfo, setClearedBioInfo] = useState(false);
  const [clearedProgrammeChoices, setClearedProgrammeChoices] = useState(false);

  return (
    <MDBox mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            clearedProgrammeChoices={clearedProgrammeChoices}
            clearedBioInfo={clearedBioInfo}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {currentPage === 1 && (
                  <Countries
                    nextStep="programme-choices"
                    setCurrentPage={setCurrentPage}
                    setClearedBioInfo={setClearedBioInfo}
                    locationDetails={locationDetails}
                  />
                )}
                {currentPage === 2 && (
                  <Districts
                    nextStep="bio-info"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}

                {currentPage === 3 && (
                  <Counties
                    nextStep="counties"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}

                {currentPage === 4 && (
                  <SubCounties
                    nextStep="sub-counties"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}

                {currentPage === 5 && (
                  <Parishes
                    nextStep="parishes"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}
                {currentPage === 6 && (
                  <Villages
                    nextStep="villages"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <Accounts
                  nextStep="a-level-info"
                  setClearedOtherQualifications={setClearedOtherQualifications}
                />
              </Grid>
              <Grid item xs={12}>
                <Authentication
                  nextStep="o-level-info"
                  setClearedALevelInfo={setClearedALevelInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <Notifications nextStep="next-of-kin" setClearedOLevelInfo={setClearedOLevelInfo} />
              </Grid>
              <Grid item xs={12}>
                <Sessions nextStep="attachments" setClearedNextOfKin={setClearedNextOfKin} />
              </Grid>
              <Grid item xs={12}>
                <Sessions
                  nextStep="referee-details"
                  setClearedAttachments={setClearedAttachments}
                />
              </Grid>
              <Grid item xs={12}>
                <DeleteAccount
                  nextStep="additional-information"
                  setClearedRefereeDetails={setClearedRefereeDetails}
                />
              </Grid>
              <Grid item xs={12}>
                <Authentication
                  nextStep="christian-philosophy"
                  setClearedAdditionalInformation={setClearedAdditionalInformation}
                />
              </Grid>
              <Grid item xs={12}>
                <Notifications
                  nextStep="applicant-payment"
                  setChristianPhilosophy={setChristianPhilosophy}
                />
              </Grid>
              <Grid item xs={12}>
                <DeleteAccount setClearedApplicantPayment={setClearedApplicantPayment} />
              </Grid> */}
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Typechecking props for the Countries
Apply.propTypes = {
  locationDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};
