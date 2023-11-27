import React, { useState } from "react";

import { Autocomplete, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";

import NoDataCard from "components/FallBacks/NoDataCard";

import { useSnackbar } from "notistack";

import CustomDialog from "components/Dialog/CustomDialog";
import { deleteTrainingQuestion } from "util/TotUtils";

import TableExport from "components/TableExport";
import MDButton from "components/MDButton";
import { useConfirm } from "material-ui-confirm";
import { verifyLength } from "constants/methodConstants";
import { createTrainingQuestion } from "util/TotUtils";
import PropTypes from "prop-types";

function QuestionsList({
  questionDetails,
  showAddQuestion,
  setShowAddQuestion,
  handleLoadDetails,
  questionFrequencies,
  setQuestionDetails,
  loadQuestions,
  inputTypes,
  questions,
}) {
  const {
    id: idProp,
    // frequency: frequencyProp,
    // inputType: inputTypeProp,
    // question: questionProp,
  } = questionDetails ?? {};

  const inputTypeOptions = [];
  inputTypes?.map((option) => {
    inputTypeOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const questionFrequencyOptions = [];
  questionFrequencies?.map((option) => {
    questionFrequencyOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const inputTypeValue =
    inputTypeOptions.find(
      (i) => i.value.toLowerCase() === questionDetails?.inputType?.toLowerCase()
    ) ?? null;
  const questionFreq =
    questionFrequencyOptions.find(
      (i) => i.value.toLowerCase() === questionDetails?.frequency?.toLowerCase()
    ) ?? null;

  const [inputTypeState, setInputTypeState] = useState(inputTypeValue != null ? "success" : "");
  const [inputType, setInputType] = useState(inputTypeValue);
  const [frequency, setFrequency] = useState(questionFreq);
  const [frequencyState, setFrequencyState] = useState(questionFreq != null ? "success" : "");
  const [question, setQuestion] = useState(questionDetails?.question ?? null);
  const [questionState, setQuestionState] = useState(
    verifyLength(questionDetails?.question ?? "", 3) ? "success" : ""
  );

  const tableColumns = [
    { name: "question", title: "Question" },
    { name: "frequency", title: "Frequency" },
    { name: "inputType", title: "InputType" },
    { name: "actions", title: "Actions" },
  ];

  const closeQuestionDialog = () => {
    setShowAddQuestion(false);
    setQuestionDetails(null);
    setInputType(null);
    setFrequency(null);
    setQuestion("");
    setInputTypeState("");
    setFrequencyState("");
    setQuestionState("");
  };

  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();

  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      inputTypeState === "success" &&
      frequencyState === "success" &&
      questionState === "success"
    ) {
      return true;
    }

    if (inputTypeState !== "success") {
      setInputTypeState("error");
      openSnackbar("Input type is invalid", "error");
    }
    if (frequencyState !== "success") {
      setFrequencyState("error");
      openSnackbar("Question frequency is invalid", "error");
    }
    if (questionState !== "success") {
      setQuestionState("error");
      openSnackbar("Question is invalid", "error");
    }

    return false;
  }

  const getSearchInputType = (_, newValue) => {
    setInputType(newValue);
    setInputTypeState("success");
  };

  const getSearchFrequencyOptions = (_, newValue) => {
    setFrequency(newValue);
    setFrequencyState("success");
  };

  const onChange = (e) => {
    const inputValue = e.target.value;
    switch (e.target.name) {
      case "question":
        setQuestion(inputValue);
        if (verifyLength(inputValue, 3)) {
          setQuestionState("success");
        } else {
          setQuestionState("error");
        }
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    const QuestionData = {
      id: idProp ?? null,
      inputType: inputType?.value ?? null,
      frequency: frequency?.value ?? null,
      question: question,
    };
    // console.log("QuestionData : ", QuestionData);
    if (isValidated()) {
      confirm({
        title: `Save Question`,
        description: "You are about to save the question details. Do you want to continue?",
        confirmationText: "Continue",
        confirmationButtonProps: { variant: "text", color: "primary" },
      })
        .then(() => {
          createTrainingQuestion(QuestionData)
            .then((response) => {
              if (response.success) {
                loadQuestions();
                closeQuestionDialog();
              }
            })
            .catch((error) => {
              console.log("createTrainingQuestion-err : ", error.message);
            });
        })
        .catch(() => {
          console.log("Deletion cancelled.");
        });
    }
  };

  const handleDelete = (id) => {
    const ClinicData = {
      id: id,
    };
    confirm({
      title: `Delete Question`,
      description: "You are about to delete this question from the database. Are you sure?",
      confirmationText: "Delete",
      confirmationButtonProps: { variant: "text", color: "primary" },
    })
      .then(() => {
        deleteTrainingQuestion(ClinicData)
          .then((response) => {
            if (response.success) {
              closeQuestionDialog();
              loadQuestions();
            }
          })
          .catch((error) => {
            console.log("saveApplicantBioData-err : ", error.message);
          });
      })
      .catch(() => {
        console.log("Deletion cancelled.");
      });
  };

  const rows = questions.map((data) => {
    return {
      question: data.question,
      frequency: data.frequency,
      inputType: data.inputType,
      actions: (
        // we've added some custom button actions
        <Grid container justifyItems="center">
          <Grid item>
            <MDButton color="info" variant="text" onClick={() => handleLoadDetails(data)}>
              Edit
            </MDButton>
            <MDButton color="error" variant="text" onClick={() => handleDelete(data.id)}>
              Delete
            </MDButton>
          </Grid>
        </Grid>
      ),
    };
  });

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={12}>
        {/* <Alert
          icon={<FilterList fontSize="inherit" />}
          severity={showAddCenter ? "info" : "warning"}
        >
          {showAddCenter ? "Question Details" : "Below is a list of Questions "}
        </Alert> */}
        <MDBox>
          {rows.length > 0 ? (
            <TableExport columns={tableColumns} data={rows} canSearch />
          ) : (
            <NoDataCard title="No Questions found!" />
          )}
        </MDBox>
      </Grid>

      {showAddQuestion && (
        <CustomDialog
          maxWidth={"lg"}
          // scroll={"body"}
          title={"Add Question Details"}
          open={showAddQuestion}
          titleBGColor={"info"}
          handleClose={() => closeQuestionDialog()}
          content={
            <Grid container spacing={3} pt={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  isRequired
                  fullWidth
                  variant="standard"
                  label="Question Name"
                  name="question"
                  value={question ?? "fwfwf"}
                  onChange={onChange}
                  placeholder="Text"
                  success={questionState === "success"}
                  error={questionState === "error"}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  value={inputType ?? inputTypeValue ?? null}
                  options={inputTypeOptions}
                  onChange={getSearchInputType}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value ||
                    option?.label?.toLowerCase() === value?.label?.toLowerCase()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      isRequired
                      variant="standard"
                      label="Category Status"
                      success={inputTypeState === "success"}
                      error={inputTypeState === "error"}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  value={frequency ?? questionFreq ?? null}
                  options={questionFrequencyOptions}
                  onChange={getSearchFrequencyOptions}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value ||
                    option?.label?.toLowerCase() === value?.label?.toLowerCase()
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      isRequired
                      variant="standard"
                      label="Question Frequency"
                      success={frequencyState === "success"}
                      error={frequencyState === "error"}
                    />
                  )}
                />
              </Grid>
            </Grid>
          }
          dialogFooter={
            <MDButton color="success" onClick={handleSave}>
              Save
            </MDButton>
          }
        />
      )}
    </Grid>
  );
}

QuestionsList.propTypes = {
  loadQuestions: PropTypes.func.isRequired,
  questionDetails: PropTypes.objectOf(PropTypes.any),
  showAddQuestion: PropTypes.bool.isRequired,
  setShowAddQuestion: PropTypes.func.isRequired,
  handleLoadDetails: PropTypes.func.isRequired,
  questionFrequencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
  inputTypes: PropTypes.arrayOf(PropTypes.any).isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default QuestionsList;
