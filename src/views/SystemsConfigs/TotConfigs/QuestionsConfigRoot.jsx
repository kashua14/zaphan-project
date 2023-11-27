import React, { useEffect, useState } from "react";

import MDBox from "components/MDBox";

import MDButton from "components/MDButton/index.js";
import AddBox from "@mui/icons-material/AddBox";
import { getQuestionFrequency, getInputType } from "util/TotUtils";

import QuestionsList from "./QuestionFiles/QuestionsList.jsx";
import PageHeader from "components/PageHeader/index.js";
import { Card } from "@mui/material";
import { getTrainingQuestions } from "util/TotUtils.js";

export default function QuestionConfigMgt() {
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [questionFrequencies, setQuestionFrequencies] = useState([]);
  const [inputTypes, setInputTypes] = useState([]);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleLoadDetails = (details) => {
    setQuestionDetails(details);
    setShowAddQuestion(true);
  };

  const loadInputTypes = () => {
    getInputType()
      .then((response) => {
        setInputTypes(response);
      })
      .catch((error) => {
        console.log("loadStatusEnums => ", error.message);
      });
  };

  const loadQuestionFrequency = () => {
    getQuestionFrequency()
      .then((response) => {
        setQuestionFrequencies(response);
      })
      .catch((error) => {
        console.log("loadStatusEnums => ", error.message);
      });
  };

  const loadQuestions = () => {
    getTrainingQuestions()
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.log("getTrainingQuestion => ", error.message);
      });
  };

  useEffect(() => {
    loadQuestions();
    loadInputTypes();
    loadQuestionFrequency();
  }, []);

  return (
    <Card>
      <MDBox textAlign="center">
        <PageHeader
          title="ToT Question Management Configuration"
          showAlert
          actions={
            <MDButton
              fullWidth
              // size="large"
              color="success"
              onClick={() => setShowAddQuestion(true)}
              startIcon={<AddBox />}
            >
              Add Question
            </MDButton>
          }
        />

        {currentPage === 1 ? (
          <QuestionsList
            questions={questions}
            inputTypes={inputTypes}
            loadQuestions={loadQuestions}
            questionDetails={questionDetails}
            showAddQuestion={showAddQuestion}
            setQuestionDetails={setQuestionDetails}
            questionFrequencies={questionFrequencies}
            setShowAddQuestion={setShowAddQuestion}
            handleLoadDetails={handleLoadDetails}
          />
        ) : null}
      </MDBox>
    </Card>
  );
}
