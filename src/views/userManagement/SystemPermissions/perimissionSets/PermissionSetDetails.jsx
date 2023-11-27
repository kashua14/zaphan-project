// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "components/FormField";

// Data
import { useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";

import { sub } from "date-fns";

import {
  getSystemModule,
  getSystemProcess,
  getActionPermission,
  createPermissionSet,
} from "util/PermissionsUtil";

import { useSnackbar } from "notistack";
import { systemProcessDummyData, systemModuleDummyData, actionPermissionDummyData } from "data";

function BioInfo(props) {
  const [systemModule, setSystemModule] = useState("");
  const [systemModuleState, setSystemModuleState] = useState("");

  const [modules, setModules] = useState(systemModuleDummyData);

  const [process, setProcess] = useState("");
  const [processState, setProcessState] = useState("");

  const [processes, setProcesses] = useState(systemProcessDummyData);

  const [permission, setPermission] = useState([]);

  const [permissionsState, setPermissionsState] = useState("");

  const [permissions, setPermissions] = useState(actionPermissionDummyData);

  useEffect(() => {
    loadSystemModule();
    loadProcess();
    loadPermission();
  }, []);

  const loadSystemModule = () => {
    getSystemModule()
      .then((response) => {
        setModules(response);
      })
      .catch((error) => {
        setModules(systemModuleDummyData);
        console.log("loadSystemModule => ", error.message);
      });
  };

  const loadProcess = () => {
    getSystemProcess()
      .then((response) => {
        setProcesses(response);
      })
      .catch((error) => {
        setProcesses(systemProcessDummyData);
        console.log("loadProcess => ", error.message);
      });
  };
  const loadPermission = () => {
    getActionPermission()
      .then((response) => {
        setPermissions(response);
      })
      .catch((error) => {
        setPermissions(actionPermissionDummyData);
        console.log("loadPermission => ", error.message);
      });
  };

  const getSearchSystemModule = (_, newValue) => {
    setSystemModule(newValue);
    setSystemModuleState("success");
  };

  const getSearchProcess = (_, newValue) => {
    setProcess(newValue);
    setProcessState("success");
  };

  const getSearchPermissions = (_, newValue) => {
    setPermission(newValue);
    setPermissionsState("success");
  };

  const modulesList = [];
  modules?.map((option) => {
    modulesList.push({ label: option.name, value: option.value });
    return 0;
  });

  const processesList = [];
  processes?.map((option) => {
    processesList.push({ label: option.name, value: option.value });
    return 0;
  });

  let permissionsList = [];
  permissions?.map((option) => {
    permissionsList.push({ label: option.name, value: option.value });
    return 0;
  });

  permissionsList = [...new Set(permissionsList)];

  console.log("permissionsList : ", permissionsList);

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      systemModuleState === "success" &&
      processState === "success" &&
      permissionsState === "success"
    ) {
      return true;
    }

    if (systemModuleState !== "success") {
      systemModuleState("error");
      openSnackbar("Select System Module", "error");
    } else if (processState !== "success") {
      processState("error");
      openSnackbar("Select System Process", "error");
    } else if (permissionsState !== "success") {
      setPermissionsState("error");
      openSnackbar("Select Permission(s)", "error");
    }
    return false;
  }

  const handleSave = () => {
    const PermissionsData = {
      module: systemModule?.value ?? null,
      systemProcess: process?.value ?? null,
      actionPermissions: permission.flatMap((e) => e.value),
    };
    console.log("PermissionsData : ", PermissionsData);
    if (isValidated()) {
      createPermissionSet(PermissionsData)
        .then((response) => {
          console.log("saveApplicantBioData-err : ", response);
          if (response.success) {
            openSnackbar(response.message, "success");
            props.handleCancelUser();
          } else {
            openSnackbar(response.message, "error");
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error.message);
        });
    }
  };

  const maxDate = sub(new Date(), { years: 10 });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox p={3}>
        <MDTypography variant="h5"></MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={systemModule}
              options={modulesList}
              defaultValue={systemModule}
              onChange={getSearchSystemModule}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Select Module"
                  InputLabelProps={{ shrink: true }}
                  success={systemModuleState === "success"}
                  error={systemModuleState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={process}
              options={processesList}
              defaultValue={process}
              onChange={getSearchProcess}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Select Process "
                  InputLabelProps={{ shrink: true }}
                  success={processState === "success"}
                  error={processState === "error"}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              value={permission}
              options={permissionsList}
              defaultValue={permission}
              onChange={getSearchPermissions}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="Select Permission(s) "
                  InputLabelProps={{ shrink: true }}
                  success={permissionsState === "success"}
                  error={permissionsState === "error"}
                />
              )}
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

// Typechecking props for the BioInfo

export default BioInfo;
