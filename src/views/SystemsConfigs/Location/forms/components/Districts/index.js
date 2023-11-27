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
import {  createDistrict, getCountries ,getDistricts} from "util/SystemsConfigsUtils";
import { useSnackbar } from "notistack";

import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  removeTags,
} from "constants/methodConstants";
import TableExport from "components/TableExport";

function ProgramChoices({ setClearedProgrammeChoices }) {

  const tableColumns = [
    { name: "name", title: "Name" },
    { name: "code", title: "Dial Code" }, 
    { name: "countryName", title: "Country" },    
    { name: "actions", title: "Actions" }     
  ];

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState("");
  const [nameState, setNameState] = useState("");
  const [id, setId] = useState("");

  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [country, setCountry] = useState("");
  const [countryState, setCountryState] = useState("");

  const [choice, setChoice] = useState("");
  const [showAddChoice, setShowAddChoice] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add District");


  const openAddChoice = (action, clickedChoice) => {
    setShowAddChoice(true);
    setDialogTitle(`${action} ${clickedChoice} District`);
    setChoice(action);
  };

  const closeAddChoice = () => {
    setChoice("");
    setShowAddChoice(false);
    setDialogTitle("Add District");

    setId("")
    setName("")
    setCode("")
    setCountry("")
    setCodeState("")
    setNameState("")
    setCountryState("") 


  };

  const onChange = (e) => {
    const inputValue = e.target.value;

    switch (e.target.name) {
      case "name":
        setName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNameState("success");
        } else {
          setNameState("error");
        }
        break;

        case "code":
        setCode(inputValue);
        if (verifyLength(inputValue, 2)) {
          setCodeState("success");
        } else {
          setCodeState("error");
        }
        break;

      default:
        break;
    }
  };

  React.useEffect(() => {
    loadCountries();
    loadDistricts()
  }, []);


  const loadCountries = () => {
    const CountryRequest = {
    };

    getCountries(CountryRequest)
      .then((response) => {
        // console.log("Country List => ", response);
        setCountries(response.countries);
      })
      .catch((error) => {
        // console.log("Country List => ", error.message);
      });
  };

  const loadDistricts = () => {
    const CountryRequest = {
    };

    getDistricts(CountryRequest)
      .then((response) => {
        console.log("District List => ", response);
        setDistricts(response);
      })
      .catch((error) => {
        console.log("District Error => ", error);
      });
  };

  

  function getSearchSelect(selectedValue, stateName) {
    if (stateName !== null && stateName !== undefined) {
      switch (stateName) {
        case "country":
          setCountry(selectedValue.value);
          setCountryState("success");
          break;
        default:
          break;
      }
    }
  }


  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      nameState === "success" &&
      codeState ==="success" &&
      countryState === "success"
    ) {
      return true;
    }
    if (nameState !== "success") {
      setNameState("error");
      openSnackbar("District Name  is invalid", "error");
    } else if (codeState !== "success") {
      setCodeState("error");
      openSnackbar("District Code is invalid", "error");
    } 
    else if (countryState !== "success") {
      setCodeState("error");
      openSnackbar("Country is invalid", "error");
    } 
    return false;
  }

  const handleEdit = (data) => {

    setShowAddChoice(true);
    setDialogTitle(`Edit District`);
    setId(data.id)
    setName(data.name)
    setCode(data.code)
    setCountry(data.countryId)
    setCodeState('success')
    setNameState('success')
    setCountryState('success')    
  };

  const handleSave = () => {

    // alert(nationality+"-"+dialCode)
    const CreateUserRequest = {
        id:id,
        countryId:country,
        name:name,
        code:code,
    };
    console.log("CreateUserRequest : ", CreateUserRequest);
    if (isValidated()) {
      createDistrict(CreateUserRequest)
        .then((response) => {
          if (response.success) {
             loadDistricts();
            closeAddChoice();
          }
        })
        .catch((error) => {
          console.log("saveCountry-err : ", error.message);
        });
    } else{
      console.log("saveCountry-err : ", "validation Error");
    }
    
  };

  const rows = districts.map((data) => ({
    id: data.id,
    name: data.name,
    countryName:data.countryName,
    code: data.code,    
    actions: (
      // we've added some custom button actions
      <Grid container justifyItems="center">
        <Grid item>
          <MDButton color="info" variant="text" onClick={() => handleEdit(data)}>
            Edit
          </MDButton>
        </Grid>
      </Grid>
    ),
  }));

  
  const countriesList = [];

  countries?.map((option) => {
    countriesList.push({ label: option.name, value: option.id });
    return 0;
  });

  return (
    <Card id="programme-choices" sx={{ overflow: "visible", p: 2 }} mt={4}>
      <MDBox>
        <MDTypography variant="h5">DISTRICTS</MDTypography>
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
                onClick={() => openAddChoice("Add", "") }
              >
                Add District
              </MDButton>
            }
          >
            List of All Districts
          </Alert>
          <TableExport columns={tableColumns} data={rows} canSearch />

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
                value={country}
                defaultValue={country}
                onChange={(_, selectedValue) => getSearchSelect(selectedValue, "country")}
                options={countriesList}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    isRequired
                    label="Country"
                    InputLabelProps={{ shrink: true }}
                    success={countryState === "success"}
                    error={countryState === "error"}
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
                placeholder="Text"
                success={nameState === "success"}
                error={nameState === "error"}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                isRequired
                label="Code"
                name="code"
                value={code}
                onChange={onChange}
                placeholder="Text"
                success={codeState === "success"}
                error={codeState === "error"}
              />
            </Grid>
          </Grid>
        }
        dialogFooter={
          <MDButton
            onClick={handleSave}
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
};

export default ProgramChoices;
