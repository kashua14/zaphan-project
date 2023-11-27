import React, { useState, useEffect } from "react";

import { Alert, Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import WorkIcon from "@mui/icons-material/Domain";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoDataCard from "components/FallBacks/NoDataCard";

import MDButton from "components/MDButton/index.js";
import CustomCardHeader from "components/Card/CustomCardHeader";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import { getUsers, approveTrainee } from "util/UserMgtUtils";
import CreateUser from "../CreateUser";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { useSnackbar } from "notistack";
import { usersDummyData } from "data";

export default function Requirements(props) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState(usersDummyData);

  const columns = [
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "gender", title: "Gender" },
    // { name: "dateOfBirth", title: "D.O.B" },
    { name: "actions", title: "Actions" },
  ];

  const grouping = [{ columnName: "position" }];

  const columnsStaff = [
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "gender", title: "Gender" },
    // { name: "dateOfBirth", title: "D.O.B" },
    { name: "position", title: "Position" },

    { name: "actions", title: "Actions" },
  ];

  useEffect(() => {
    loadUsers();
    if (props.showAddUser) {
      setShowAddUser(true);
    }
  }, [props.showAddUser]);

  const loadUsers = () => {
    const CountryRequest = {
      userType: null,
    };

    getUsers(CountryRequest)
      .then((response) => {
        setUsers(response);
      })
      .catch(() => {
        setUsers(usersDummyData);
        // console.log("Country List => ", error.message);
      });
  };

  const handleApprove = (id) => {
    const UserData = {
      id: id,
    };
    // console.log("UserData : ", UserData);
    approveTrainee(UserData)
      .then((response) => {
        if (response.success) {
          openSnackbar(response.message, "success");
          loadUsers();
        } else {
          openSnackbar(response.message, "error");
        }
      })
      .catch((error) => {
        console.log("saveApplicantBioData-err : ", error);
      });
  };

  const loadUserDetails = (data) => {
    setShowAddUser(true);
    props.handleAddUser();
    props.loadUserDetails(data);
  };

  const data = users?.map((data) => {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      gender: data.gender,
      // dateOfBirth: format(new Date(data.dateOfBirth),'dd-MMM-yyyy'),
      position: data?.positionString,
      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton color="info" variant="text" onClick={() => loadUserDetails(data)}>
              Load Profile
            </MDButton>

            {data.userType === "GUEST" && data.userStatus === "SUSPENDED" ? (
              <MDButton color="success" variant="text" onClick={() => handleApprove(data.id)}>
                Approve Trainee
              </MDButton>
            ) : null}
          </Grid>
        </Grid>
      ),
    };
  }) ?? [];

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

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
              showAddUser ? (props.loadData ? props.patientName : "ADD STAFF") : "User Accounts"
            }
          />
          <Alert severity={showAddUser ? (props.loadData ? "success" : "info") : "info"}>
            {showAddUser ? "User Details" : "Below is a list of all Staff"}
          </Alert>
          <MDBox>
            {showAddUser ? (
              <CreateUser
                handleCancelUser={props.handleCancelUser}
                staff={true}
                userDetails={props.userDetails}
              />
            ) : data.length > 0 ? (
              <NewTableBeta
                rows={data}
                exportRow={data}
                columns={columnsStaff}
                exportColumns={columns}
                fileName={"Staff Positions"}
                grouping={grouping}
                // passSelection = {passSelection}
                // grouping={this.state.grouping}
                // defaultHiddenColumnNames={defaultHiddenColumnNames}
              />
            ) : (
              <NoDataCard title="No Users found!" />
            )}
          </MDBox>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
