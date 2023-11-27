// @mui material components
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import MDButton from "components/MDButton";
// import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import TableExport from "components/TableExport";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// Material Dashboard 2 PRO React examples
// import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { availableProgrammeList } from "util/ProgramUtils";
import Apply from "views/apply";
// import DefaultCell from "./components/DefaultCell";

// Data
// import dataTableData from "./data/dataTableData";

// const cell = (value) => <DefaultCell value={value} />;

// const cellButton = (value) => (
// <MDButton color="success" variant="text" size="sm" onClick={() => applyNow(value)}>
//   Apply Now
// </MDButton>
// );
function ProgramList() {
  const [programsAvailable, setProgramsAvailable] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("Program");
  const [currentPage, setCurrentPage] = useState(1);
  // const navigate = useNavigate();

  const tableColumns = [
    { name: "programme", title: "Programme" },
    { name: "intake", title: "Intakes" },
    { name: "actions", title: "Actions" },
    // {
    //   Header: "Programme",
    //   accessor: "programme",
    //   Cell: ({ value }) => cell(value),
    // },
    // {
    //   Header: "Details",
    //   accessor: "details",
    //   Cell: ({ value }) => cell(value),
    // },
    // {
    //   id: 3,
    //   Header: "Actions",
    //   Cell: ({ row }) => cellButton(row),
    // },
  ];

  const loadAvailablePrograms = () => {
    const AvailableProgramsRequest = {
      programTypeList: [3, 4, 1, 2, 7],
    };

    availableProgrammeList(AvailableProgramsRequest)
      .then((response) => {
        setProgramsAvailable(response);
      })
      .catch((error) => {
        console.log("availableProgrammeList => ", error.message);
      });
  };

  useEffect(() => {
    loadAvailablePrograms();
  }, []);

  const applyNow = (program) => {
    console.log("program => ", program);
    setCurrentPage(2);
    setSelectedProgram(program);
  };

  const rows = programsAvailable?.map((program) => ({
    id: program.id,
    programme: program.programme,
    intake: program.details,
    actions: (
      // we've added some custom button actions
      <Grid container justifyItems="center">
        <Grid item>
          <MDButton color="success" variant="text" onClick={() => applyNow(program)}>
            Apply Now
          </MDButton>
        </Grid>
      </Grid>
    ),
  }));

  return (
    <>
      {currentPage === 1 && (
        <Card>
          <MDBox pt={3} px={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Programs available at UCU
            </MDTypography>
            <MDTypography variant="button" color="text">
              You can apply for any programs listed below.
            </MDTypography>
          </MDBox>
          <TableExport columns={tableColumns} data={rows} canSearch />
        </Card>
      )}

      {currentPage === 2 && (
        <>
          <MDBox px={1} lineHeight={1}>
            <Grid container justifyContent="center">
              <Grid item sm={12} md={11}>
                <MDTypography variant="h5" fontWeight="medium">
                  {selectedProgram.programme}
                </MDTypography>
                <MDTypography variant="button" color="text">
                  {selectedProgram.details}
                </MDTypography>
              </Grid>
              <Grid item sm={12} md={1} sx={{ m: "auto" }}>
                <MDButton
                  size="small"
                  color="error"
                  startIcon={<ArrowBackIosNewIcon />}
                  onClick={() => setCurrentPage(1)}
                  fullWidth
                >
                  Back
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <Apply />
        </>
      )}
    </>
  );
}

export default ProgramList;
