import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Autocomplete, Card, Grid } from "@mui/material";
import MDTypography from "components/MDTypography";
import FormField from "components/FormField";
import MDButton from "components/MDButton";
import { LooksOne, LooksTwo } from "@mui/icons-material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MDBox from "components/MDBox";
import CustomDialog from "components/Dialog/CustomDialog";
// import { getMyProgramChoices, saveFirstChoiceData, saveSecondChoiceData } from "util/ProgramUtils";
import { useSnackbar } from "notistack";

import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  removeTags,
} from "constants/methodConstants";

function ProgramChoices({ setClearedProgrammeChoices }) {

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState("success");
  const [nameState, setNameState] = useState("success");

  const [studyTimeFirstChoice, setStudyTimeFirstChoice] = useState(null);
  const [programFirstChoice, setProgramFirstChoice] = useState(null);
  const [campusFirstChoice, setCampusFirstChoice] = useState(null);
  const [intakeFirstChoice, setIntakeFirstChoice] = useState(null);

  const [studyTimeChoiceState, setStudyTimeChoiceState] = useState("");
  const [programChoiceState, setProgramChoiceState] = useState("");
  const [campusChoiceState, setCampusChoiceState] = useState("");
  const [intakeChoiceState, setIntakeChoiceState] = useState("");
  const [studyTimeChoice, setStudyTimeChoice] = useState("");
  const [programChoice, setProgramChoice] = useState("");
  const [campusChoice, setCampusChoice] = useState("");
  const [intakeChoice, setIntakeChoice] = useState("");

  const [choice, setChoice] = useState("");
  const [showAddChoice, setShowAddChoice] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add Village");
  const openAddChoice = (action, clickedChoice) => {
    setShowAddChoice(true);
    setDialogTitle(`${action} ${clickedChoice} Village`);
    setChoice(action);
  };

  const closeAddChoice = () => {
    setChoice("");
    setShowAddChoice(false);
    setDialogTitle("Add Village");

    setProgramChoice(null);
    setCampusChoice(null);
    setStudyTimeChoice(null);
    setIntakeChoice(null);

    setProgramChoiceState("");
    setCampusChoiceState("");
    setStudyTimeChoiceState("");
    setIntakeChoiceState("");
  };

  const onChange = (e) => {
    const inputValue = e.target.value;
    const phoneValue = inputValue.replace("(", "").replace(")", "").replaceAll(" ", "");
    switch (e.target.name) {
      case "firstName":
        setName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNameState("success");
        } else {
          setNameState("error");
        }
        break;

      default:
        break;
    }
  };

  // function loadProgramChoices() {
  //   const ProgramChoiceRequest = {};
  //   getMyProgramChoices(ProgramChoiceRequest)
  //     .then((response) => {
  //       setClearedProgrammeChoices(
  //         response?.programFirstChoiceId !== null && response?.programSecondChoiceId !== null
  //       );
  //       setCampusFirstChoice({
  //         value: response?.campusFirstChoiceId ?? null,
  //         label: response?.campusFirstChoice ?? "",
  //       });
  //       setIntakeFirstChoice({
  //         value: response?.intakeFirstChoiceId ?? null,
  //         label: response?.intakeFirstChoice ?? "",
  //       });
  //       setProgramFirstChoice({
  //         value: response?.programFirstChoiceId ?? null,
  //         label: response?.programFirstChoice ?? "",
  //       });
  //       setStudyTimeFirstChoice({
  //         value: response?.studyTimeFirstChoiceId ?? null,
  //         label: response?.studyTimeFirstChoice ?? "",
  //       });

  //       setCampusSecondChoice({
  //         value: response?.campusSecondChoiceId ?? null,
  //         label: response?.campusSecondChoice ?? "",
  //       });
  //       setIntakeSecondChoice({
  //         value: response?.intakeSecondChoiceId ?? null,
  //         label: response?.intakeSecondChoice ?? "",
  //       });
  //       setProgramSecondChoice({
  //         value: response?.programSecondChoiceId ?? null,
  //         label: response?.programSecondChoice ?? "",
  //       });
  //       setStudyTimeSecondChoice({
  //         value: response?.studyTimeSecondChoiceId ?? null,
  //         label: response?.studyTimeSecondChoice ?? "",
  //       });

  //       if (response?.programFirstChoiceId === null) {
  //         openAddChoice("Add", "First");
  //       }
  //     })
  //     .catch((error) => {
  //       openAddChoice("Add", "First");
  //       console.log(error.message);
  //     });
  // }

  React.useEffect(() => {
    // loadProgramChoices();
  }, []);

  function getSearchSelect(selectedValue, stateName) {
    if (stateName !== null && stateName !== undefined) {
      switch (stateName) {
        case "programChoice":
          setProgramChoice(selectedValue);
          setProgramChoiceState("success");
          break;
        case "campusChoice":
          setCampusChoice(selectedValue);
          setCampusChoiceState("success");
          break;
        case "studyTimeChoice":
          setStudyTimeChoice(selectedValue);
          setStudyTimeChoiceState("success");
          break;
        case "intakeChoice":
          setIntakeChoice(selectedValue);
          setIntakeChoiceState("success");
          break;

        default:
          break;
      }
    }
  }

  const changeFirstChoiceChoice = (action, clickedChoice) => {
    setShowAddChoice(true);
    setDialogTitle(`${action} ${choice} Program Choice`);
    setChoice(action);

    setCampusChoice(campusFirstChoice ?? null);
    setIntakeChoice(intakeFirstChoice ?? null);
    setProgramChoice(programFirstChoice ?? null);
    setStudyTimeChoice(studyTimeFirstChoice ?? null);

    setCampusChoiceState(campusFirstChoice !== null ? "success" : "error");
    setIntakeChoiceState(intakeFirstChoice !== null ? "success" : "error");
    setProgramChoiceState(programFirstChoice !== null ? "success" : "error");
    setStudyTimeChoiceState(studyTimeFirstChoice !== null ? "success" : "error");
  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      programChoiceState === "success" &&
      campusChoiceState === "success" &&
      intakeChoiceState === "success" &&
      studyTimeChoiceState === "success"
    ) {
      return true;
    }
    if (studyTimeChoiceState !== "success") {
      setStudyTimeChoiceState("error");
      openSnackbar("Your country is invalid", "error");
    } else if (programChoiceState !== "success") {
      setProgramChoiceState("error");
      openSnackbar("Your marital status is invalid", "error");
    } else if (campusChoiceState !== "success") {
      setCampusChoiceState("error");
      openSnackbar("Your nationality is invalid", "error");
    } else if (intakeChoiceState !== "success") {
      setIntakeChoiceState("error");
      openSnackbar("Your salutation is invalid", "error");
    }
    return false;
  }
  // const handleSave = () => {
  //   const ProgramChoiceRequest = {
  //     studyTimeFirstChoice: studyTimeChoice?.value ?? null,
  //     programFirstChoice: programChoice?.value ?? null,
  //     campusFirstChoice: campusChoice?.value ?? null,
  //     intakeFirstChoice: intakeChoice?.value ?? null,
  //   };
  //   console.log("ProgramChoiceRequest : ", ProgramChoiceRequest);
  //   if (isValidated() && choice.toLowerCase() === "first") {
  //     saveFirstChoiceData(ProgramChoiceRequest)
  //       .then((response) => {
  //         if (response.success) {
  //           loadProgramChoices();
  //           closeAddChoice();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("saveFirstChoiceData-err : ", error.message);
  //       });
  //   } else if (isValidated() && choice.toLowerCase() === "second") {
  //     saveSecondChoiceData(ProgramChoiceRequest)
  //       .then((response) => {
  //         if (response.success) {
  //           loadProgramChoices();
  //           closeAddChoice();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("saveSecondChoiceData-err : ", error.message);
  //       });
  //   }
  // };

  const programsOptions = [];
  return (
    <Card id="programme-choices" sx={{ overflow: "visible", p: 2 }} mt={4}>
      <MDBox>
        <MDTypography variant="h5">VILLAGES</MDTypography>
      </MDBox>
      <Grid container>
        <Grid item sm={12} md={12} mt={2}>
          <Alert
            color="info"
            icon={<LooksOne fontSize="inherit" />}
            action={
              <MDButton
                color="info"
                size="small"
                startIcon={<AddLocationAltIcon fontSize="large" />}
                onClick={() =>
                  programFirstChoice === null
                    ? openAddChoice("Add", "")
                    : changeFirstChoiceChoice("Edit", "")
                }
              >
                Add Village
              </MDButton>
            }
          >
            List of All Villages
          </Alert>
        </Grid>
      </Grid>

      <CustomDialog
        title={dialogTitle}
        open={showAddChoice}
        titleBGColor={choice.toLowerCase() === "add" ? "info" : "warning"}
        handleClose={closeAddChoice}
        content={
          <Grid container spacing={3} mt={0}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                value={programChoice}
                defaultValue={programChoice}
                onChange={(_, selectedValue) => getSearchSelect(selectedValue, "programChoice")}
                options={programsOptions}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    isRequired
                    label="Village"
                    InputLabelProps={{ shrink: true }}
                    success={programChoiceState === "success"}
                    error={programChoiceState === "error"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                isRequired
                label="Name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Kasasira"
                success={nameState === "success"}
                error={nameState === "error"}
              />
            </Grid>
           
          </Grid>
        }
        dialogFooter={
          <MDButton
            // onClick={handleSave}
            variant="gradient"
            title="Close this dialog."
            color={choice.toLowerCase() === "add" ? "info" : "warning"}
          >
            Save
          </MDButton>
        }
      />
    </Card>
  );
}

ProgramChoices.propTypes = {
  // nextStep: PropTypes.string.isRequired,
  setClearedProgrammeChoices: PropTypes.func.isRequired,
};

export default ProgramChoices;
