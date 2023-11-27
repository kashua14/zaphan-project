// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import { useState } from "react";
import Sidenav from "./components/Sidenav";
import BioInfo from "./components/BioInfo";
import NextOfKin from "./components/NextOfKin";
import Permissions from "./components/Permissions";

export default function Apply(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [clearedBioInfo, setClearedBioInfo] = useState(false);
  const [clearedProgrammeChoices, setClearedProgrammeChoices] = useState(false);

  const sidenavItemsPatient = [
    { icon: "person", label: "Bio Information", href: "bio-info", page: 1 },
    { icon: "family_restroom", label: "Next of kin", href: "next-of-kin", page: 2 },
    // { icon: "support",label: "Treatments",href: "treatments",page: 3},
    { icon: "paid", label: "Payments", href: "payments", page: 4 },
    { icon: "attachment", label: "Attachments", href: "attachments", page: 5 },
  ];

  const sidenavItemsStaff = [
    { icon: "person", label: "Bio Information", href: "bio-info", page: 1 },
    { icon: "family_restroom", label: "Next of kin", href: "next-of-kin", page: 2 },
  ];
  const sidenavItemsStaffLoad = [
    { icon: "person", label: "Bio Information", href: "bio-info", page: 1 },
    { icon: "family_restroom", label: "Next of kin", href: "next-of-kin", page: 2 },
    { icon: "support", label: "Permissions", href: "permissions", page: 6 },
  ];

  return (
    <MDBox mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Sidenav
            sidenavItems={
              props.staff !== undefined && props.staff
                ? props.userDetails !== undefined && props.userDetails !== ""
                  ? sidenavItemsStaffLoad
                  : sidenavItemsStaff
                : sidenavItemsPatient
            }
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleCancelUser={props.handleCancelUser}
            clearedProgrammeChoices={clearedProgrammeChoices}
            clearedBioInfo={clearedBioInfo}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {currentPage === 1 && (
                  <BioInfo
                    staff={props.staff}
                    userDetails={props.userDetails}
                    nextStep="programme-choices"
                    setCurrentPage={setCurrentPage}
                    setClearedBioInfo={setClearedBioInfo}
                  />
                )}
                {currentPage === 2 && (
                  <NextOfKin
                    nextStep="bio-info"
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}

                {currentPage === 6 && (
                  <Permissions
                    nextStep="bio-info"
                    setCurrentPage={setCurrentPage}
                    userId={props.userDetails.id}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                  />
                )}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Typechecking props for the BioInfo
