import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import FilterList from "@mui/icons-material/FilterList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoDataCard from "components/FallBacks/NoDataCard";
import { format } from "date-fns";

import MDButton from "components/MDButton/index.js";
import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import { getApplicants, getApplicationDetails } from "util/ApplicationUtils";

import CreateUser from "views/applications/CreateUser/forms";

import NewTableBeta from "components/TableExport/NewTableBeta";

export default function Requirements(props) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([]);

  const [staff, setStaff] = useState(false);

  const [myKey, setMyKey] = useState(Math.random());

  const columns = [
    { name: "status", title: "Status" },
    { name: "type", title: "Application Type" },
    { name: "dateSubmitted", title: "Application Date" },
    { name: "name", title: "Name" },
    { name: "email", title: "Contacts" },
    { name: "actions", title: "Actions" },
  ];

  const grouping = [
    // { columnName: 'status' }, { columnName: 'type' }
  ];

  useEffect(() => {
    // alert("from parent - "+props.pStaff)
    loadUsers();

    if (props.showAddUser) {
      setShowAddUser(true);
    }

    setStaff(props.pStaff);
  }, [props.pStaff, props.showAddUser]);

  const loadUsers = (check) => {
    // alert("load data - "+staff)
    const CountryRequest = {
      status: null,
    };

    // console.log("CountryRequest ====> ",CountryRequest)

    getApplicants(CountryRequest)
      .then((response) => {
        // console.log("Applicants List => ", response);
        setUsers(response);
      })
      .catch((error) => {
        // console.log("Country List => ", error.message);
      });
  };

  const loadUserDetails = (data) => {
    loadApplicationDetails(data);
  };

  const loadApplicationDetails = (data) => {
    // alert("load data - "+staff)
    const CountryRequest = {
      id: data.id,
    };

    // console.log("CountryRequest ====> ",CountryRequest)

    getApplicationDetails(CountryRequest)
      .then((response) => {
        // console.log("setApplicationDetails --- => ", response);
        props.setApplicationDetails(response);
        setShowAddUser(true);
        props.handleAddUser();
        props.loadUserDetails(data, staff, false);
      })
      .catch((error) => {
        // console.log("setApplicationDetails error => ", error.message);
      });
  };

  const formatEnum = (enumValue) => {
    if (enumValue !== null && enumValue !== undefined && enumValue !== "") {
      var frags = enumValue.toLowerCase().split("_");
      var i;
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    } else {
      return "Unkown";
    }
  };

  const data = users.map((data, key) => {
    return {
      id: data.id,
      name: data.fullname,
      status: formatEnum(data.status),
      email: data.email + " & " + data.phoneNumber,
      gender: data.gender,
      dateSubmitted: format(new Date(data.dateSubmitted), "dd-MMM-yyyy"),
      type: data.type,
      position: data?.staffProfile?.position,
      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton color="info" variant="text" onClick={() => loadUserDetails(data)}>
              Load Application
            </MDButton>

            {data.reviewersCount > 0 ? (
              <MDButton
                color="warning"
                variant="text"
                onClick={() => props.loadUserDetails(data, staff, true)}
              >
                {"(" + data.reviewersCount + ")Reviewers"}
              </MDButton>
            ) : null}
          </Grid>
        </Grid>
      ),
    };
  });

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CustomCardHeader
            icon={
              showAddUser ? (
                <AccountCircleIcon fontSize="large" style={{ color: "white" }} />
              ) : (
                <WorkIcon fontSize="large" style={{ color: "white" }} />
              )
            }
            title={
              showAddUser
                ? props.loadData
                  ? props.patientName
                  : staff
                  ? "ADD STAFF"
                  : "ADD INCUBATE"
                : "Incubation Applications"
            }
          />
          <Alert
            icon={<FilterList fontSize="inherit" />}
            severity={showAddUser ? (props.loadData ? "success" : "info") : "warning"}
          >
            {showAddUser ? "Application Details" : "Below is a list of Applicants"}
          </Alert>
          <MDBox>
            {showAddUser ? (
              <CreateUser
                handleCancelUser={props.handleCancelUser}
                key={myKey}
                staff={staff}
                applicationDetails={props.applicationDetails}
                userDetails={props.userDetails}
              />
            ) : data.length > 0 ? (
              <NewTableBeta
                key={myKey}
                rows={data}
                exportRow={data}
                columns={columns}
                exportColumns={columns}
                fileName={"Applications"}
                grouping={grouping}
                // passSelection = {passSelection}
                // grouping={this.state.grouping}
                // defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
            ) : (
              <NoDataCard title="No Applications found!" />
            )}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
