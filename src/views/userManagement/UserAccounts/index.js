import React, { useState } from "react";

import MDBox from "components/MDBox";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Cancel from "@mui/icons-material/Cancel";

import Users from "./Pages/Users.jsx";
import { Typography } from "@mui/material";

export default function Requirements() {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

  const [userDetails, setUserDetails] = useState("");
  const [patientName, setPatientName] = useState("");
  const [loadData, setLoadData] = useState(false);

  const handleAddUser = () => {
    setShowAddUser(true);
    setControllable(Math.random());
  };

  const handleCancelUser = () => {
    setLoadData(false);
    setShowAddUser(false);
    setControllable(Math.random());
    setUserDetails("");
  };

  const ToolbarData = [
    {
      Title: (
        <Typography p={1} onClick={() => skipToPage(1, 0)}>
          User Management
        </Typography>
      ),
      Content: [
        <MDButton
          sx={{ mt: 1 }}
          variant="outlined"
          color={currentPage === 1 ? "primary" : "secondary"}
          onClick={() => skipToPage(1, 0)}
          fullWidth={true}
        >
          User Accounts
        </MDButton>,
      ],
      RightIcons: [
        {
          icon: showAddUser ? <Cancel /> : <PersonAddAltIcon />,
          hint: showAddUser ? "Cancel" : "Add Staff",
          rightIconFunction: showAddUser ? handleCancelUser : handleAddUser,
          rightIconColor: showAddUser ? "error" : "secondary",
        },
      ],
    },
  ];

  function skipToPage(pageNo, slideNo) {
    setCurrentPage(pageNo);
    setSlideNo(slideNo);
  }

  const loadUserDetails = (data) => {
    setLoadData(true);
    setShowAddUser(true);
    setUserDetails(data);
    setPatientName(data.firstName + " " + data.otherName + " " + data.surname);
    handleAddUser();
  };

  return (
    <>
      <MDBox textAlign="center" px={2}>
        <CustomToolbar proceed={currentPage} slideNo={slideNo} toolbarData={ToolbarData} />
        {currentPage === 1 ? (
          <Users
            userDetails={userDetails}
            patientName={patientName}
            loadData={loadData}
            loadUserDetails={loadUserDetails}
            handleCancelUser={handleCancelUser}
            handleAddUser={handleAddUser}
            showAddUser={showAddUser}
            key={controllable}
          />
        ) : null}
      </MDBox>
    </>
  );
}
