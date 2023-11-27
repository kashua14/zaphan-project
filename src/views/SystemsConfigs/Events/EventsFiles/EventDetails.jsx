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
import MDEditor from "components/MDEditor";
import { useContext, useEffect, useState } from "react";
// import MDDropzone from "components/MDDropzone";
import MDButton from "components/MDButton";
import {
  verifyPhone,
  verifyLength,
  phoneFormat,
  verifyEmail,
  removeTags,
} from "constants/methodConstants";
import { FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { sub,addYears  } from "date-fns";

import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { getCountries ,getDistricts} from "util/SystemsConfigsUtils";

import { getCategories,getStatus,createEvent} from "util/EventsUtils";

import GooglePlacesAutocomplete,{geocodeByPlaceId,getLatLng} from 'react-google-places-autocomplete';




function ClinicInfo(props) {
  
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");

  const [details, setDetails] = useState("");
  
  const [phoneState, setPhoneState] = useState("");  
  const [phone, setPhone] = useState("");
  
  const [id, setId] = useState(null);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState("");
  
  const [location, setLocation] = useState(null);
  const [locationState, setLocationState] = useState(null);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryState, setCategoryState] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const [startDateState, setStartDateState] = useState(null);
  const [endDateState, setEndDateState] = useState(null);

  const [registrationCloseDate, setRegistrationCloseDate] = useState(null);
  const [registrationCloseDateState, setRegistrationCloseDateState] = useState(null);

  const [title, setTitle] = useState("");
  const [titleState, setTitleState] = useState(null);

  const [status, setStatus] = useState("ACTIVE");
  const [statusState, setStatusState] = useState("success");
  const [statuses, setStatuses] = useState([]);

  const [myKey, setMyKey] = useState(Math.random());

  const suggestionDrawer = (suggestion) =>{

    geocodeByPlaceId(suggestion.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {

        // console.log("suggestionDrawer lat => ", suggestion.value.description);

        setLocation( suggestion.value.description )
        setLocationState("success")
  
        // this.setState({
        //   lat:lat,
        //   lng:lng,
        //   placeId :suggestion.value.place_id,
        //   location:suggestion.value.description,
        // });
        console.log("geoCodeByPlaceId lat => ", lat);
        console.log("geoCodeByPlaceId lng => ", lng);
      })
      .catch((error) => console.log("geoCodeByPlaceId err => ", error));
  }
 

  useEffect(() => {
    
    loadCategories()
    loadStatuses()

    if(props.centerDetails !== undefined && props.centerDetails !== null){
      loadDetails()
    }
    
  }, []);

  
  const loadDetails = () => {
   
    let data = props.centerDetails;

    // alert(data.details);

    
    setEmail(data.email)    
    setLocation(data.location)
    setPhone(data.phone)
    setEditorValue(data.details)
    setId(data.id)

    setTitle(data.eventTitle)
    setStatus(statusOptions.find((i)=> i.value === data.status)??null)
    setCategory(categoryOptions.find((i)=> i.value === data.categoryId)??null)
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setRegistrationCloseDate(data.registrationClose)

    setMyKey(Math.random())

    setEmailState("success");
    setPhoneState("success");
    setLocationState("success");
    setTitleState("success");
    setStatusState("success");
    setCategoryState("success");
    setStartDateState("success");
    setEndDateState("success");
    setRegistrationCloseDateState("success");

        
  };

  const loadStatuses = () => {
    getStatus()
      .then((response) => {
        setStatuses(response);
      })
      .catch((error) => {
        console.log("loadStatusEnums => ", error.message);
      });
  };

  const statusOptions = [];
  statuses?.map((option) => {
    statusOptions.push({ label: option.name, value: option.value });
    return 0;
  });

  const getSearchStatus = (_, newValue) => {
    setStatus(newValue);
    setStatusState("success");
  };

  
  const loadCategories = () => {
    
    getCategories()
    .then((response) => {
      setCategories(response);
    })
    .catch((error) => {
      console.log("loadReligiousAffiliationEnums => ", error.message);
    });
};


  const getSearchCategory = (_, newValue) => {

    console.log("getSearchCategory => ", newValue);
    setCategory(newValue);
    setCategoryState("success");
   
  };

  const categoryOptions = [];
  categories?.map((option) => {
    categoryOptions.push({ label: option.name, value: option.id });
    return 0;
  });



  const onChange = (e) => {
    const inputValue = e.target.value;
    const phoneValue = inputValue.replace("(", "").replace(")", "").replaceAll(" ", "");
    switch (e.target.name) {
      case "title":
        setTitle(inputValue);
        if (verifyLength(inputValue, 3)) {
          setTitleState("success");
        } else {
          setTitleState("error");
        }
        break;
     
      case "email":
        setEmail(inputValue);
        if (verifyEmail(inputValue)) {
          setEmailState("success");
        } else {
          setEmailState("error");
        }
        break;
      case "phone":
        setPhone(phoneFormat(inputValue));
        if (verifyPhone(phoneValue)) {
          setPhoneState("success");
        } else {
          setPhoneState("error");
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
    if (
      locationState === "success" &&
      emailState === "success" &&
      phoneState === "success" &&
      titleState === "success" &&
      statusState === "success" &&
      categoryState === "success" &&
      startDateState === "success" &&
      endDateState === "success" &&
      registrationCloseDateState === "success"

      
      ) {
      return true;
    }

   if (titleState !== "success") {
      setTitleState("error");
      openSnackbar("Title is invalid", "error");
    }
   else if (emailState !== "success") {
      setEmailState("error");
      openSnackbar("Center email is invalid", "error");
    } else if (phoneState !== "success") {
      setPhoneState("error");
      openSnackbar("Phone number is invalid", "error");
    } 
    else if (locationState !== "success") {
      setLocationState("error");
      openSnackbar("Location is invalid", "error");
    } 
    else if (statusState !== "success") {
      setStatusState("error");
      openSnackbar("Status is invalid", "error");
    }
    else if (categoryState !== "success") {
      setCategoryState("error");
      openSnackbar("Category is invalid", "error");
    }
    else if (startDateState !== "success") {
      setStartDateState("error");
      openSnackbar("Start Date is invalid", "error");
    }
    else if (endDateState !== "success") {
      setEndDateState("error");
      openSnackbar("End Date is invalid", "error");
    }
    else if (registrationCloseDateState !== "success") {
      setRegistrationCloseDateState("error");
      openSnackbar("Registration Close Date is invalid", "error");
    }

    return false;
  }

  const handleSave = () => {
    const details = removeTags(editorValue);
    const ClinicData = {
      id:id,
      eventTitle:title,  
      status: status?.value ?? null,
      categoryId: category?.value ?? null,
      startDate: startDate,
      endDate: endDate,
      registrationClose: registrationCloseDate,    
      email:email, 
      location:location,      
      details:details,
      phone:phone
    };
    console.log("ClinicData : ", ClinicData);
    if (isValidated()) {
      createEvent(ClinicData)
        .then((response) => {
          if (response.success) {
            // alert("")
            props.handleClose()
          }
        })
        .catch((error) => {
          console.log("saveApplicantBioData-err : ", error.message);
        });
    }
  };

  const maxDate = addYears(new Date(), 60);
  const minDate = sub(new Date(), { years: 60 });
  

  return (
    <Card id="bio-info" sx={{ overflow: "visible" }} mt={4} key={myKey}>
      <MDBox p={3}>
        <MDTypography variant="h5"></MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
         <Autocomplete
              value={category}
              options={categoryOptions}
              defaultValue={category}
              onChange={getSearchCategory}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Category"
                  // InputLabelProps={{ shrink: true }}
                  success={categoryState === "success"}
                  error={categoryState === "error"}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Event Title"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="Text"
              success={titleState === "success"}
              error={titleState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <Autocomplete
              value={status}
              defaultValue={status}
              options={statusOptions}
              onChange={getSearchStatus}
              renderInput={(params) => (
                <FormField
                  {...params}
                  isRequired
                  label="Status"
                  success={statusState === "success"}
                  error={statusState === "error"}
                />
              )}
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Email"
              name="email"
              value={email}
              variant="standard"
              onChange={onChange}
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              success={emailState === "success"}
              error={emailState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              name="phone"
              value={phone}
              label="Phone Number"
              onChange={onChange}
              placeholder="+256 735 631 620"
              // inputProps={{ type: "number" }}
              success={phoneState === "success"}
              error={phoneState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disableFuture
                  views={["year", "month", "day", "hours", "minutes"]}
                  inputFormat="DD MMM, YYYY hh:mm A"
                  label="Start Date"
                  openTo="month"
                  value={startDate}
                  // maxDate={maxDate}
                  // minDate={minDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setStartDate(new Date(newValue));
                    setStartDateState("success");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disableFuture
                  views={["year", "month", "day", "hours", "minutes"]}
                  inputFormat="DD MMM, YYYY hh:mm A"
                  label="End Date"
                  openTo="month"
                  value={endDate}
                  maxDate={maxDate}
                  minDate={startDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setEndDate(new Date(newValue));
                    setEndDateState("success");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // disableFuture
                  views={["year", "month", "day", "hours", "minutes"]}
                  inputFormat="DD MMM, YYYY hh:mm A"
                  label="Registration Close Date"
                  openTo="month"
                  value={registrationCloseDate}
                  maxDate={endDate}
                  onChange={(newValue) => {
                    // console.log("dob: ", new Date(newValue));
                    setRegistrationCloseDate(new Date(newValue));
                    setRegistrationCloseDateState("success");
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          

          <Grid item xs={12} sm={4}>
           {id !== null?<label style={{ fontSize: '17px' }}>Location:{location}</label>:null}
          <GooglePlacesAutocomplete
              value={location}
              selectProps={{
                onChange: suggestionDrawer,
              }}
              apiKey="AIzaSyCry7Y-3tfvSUvX86U3MpJoTUvCjKw9Wes"
              placeholder="Enter your destination"
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ug"],
                },
                types: ["establishment"],
              }}
              style={{ border: "none" }}
            />

            </Grid>
            
          
          <Grid item xs={12} sm={8}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Any other Details?&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor key={myKey} value={editorValue} onChange={setEditorValue} />
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

// Typechecking props for the ClinicInfo
ClinicInfo.propTypes = {
  
};

export default ClinicInfo;
