// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";
import FilterList from "@mui/icons-material/FilterList";

// Data
import MDEditor from "components/MDEditor";
import { useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";
import { verifyLength, removeTags } from "constants/methodConstants";
import { Alert } from "@mui/material";

import { getPositionStatus, getPermissions, createPosition } from "util/PermissionsUtil";

import { useSnackbar } from "notistack";
import NewTableBeta from "components/TableExport/NewTableBeta";
import { permissionsDummyData, positionStatusDummyData } from "data";

function PositionDetails(props) {
  // const { currentUser } = useContext(PermissionsContext);
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");

  const [statuses, setStatuses] = useState(positionStatusDummyData);

  const [title, setTitle] = useState("");
  const [titleState, setTitleState] = useState("");

  const [abbrev, setAbbrev] = useState("");
  const [abbrevState, setAbbrevState] = useState("");

  const [status, setStatus] = useState("");
  const [statusState, setStatusState] = useState("");

  const [permissions, setPermissions] = useState(permissionsDummyData);

  const [tableSelections, setTableSelections] = useState([]);

  const defaultHiddenColumnNames = [];

  const columns = [
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "actionPermission", title: "Right" },
    // { name: 'actions', title: 'Actions' },
  ];

  useEffect(() => {
    loadPositionStatus();
    loadPermissions();
  }, []);

  const loadPositionStatus = () => {
    getPositionStatus()
      .then((response) => {
        // console.log("Statuses => ", response);
        setStatuses(response);
      })
      .catch((error) => {
        setStatuses(positionStatusDummyData);
        // console.log("Statuses => ", error.message);
      });
  };

  const loadPermissions = () => {
    const MyData = {};
    getPermissions(MyData)
      .then((response) => {
        console.log("Permissions = => ", response);
        setPermissions(response);
      })
      .catch((error) => {
        setPermissions(permissionsDummyData);
        console.log("Permissions => ", error.message);
      });
  };

  const getSearchStatus = (_, newValue) => {
    setStatus(newValue);
    setStatusState("success");
  };

  const statusList = [];
  statuses?.map((option) => {
    statusList.push({ label: option.name, value: option.value });
    return 0;
  });

  const onChange = (e) => {
    const inputValue = e.target.value;

    switch (e.target.name) {
      case "title":
        setTitle(inputValue);
        if (verifyLength(inputValue, 3)) {
          setTitleState("success");
        } else {
          setTitleState("error");
        }
        break;
      case "abbrev":
        setAbbrev(inputValue);
        if (verifyLength(inputValue, 2)) {
          setAbbrevState("success");
        } else {
          setAbbrevState("error");
        }
        break;

      default:
        break;
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (titleState === "success" && abbrevState === "success" && statusState === "success") {
      return true;
    }

    if (titleState !== "success") {
      setTitleState("error");
      openSnackbar("Postion Title is invalid", "error");
    } else if (abbrevState !== "success") {
      setAbbrevState("error");
      openSnackbar("Abbreviation is invalid", "error");
    } else if (statusState !== "success") {
      setStatusState("error");
      openSnackbar("Status is invalid", "error");
    }

    return false;
  }

  const passSelection = (selection) => {
    setTableSelections(selection);
  };

  const handleSave = () => {
    let selectedPermissions = [];

    tableSelections.map((prop) => selectedPermissions.push(permissions[prop].id));

    const details = removeTags(editorValue);

    const PositionData = {
      details: details,
      abbrev: abbrev,
      positionStatus: status?.value,
      title: title,
      permissionsIds: selectedPermissions,
    };
    console.log("ApplicantBioData : ", PositionData);
    if (isValidated()) {
      createPosition(PositionData)
        .then((response) => {
          if (response.success) {
            props.handleCancelUser();
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error.message);
        });
    }
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
      return "Unknown";
    }
  };

  const data = permissions.map((prop, key) => {
    return {
      module: formatEnum(prop.module),
      subModule: formatEnum(prop.subModule),
      systemProcess: formatEnum(prop.systemProcess),
      actionPermission: formatEnum(prop.actionPermission),

      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton
              color="info"
              variant="text"
              // onClick={() => handleDelete(data.id)}
            >
              Edit
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });
  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5"></MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Title *"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Text"
              success={titleState === "success"}
              error={titleState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              label="Abbreviation"
              name="abbrev"
              value={abbrev}
              onChange={onChange}
              success={abbrevState === "success"}
              error={abbrevState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Autocomplete
              value={status}
              options={statusList}
              defaultValue={status}
              onChange={getSearchStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Status"
                  InputLabelProps={{ shrink: true }}
                  success={statusState === "success"}
                  error={statusState === "error"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Any other Relevant Details?&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor value={editorValue} onChange={setEditorValue} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Alert icon={<FilterList fontSize="inherit" />} severity={"warning"}>
              {"Select Position Permissions"}
            </Alert>
            <NewTableBeta
              rows={data}
              exportRow={data}
              columns={columns}
              exportColumns={columns}
              fileName={"Staff Positions"}
              passSelection={passSelection}
              // grouping={this.state.grouping}
              defaultHiddenColumnNames={defaultHiddenColumnNames}
            />
          </Grid>
        </Grid>
        <Grid container direction="row-reverse" mt={2}>
          <Grid item xs={12} sm={1}>
            <MDButton
              variant="gradient"
              color="success"
              size="small"
              fullWidth
              onClick={handleSave}
            >
              Save
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default PositionDetails;
