import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FilterList from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import MDButton from "components/MDButton/index.js";
import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import CreateUser from "./CreateUser";

// D:\kikuba\Namanve\ACCESS-CONTROL\ACCESS-UI-NEW\src\views\register\components\Requirements\index.js

export default function Requirements(props) {
  const [staff, setStaff] = useState(false);
  const [myKey, setMyKey] = useState(Math.random());

  const [showForm, setShowForm] = useState(false);

  const handleLoadCompany = () => {
    setMyKey(Math.random());
    setStaff(true);
    setShowForm(true);
  };

  const handleLoadIndividual = () => {
    setMyKey(Math.random());
    setStaff(false);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  useEffect(() => {}, []);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <CustomCardHeader
          icon={<AccountCircleIcon fontSize="large" style={{ color: "white" }} />}
          title={"Application for Incubation/ Acceleration"}
        />
        <Alert
          action={
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              {showForm ? (
                <MDButton variant="gradient" color="error" onClick={handleClose} fullWidth>
                  Close
                </MDButton>
              ) : null}
            </MDBox>
          }
          icon={<FilterList fontSize="inherit" />}
          severity={"warning"}
        >
          Empower Entrepreneurs With The Skills, Knowledge, And Network They Need To Turn Their
          Ideas Into Successful Businesses.
        </Alert>
        <MDBox>
          {!showForm ? (
            <Card>
              <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                <GridItem xs={12} sm={8} md={8}>
                  <MDBox mt={3} />
                  <MDTypography fontSize={16} variant="body1" align="justify" gutterBottom>
                    You can apply for incubation or acceleration by filling the form below. You can
                    apply as a company or as an individual.
                  </MDTypography>
                  <MDBox mt={3} />

                  <MDBox p={2}>
                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                      <Grid item xs={12} sm={6} lg={6}>
                        <MDButton
                          variant="gradient"
                          color="success"
                          onClick={handleLoadIndividual}
                          fullWidth
                        >
                          Individual Application
                        </MDButton>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          onClick={handleLoadCompany}
                          fullWidth
                        >
                          Company Application
                        </MDButton>
                      </Grid>
                    </Grid>
                  </MDBox>
                </GridItem>
              </Grid>
            </Card>
          ) : (
            <CreateUser
              handleCancelUser={props.handleCancelUser}
              key={myKey}
              staff={staff}
              userDetails={props.userDetails}
            />
          )}
        </MDBox>
      </GridItem>
    </GridContainer>
  );
}
