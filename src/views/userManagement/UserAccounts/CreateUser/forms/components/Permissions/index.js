// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

import { useCallback, useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";

import { Alert } from "@mui/material";

import { FilterList } from "@mui/icons-material";

import {
  getUserPermissions,
  getPositionPermissions,
  createUserPermissions,
  deleteUserPermission,
} from "util/PermissionsUtil";
import NewTableBeta from "components/TableExport/NewTableBeta";
import CustomDialog from "components/Dialog/CustomDialog";

function BioInfo(props) {
  const [permissions, setPermissions] = useState([]);
  const [showAddChoice, setShowAddChoice] = useState(false);
  const [positionPermissions, setPositionPermissions] = useState([]);
  const [tableSelections, setTableSelections] = useState([]);

  const defaultHiddenColumnNames = [];
  const columns = [
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "actionPermission", title: "Right" },
    { name: "actions", title: "Actions" },
  ];

  const permissionsColumns = [
    { name: "title", title: "Position" },
    { name: "module", title: "Module" },
    { name: "systemProcess", title: "Process" },
    { name: "actionPermission", title: "Permission" },
    { name: "actions", title: "Actions" },
  ];

  const permissionsGrouping = [{ columnName: "title" }];

  const grouping = [{ columnName: "module" }];

  const loadPermissions = useCallback(() => {
    const MyData = {
      id: props.userId,
    };
    getUserPermissions(MyData)
      .then((response) => {
        console.log("Position Permissions = => ", response);
        setPermissions(response);
      })
      .catch((error) => {
        // alert()
        console.log("Permissions => ", error.message);
      });
  }, [props.userId]);

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  const loadPositionPermissions = () => {
    const MyData = {};
    getPositionPermissions(MyData)
      .then((response) => {
        console.log("Position Permissions = => ", response);
        setPositionPermissions(response);
      })
      .catch((error) => {
        // alert()
        console.log("Permissions => ", error.message);
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

  const closeAddChoice = () => {
    setShowAddChoice(false);
    setTableSelections([]);
  };

  const handleAddChoice = () => {
    setShowAddChoice(true);
    loadPositionPermissions();
  };

  const passSelection = (selection) => {
    setTableSelections(selection);

  };

  const handleSave = () => {
    let selectedPermissions = [];

    tableSelections.map((prop) =>
      selectedPermissions.push(positionPermissions[prop].permissionsDetails.id)
    );

    const MyData = {
      id: props.userId,
      permissionIds: selectedPermissions,
    };

    console.log("MyData = => ", MyData);
    createUserPermissions(MyData)
      .then((response) => {
        if (response.success) {
          closeAddChoice();
          loadPermissions();
        }
      })
      .catch((error) => {
        console.log("saveApplicantBioData-err : ", error.message);
      });
  };

  const handleDelete = (id) => {
    const MyData = {
      id: id,
    };
    deleteUserPermission(MyData)
      .then((response) => {
        if (response.success) {
          loadPermissions();
        }
      })
      .catch((error) => {
        console.log("saveApplicantBioData-err : ", error.message);
      });
  };

  const data = permissions.map((prop, key) => {
    return {
      module: formatEnum(prop.module),
      systemProcess: formatEnum(prop.systemProcess),
      actionPermission: formatEnum(prop.actionPermission),
      actions: (
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton color="error" variant="text" onClick={() => handleDelete(prop.id)}>
              Delete
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });

  const permissionsData = positionPermissions.map((prop, key) => {
    return {
      title: prop.title,
      module: formatEnum(prop.permissionsDetails.module),
      systemProcess: formatEnum(prop.permissionsDetails.systemProcess),
      actionPermission: formatEnum(prop.permissionsDetails.actionPermission),
    };
  });

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4}>
      <MDBox component="form" pb={3} px={3}>
        <Grid item xs={12} sm={12}>
          <Alert
            icon={<FilterList fontSize="inherit" />}
            severity={"warning"}
            action={
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                fullWidth
                onClick={handleAddChoice}
              >
                ADD PERMISSION
              </MDButton>
            }
          >
            {"User Permissions"}
          </Alert>
          {data.length > 0 ? (
            <NewTableBeta
              // key={myKey}
              rows={data}
              exportRow={data}
              columns={columns}
              exportColumns={columns}
              fileName={"Staff Positions"}
              passSelection={passSelection}
              grouping={grouping}
              defaultHiddenColumnNames={defaultHiddenColumnNames}
            />
          ) : null}
        </Grid>

        <CustomDialog
          maxWidth={"lg"}
          title={"Add User Permission"}
          open={showAddChoice}
          titleBGColor={"info"}
          handleClose={closeAddChoice}
          content={
            <Grid container spacing={3} mt={0}>
              {permissionsData.length > 0 ? (
                <NewTableBeta
                  rows={permissionsData}
                  exportRow={permissionsData}
                  columns={permissionsColumns}
                  exportColumns={permissionsColumns}
                  fileName={"Staff Positions"}
                  grouping={permissionsGrouping}
                  passSelection={passSelection}
                  // grouping={this.state.grouping}
                  // defaultHiddenColumnNames={defaultHiddenColumnNames}
                />
              ) : null}
            </Grid>
          }
          dialogFooter={
            <>
              {tableSelections.length > 0 ? (
                <MDButton
                  onClick={handleSave}
                  variant="gradient"
                  title="Close this dialog."
                  color={"info"}
                >
                  SUBMIT
                </MDButton>
              ) : null}
            </>
          }
        />
      </MDBox>
    </Card>
  );
}

// Typechecking props for the BioInfo

export default BioInfo;
