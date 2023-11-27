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
import {  createCountry, getCountries } from "util/SystemsConfigsUtils";
import { useSnackbar } from "notistack";

import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  removeTags,
} from "constants/methodConstants";
import TableExport from "components/TableExport";

function Countries({  }) {

  const tableColumns = [
    { name: "name", title: "Name" },
    { name: "countryCode", title: "Code" },
    { name: "dialCode", title: "Dial Code" }, 
    { name: "nationality", title: "Nationality" }, 
    { name: "actions", title: "Actions" } 
    
  ];

  const [name, setName] = useState("");  
  const [nameState, setNameState] = useState("");

  const [choice , setChoice] = useState("");
  const [id , setId] = useState("");
  
  

  const [nationality, setNationality] = useState("");  
  const [nationalityState, setNationalityState] = useState("");

  const [dialCode, setDialCode] = useState("");  
  const [dialCodeState, setDialCodeState] = useState("");

  const [countryCode, setCountryCode] = useState("");  
  const [countryCodeState, setCountryCodeState] = useState("");

  const [showAddChoice, setShowAddChoice] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add Country");

  const [countries, setCountries] = useState([]);

  const openAddChoice = (action, clickedChoice) => {
    setShowAddChoice(true);
    setDialogTitle(`${action} Country`);
    setChoice(action);
  };

  const closeAddChoice = () => {
    setShowAddChoice(false);
    setDialogTitle("Add Country");

setId("")
setName("")
setNameState("")
setNationality("")
setNationalityState("")
setDialCode("")
setDialCodeState("")
setCountryCode("")
setCountryCodeState("")
  };

  const onChange = (e) => {
    const inputValue = e.target.value;

    console.log("value --==>",e.target.name)

    switch (e.target.name) {

      case "name":
        setName(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNameState("success");
        } else {
          setNameState("error");
        }
        break;

      case "nationality":
        setNationality(inputValue);
        if (verifyLength(inputValue, 3)) {
          setNationalityState("success");
        } else {
          setNationalityState("error");
        }
        break;
        
      case "dialCode":
          setDialCode(inputValue);
          if (verifyLength(inputValue, 3)) {
            setDialCodeState("success");
          } else {
            setDialCodeState("error");
          }
          break;
      case "countryCode":
        setCountryCode(inputValue);
        if (verifyLength(inputValue, 2)) {
          setCountryCodeState("success");
        } else {
          setCountryCodeState("error");
        }

        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = () => {
    const CountryRequest = {
    };

    getCountries(CountryRequest)
      .then((response) => {
        console.log("Country List => ", response);
        setCountries(response.countries);
      })
      .catch((error) => {
        console.log("Country List => ", error.message);
      });
  };

  const handleEdit = (data) => {
    setShowAddChoice(true);
    setDialogTitle(`Edit Country`);
    setChoice("edit");
    setId(data.id)
    setName(data.name)
    setNameState("success")
    setNationality(data.natinality)
    setNationalityState("success")
    setDialCode(data.dailCode)
    setDialCodeState("success")
    setCountryCode(data.code)
    setCountryCodeState("success")

   
  };

  const { enqueueSnackbar } = useSnackbar();
  function openSnackbar(message, color) {
    enqueueSnackbar(message, { variant: color });
  }

  function isValidated() {
    if (
      nameState === "success"  &&
      nationalityState === "success" &&
      dialCodeState === "success" &&
      countryCodeState === "success"
    ) {
      return true;
    }
    if (nameState !== "success") {
      setNameState("error");
      openSnackbar("Your Country Name is invalid", "error");
    } else if (nationalityState !== "success") {
      setNameState("error");
      openSnackbar("Nationality status is invalid", "error");
    } 

    else if (dialCodeState !== "success") {
      setDialCodeState("error");
      openSnackbar("Dial Code status is invalid", "error");
    } 
    else if (countryCodeState !== "success") {
      setCountryCodeState("error");
      openSnackbar("Country Code status is invalid", "error");
    } 
    
    return false;
  }
  const handleSave = () => {

    // alert(nationality+"-"+dialCode)
    const CreateUserRequest = {
        id:id,
        natinality:nationality,
        dailCode:dialCode,
        name:name,
        code:countryCode,
    };
    // console.log("CreateUserRequest : ", CreateUserRequest);
    if (isValidated()) {
      createCountry(CreateUserRequest)
        .then((response) => {
          if (response.success) {
             loadCountries();
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

  const rows = countries.map((data) => ({
    id: data.id,
    name: data.name,
    countryCode: data.code,
    nationality: data.natinality,
    dialCode: data.dailCode,
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

  return (
    <Card id="programme-choices" sx={{ overflow: "visible", p: 2 }} mt={4}>
      <MDBox>
        <MDTypography variant="h5">COUNTRIES</MDTypography>
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
                onClick={() => openAddChoice("Add", "")}
              >
                Add Country
              </MDButton>
            }
          >
            List of All Countries
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
                label="Nationality"
                name="nationality"
                value={nationality}
                onChange={onChange}
                placeholder="Text"
                success={nationalityState === "success"}
                error={nationalityState === "error"}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                isRequired
                label="Dial Code"
                name="dialCode"
                value={dialCode}
                onChange={onChange}
                placeholder="Text"
                success={dialCodeState === "success"}
                error={dialCodeState === "error"}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormField
                isRequired
                label="Country Code"
                name="countryCode"
                value={countryCode}
                onChange={onChange}
                placeholder="Text"
                success={countryCodeState === "success"}
                error={countryCodeState === "error"}
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

Countries.propTypes = {
  // nextStep: PropTypes.string.isRequired,
  // setClearedProgrammeChoices: PropTypes.func.isRequired,
};

export default Countries;
