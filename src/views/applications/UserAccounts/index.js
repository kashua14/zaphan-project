import React, { useState, useEffect } from "react";

import { Alert, Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import { addReviewer, getReviewers ,deleteReviewer,getReviewerAccounts} from "util/ApplicationUtils";

import FilterList from "@mui/icons-material/FilterList";

import CustomToolbar from "components/Toolbar/CustomToolbar.jsx";
import MDButton from "components/MDButton/index.js";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Cancel from "@mui/icons-material/Cancel";
import TableExport from "components/TableExport";

import Users from "./Pages/Users.jsx";
import CustomDialog from "components/Dialog/CustomDialog.jsx";
import FormField from "components/FormField/index.js";
import { useSnackbar } from "notistack";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";

export default function Requirements() {
  const [currentPage, setCurrentPage] = useState(1);
  const [slideNo, setSlideNo] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [controllable, setControllable] = useState(Math.random());

  const [userDetails, setUserDetails] = useState("");
  const [patientName, setPatientName] = useState("");
  const [loadData, setLoadData] = useState(false);
  const [staff, setStaff] = useState(false);

  const [applicationDetails, setApplicationDetails] = useState(null);

  const [showAddChoice, setShowAddChoice] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add Reviewer(s)");

  const [reviewers, setReviewers] = useState([]);
  const [reviewersState, setReviewersState] = useState("error");
  const [users, setUsers] = useState([]);

  const [deadline, setDeadline] = useState(null);
  const [deadlineState, setDeadlineState] = useState("error");

  const [assignedReviewers, setAssignedReviewers] = useState([]);

  const tableColumns = [
    { name: "name", title: "Name" },
    { name: "deadline", title: "Deadline" },
    { name: "recommendation", title: "Recommendation" },
    { name: "actions", title: "Actions" },
  ];

  const colors = [
    "primary",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "default",
    "#303517",
  ];

  const handleAddUser = () => {
    setShowAddUser(true);
    setControllable(Math.random());
  };

  useEffect(() => {
    loadUsers(staff);
  }, [staff]);

  const loadReviewers = (check) => {
    const CountryRequest = {
      id: check,
    };

    getReviewers(CountryRequest)
      .then((response) => {
        console.log("Reviewers  List => ", response);
        setAssignedReviewers(response);
        if(response !== undefined && response.length>0) {
        handleAddChoice();
        }
      })
      .catch((error) => {
        // console.log("Country List => ", error.message);
      });
  };

  const loadUsers = (check) => {
    const CountryRequest = {
      userType: "STAFF",
    };

    getReviewerAccounts(CountryRequest)
      .then((response) => {
        console.log("Users List => ", response);
        setUsers(response);
      })
      .catch((error) => {
        // console.log("Country List => ", error.message);
      });
  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  const handleCancelUser = () => {
    setLoadData(false);
    setShowAddUser(false);
    setControllable(Math.random());
    setUserDetails("");
  };

  const closeAddChoice = () => {
    setShowAddChoice(false);
    setReviewers([]);
    setAssignedReviewers([]);
    setReviewersState("error");
    setDeadlineState("error");
    setDeadline(null);
  };

  const handleAddChoice = () => {
    setShowAddChoice(true);
  };

  const getSearchSelect = (_, newValue) => {
    console.log("Selected reviewers    ====> ", newValue);
    setReviewers(newValue);
    setReviewersState("success");
  };

  const reviewersList = [];
  users?.map(({ fullname, userId, email }) => {
    reviewersList.push({ label: fullname + "(" + email + ")", value: userId });
    return 0;
  });

  const ToolbarData = [
    {
      Title: (
        <MDButton
          onClick={() => skipToPage(1, 0)}
        >
          Incubation Applications
        </MDButton>
      ),
      Content: [
        <MDButton variant="text" color="info" onClick={() => skipToPage(1, 0)} fullWidth={true}>
          Applications
        </MDButton>,
      ],
      RightIcons: [
        {
          icon: showAddUser ? <PersonAddAltIcon /> : null,
          hint: showAddUser ? "Add Reviewer" : null,
          rightIconFunction: handleAddChoice,
          rightIconColor: "info",
        },
        {
          icon: showAddUser ? <Cancel /> : null,
          hint: showAddUser ? "Cancel" : null,
          rightIconFunction: showAddUser ? handleCancelUser : handleAddUser,
          rightIconColor: showAddUser ? "error" : "info",
        },
      ],
    },
  ];

  function skipToPage(pageNo, slideNo) {
    let cPage = currentPage;
    const prevPage = parseInt(cPage) - 1;
    const jumpIndex = pageNo - 1;

    colors[prevPage] = "default";
    colors[jumpIndex] = "primary";

    setCurrentPage(pageNo);
    setSlideNo(slideNo);
  }

  const loadUserDetails = (data, sta, isRev) => {
    setUserDetails(data);
    setPatientName(data.fullname);
    loadReviewers(data.id);
    if (!isRev) {
   
      setLoadData(true);
      setShowAddUser(true);
      handleAddUser();
      setStaff(data.type === "PERSONAL" ? false : true);
    }
  };

  function isValidated() {
    if (reviewers.length > 0 && deadlineState === "success") {
      return true;
    }

    if (reviewers.length === 0) {
      openSnackbar(" Add atleast one reviewer", "error");
      setReviewersState("error");
    }
    if (deadlineState !== "success") {
      openSnackbar(" Select a valid deadline", "error");
      setDeadlineState("error");
    }
    return false;
  }

  const handleSave = () => {
    const selectedReviewerIds = reviewers.map((reviewer) => reviewer.value);

    // Use a Set to remove duplicate ids and then convert it back to an array
    const uniqueReviewerIds = [...new Set(selectedReviewerIds)];
    const ReviewerRequest = {
      reviewers: uniqueReviewerIds,
      id: userDetails.id,
      deadline: deadline,
    };

    console.log("ReviewerRequest ====> ", ReviewerRequest);

    if (isValidated()) {
      if (reviewers.length === 0) {
        openSnackbar(" Add atleast one reviewer", "error");
        setReviewersState("error");
      } else {
        addReviewer(ReviewerRequest)
          .then((response) => {
            console.log("ReviewerRequest List => ", response);
            closeAddChoice();
          })
          .catch((error) => {
            // console.log("Country List => ", error.message);
          });
      }
    }
  };

  const handleDelete = (data) => {

    const ReviewerRequest = {
      id:data,
    };

   
    deleteReviewer(ReviewerRequest)
    .then((response) => {
      console.log("ReviewerRequest List => ", response);
      loadReviewers(userDetails.id)
    })
    .catch((error) => {
      // console.log("Country List => ", error.message);
    });
  };

  const getDates =  (startDateString) => {
    let startDate = new Date(startDateString);
    return format(startDate, 'EEE dd MMM yyyy hh:mm a');
  }
  const formatEnum = (enumValue) =>{
    if(enumValue !== null && enumValue !== undefined && enumValue !== ""){
      var frags = enumValue.toLowerCase().split('_');
      var i;
      for (i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
    else{
      return "Unkown"
    }
  }

  const rows = assignedReviewers.map((data) => ({
    name: data.fullname+" ("+data.email+")",
    deadline: getDates(data.deadline),
    recommendation: formatEnum(data.recommendation),
    actions: (
      // we've added some custom button actions
      <Grid container justifyItems="center">
        <Grid item>
          <MDButton color="info" variant="text">
            Remind
          </MDButton>
          <MDButton color="error" variant="text" onClick={() => handleDelete(data.id)}>
            Delete
          </MDButton>
        </Grid>
      </Grid>
    ),
  }));

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
            pStaff={staff}
            pStaffSet={setStaff}
            handleAddUser={handleAddUser}
            showAddUser={showAddUser}
            applicationDetails={applicationDetails}
            setApplicationDetails={setApplicationDetails}
            key={controllable}
          />
        ) : null}
      </MDBox>
      {/* 637506  */}
      <CustomDialog
        maxWidth={assignedReviewers.length > 0 ? "lg" : "md"}
        title={dialogTitle}
        open={showAddChoice}
        titleBGColor={"info"}
        handleClose={closeAddChoice}
        content={
          <Grid container spacing={3} mt={0}>

             {assignedReviewers.length > 0 ?
            <Grid item xs={12} sm={12}>
              <Alert icon={<FilterList fontSize="inherit" />} severity={"success"}>
                {
                  "Below the assigned reviewers for this application. You can delete a reviewer by clicking on the delete button.  "
                }
              </Alert>
            </Grid>:null}

            {assignedReviewers.length > 0 ? (
              <Grid item xs={12} sm={12}>
                <TableExport columns={tableColumns} data={rows} />
              </Grid>
            ) : null}

            <Grid item xs={12} sm={12}>
              <Alert icon={<FilterList fontSize="inherit" />} severity={"info"}>
                {
                  "Select Reviewer(s) to add to the application. An email will be sent to the selected reviewer(s) to review the application."
                }
              </Alert>
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month", "day"]}
                    inputFormat="DD MMM, YYYY"
                    label="Review Deadline"
                    openTo="year"
                    value={deadline}
                    // maxDate={maxDate}
                    minDate={new Date()}
                    onChange={(newValue) => {
                      // console.log("dob: ", new Date(newValue));
                      setDeadline(new Date(newValue));
                      setDeadlineState("success");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete
                multiple
                value={reviewers}
                options={reviewersList}
                onChange={getSearchSelect}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    isRequired
                    label=" Select Reviewer(s)"
                    success={reviewersState === "success"}
                    error={reviewersState === "error"}
                    // InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          </Grid>
        }
        dialogFooter={
          <MDButton
            onClick={handleSave}
            variant="gradient"
            title="Close this dialog."
            color={"info"}
          >
            Save
          </MDButton>
        }
      />
    </>
  );
}
