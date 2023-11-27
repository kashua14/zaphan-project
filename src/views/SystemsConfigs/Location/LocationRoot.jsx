import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import AddBox from "@mui/icons-material/AddBox";
import Cancel from "@mui/icons-material/Cancel";

import ClinicsList from "./forms";
import CustomCardHeader from "components/Card/CustomCardHeader";
import EditLocationIcon from '@mui/icons-material/EditLocation';

export default function Requirements({ showAccountNotice }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddPosition, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

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

  const handleCancelUser = () => {
    setShowAddUser(false)
    setControllable(Math.random())
  };





  return (
    <>
      <MDBox textAlign="center" px={2}>
        {/* <CustomToolbar proceed={currentPage} slideNo={slideNo} toolbarData={ToolbarData} /> */}
        <Card>
          <CustomCardHeader
            icon={<EditLocationIcon fontSize="large" style={{ color: "white" }} />}
            title={"LOCATIONS MANAGEMENT"} />
        </Card>

        {currentPage === 1 ? <ClinicsList showAddPosition={showAddPosition} key={controllable} /> : null}

      </MDBox>
    </>
  );
}
