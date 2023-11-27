// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import { useEffect, useState } from "react";
import BioInfo from "./components/BioInfo";
import Address from "./components/Address";
import Education from "./components/Education";
import Supporting from "./components/Supporting";
import {
  getCountriesOpen,
  getDistrictsOpen,
  getGender,
  getCenters,
} from "util/AuthUtils";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import homeDecor2 from "assets/img/congs.gif";

import Company from "./components/Company";
import Members from "./components/Members";
import { Alert, Card, CardMedia } from "@mui/material";
import MDTypography from "components/MDTypography";

export default function Apply(props) {
  const [currentPage, setCurrentPage] = useState(1);
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

  const [myKey, setMyKey] = useState(Math.round(Math.random()));

  const [disableEdit, setDisableEdit] = useState(true);
  const [showButtons, setshowButtons] = useState(false);


  const handleFinalSubmit = () => {};

 

  useEffect(() => {
    loadCountries();
    loadGenderEnums();
    loadDistricts();
    loadCenters();

    // alert(props.staff)

    // console.log("Loading application", props.applicationDetails)

    if (props.applicationDetails !== undefined && props.applicationDetails !== null) {
      setMyKey(Math.round(Math.random()));

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
    }
  }, [
    props.applicationDetails,
    bioInfo,
    addressInfo,
    educationInfo,
    supportingInfo,
    companyInfo,
    membersData,
  ]);

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
          <Grid item xs={12} lg={12}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <BioInfo
                    staff={props.staff}
                    nextStep="address"
                    setCurrentPage={setCurrentPage}
                    bioInfo={bioInfo}
                    setBioInfo={setBioInfo}
                    countries={countries}
                    genderEnums={genderEnums}
                    isAdmin={isAdmin}
                    disableEdit={disableEdit}
                    showButtons={showButtons}
                  />

                  {!props.staff && (
                    <Address
                      nextStep="education"
                      setCurrentPage={setCurrentPage}
                      setClearedProgrammeChoices={setClearedProgrammeChoices}
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      districts={districts}
                      countries={countries}
                      isAdmin={isAdmin}
                      disableEdit={disableEdit}
                      showButtons={showButtons}
                    />
                  )}

                  {!props.staff && (
                    <Education
                      nextStep="attachments"
                      setCurrentPage={setCurrentPage}
                      setClearedProgrammeChoices={setClearedProgrammeChoices}
                      educationInfo={educationInfo}
                      setEducationInfo={setEducationInfo}
                      isAdmin={isAdmin}
                      disableEdit={disableEdit}
                      showButtons={showButtons}
                    />
                  )}

                  {props.staff && (
                    <Company
                      key={myKey}
                      nextStep="bio-info"
                      setCurrentPage={setCurrentPage}
                      setClearedProgrammeChoices={setClearedProgrammeChoices}
                      companyInfo={companyInfo}
                      setCompanyInfo={setCompanyInfo}
                      isAdmin={isAdmin}
                      disableEdit={disableEdit}
                      showButtons={showButtons}
                    />
                  )}

                  {props.staff && (
                    <Members
                      nextStep="bio-info"
                      setCurrentPage={setCurrentPage}
                      setClearedProgrammeChoices={setClearedProgrammeChoices}
                      companyInfo={companyInfo}
                      setCompanyInfo={setCompanyInfo}
                      membersData={membersData}
                      setMembersData={setMembersData}
                      isAdmin={isAdmin}
                      disableEdit={disableEdit}
                      showButtons={showButtons}
                    />
                  )}

                  <Supporting
                    staff={props.staff}
                    nextStep="bio-info"
                    centers={centers}
                    setCurrentPage={setCurrentPage}
                    setClearedProgrammeChoices={setClearedProgrammeChoices}
                    supportingInfo={supportingInfo}
                    setSupportingInfo={setSupportingInfo}
                    handleFinalSubmit={handleFinalSubmit}
                    isAdmin={isAdmin}
                    handleCancelUser={props.handleCancelUser}
                    setIsAdmin={setIsAdmin}
                    disableEdit={disableEdit}
                    showButtons={showButtons}
                  />
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

          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }} mt={4}>
              <Alert color="info" icon={<SentimentSatisfiedAltIcon fontSize="inherit" />}>
                <MDTypography variant="h5">
                  Thanks {bioInfo?.userEmail}, Your information have been submitted successfully for
                  the future reference we will contact you soon.
                </MDTypography>
              </Alert>
            </Card>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

// Typechecking props for the BioInfo
