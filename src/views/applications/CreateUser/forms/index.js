// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import { useEffect, useState } from "react";
import Sidenav from "./components/Sidenav";
import BioInfo from "./components/BioInfo";
import { getCountriesOpen, getDistrictsOpen, getGender, getCenters } from "util/AuthUtils";

import homeDecor2 from "assets/img/congs.gif";

import { Card, CardMedia } from "@mui/material";

export default function Apply(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [clearedBioInfo, setClearedBioInfo] = useState(false);
  const [bioInfo, setBioInfo] = useState(null);
  const [clearedProgrammeChoices, setClearedProgrammeChoices] = useState(false);
  const [addressInfo, setAddressInfo] = useState(null);
  const [educationInfo, setEducationInfo] = useState(null);

  const [supportingInfo, setSupportingInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [genderEnums, setGenderEnums] = useState([]);
  const [membersData, setMembersData] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [centers, setCenters] = useState([]);

  const [disableEdit, setDisableEdit] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  const sidenavItemsStaff = [
    { icon: "person", label: "Basic Information", href: "bio-info", page: 1 },
    { icon: "business_icon", label: "Company Details", href: "company", page: 5 },
    { icon: "groups_icon ", label: "Team Members", href: "members", page: 6 },
    { icon: "attachment", label: "Files & Other Information", href: "attachments", page: 4 },
  ];

  useEffect(() => {
    loadCountries();
    loadGenderEnums();
    loadDistricts();
    loadCenters();

    if (props.applicationDetails !== undefined && props.applicationDetails !== null) {
      // alert("Please fill in application")
      console.log("Loading application", props.applicationDetails.bioInfo);
      setDisableEdit(true);

      let appDetails = props.applicationDetails;
      setIsAdmin(true);

      setBioInfo(appDetails.bioInfo);
      setSupportingInfo(appDetails.supportingInfo);

      if (appDetails.type === "COMPANY") {
        setCompanyInfo(appDetails.companyInfo);
        setMembersData(appDetails.membersData);
      } else {
        setAddressInfo(appDetails.addressInfo);
        setEducationInfo(appDetails.educationInfo);
      }
    } else {
      // alert("Please select")
    }

    console.log("props.userDetails  +++ ", props.userDetails);
  }, []);

  const loadCountries = () => {
    const MyRequest = {};

    getCountriesOpen(MyRequest)
      .then((response) => {
        console.log("countries => ", response);
        setCountries(response);
      })
      .catch((error) => {
        console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  const loadCenters = () => {
    getCenters()
      .then((response) => {
        // console.log("centers => ", response);
        setCenters(response);
      })
      .catch((error) => {
        // console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  const loadGenderEnums = () => {
    getGender()
      .then((response) => {
        setGenderEnums(response);
      })
      .catch((error) => {
        console.log("loadGenderEnums => ", error.message);
      });
  };

  const loadDistricts = () => {
    const MyRequest = {};

    getDistrictsOpen(MyRequest)
      .then((response) => {
        // console.log("countries => ", response);
        setDistricts(response);
      })
      .catch((error) => {
        console.log("loadReligiousAffiliationEnums => ", error.message);
      });
  };

  return (
    <MDBox mt={4}>
      {!showSuccess ? (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav
              sidenavItems={sidenavItemsStaff}
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
                      nextStep="address"
                      setCurrentPage={setCurrentPage}
                      setClearedBioInfo={setClearedBioInfo}
                      bioInfo={bioInfo}
                      setBioInfo={setBioInfo}
                      countries={countries}
                      genderEnums={genderEnums}
                      isAdmin={isAdmin}
                      disableEdit={disableEdit}
                      showButtons={showButtons}
                    />
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Card sx={{ overflow: "visible" }} mt={4}>
              <CardMedia
                src={homeDecor2}
                component="img"
                title="Congratulations"
                sx={{
                  maxWidth: "100%",
                  margin: 0,
                  padding: 0,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

// Typechecking props for the BioInfo
