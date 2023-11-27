import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";

import EventsList from "./EventsFiles/EventsList.jsx";


export default function Requirements({ showAccountNotice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddCenter, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

  const [centerDetails, setClinicDetails] = useState(Math.random());

  const [colors, setColors] = React.useState([
    "primary",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default", 
    "#303517",
]);

function skipToPage(pageNo, slideNo) {
  let mColors = [...colors];
  let cPage = currentPage;

  const prevPage = parseInt(cPage) - 1;
  const jumpIndex = pageNo - 1;

  mColors[prevPage] = "default";
  mColors[jumpIndex] = "primary";

  setCurrentPage(pageNo);
  setSlideNo(slideNo);
  setColors(mColors);
}
  const handleAddUser = () => {
    setShowAddUser(true)
    setControllable(Math.random())
  };

 const  handleCancelUser= () => {
  setClinicDetails(null)
    setShowAddUser(false)
    setControllable(Math.random())
  };

  const ToolbarData = [
    {
      Title: (
        <MDButton
          // style={{ width: "100%", height: "100%" }}
          // color={colors[0]}

          onClick={() => skipToPage(1, 0)}
        >
          Events Management
        </MDButton>
      ),
      Content: [
        <MDButton variant="text" color="info" onClick={() => skipToPage(1, 0)} fullWidth={true}>
          Events
        </MDButton>,
      ],
      RightIcons: [
        {
          icon: showAddCenter?<Cancel/>: <AddBox />,
          hint:showAddCenter? "Cancel": "Add Event",
          rightIconFunction:showAddCenter? handleCancelUser:handleAddUser,
          rightIconColor:showAddCenter? "error": "info",
        },
      ],
    },
  ];


const handleLoadDetails= (details) => {
  setClinicDetails(details)
  handleAddUser()
  
}


  return (
    <>
      <MDBox textAlign="center" px={2}>
        <CustomToolbar proceed={currentPage} slideNo={slideNo} toolbarData={ToolbarData} />

        {currentPage === 1 ? <EventsList
        centerDetails={centerDetails}
        handleLoadDetails={handleLoadDetails}
         handleClose={handleCancelUser} 
         showAddCenter={showAddCenter}
          key ={controllable} /> : null}


        
      </MDBox>
    </>
  );
}
