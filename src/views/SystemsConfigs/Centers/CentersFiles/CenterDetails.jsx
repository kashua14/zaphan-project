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
import { sub } from "date-fns";

import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { getCountries ,getDistricts,createCenter} from "util/SystemsConfigsUtils";
import GooglePlacesAutocomplete,{geocodeByPlaceId,getLatLng} from 'react-google-places-autocomplete';




function ClinicInfo(props) {
  
  const [editorValue, setEditorValue] = useState("<p><br><br><br><br><br></p>");

  const [details, setDetails] = useState("");
  const [districtState, setDistrictState] = useState("");
  const [phoneState, setPhoneState] = useState("");
  const [codeState, setCodeState] = useState("");

  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  
  
  

  const [phone, setPhone] = useState("");
  const [abbrev, setAbbrev] = useState("");

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [id, setId] = useState(null);

  const [email, setEmail] = useState("");
  
  const [location, setLocation] = useState(null);
  const [locationState, setLocationState] = useState(null);

  const [myKey, setMyKey] = useState(0);

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
    

    if(props.centerDetails !== undefined && props.centerDetails !== null){
      loadDetails()
    }
    
  }, []);

  
  const loadDetails = () => {
   
    let data = props.centerDetails;

    // alert(data.details);

    setName(data.name)
    setCode(data.code)
    setEmail(data.email)    
    setLocation(data.location)
    setPhone(data.phone)
    setEditorValue(data.details)
    setId(data.id)
    // setMyKey(Math.random())


    setNameState("success");
    setCodeState("success");
    setEmailState("success");
    setPhoneState("success");
    setLocationState("success");
        
  };


//   const loadCountries = () => {
//     const MyRequest={}
//   getCountries(MyRequest)
//     .then((response) => {
//       setCountries(response);
//     })
//     .catch((error) => {
//       console.log("loadReligiousAffiliationEnums => ", error.message);
//     });
// };
// const loadDistricts = () => {
//   const MyRequest={}
//   getDistricts(MyRequest)
//     .then((response) => {     
//       // console.log("DistrictsList => ", response);
//       setDistricts(response);
//     })
//     .catch((error) => {
//       console.log("loadReligiousAffiliationEnums => ", error.message);
//     });
// };

  // const getSearchCountry = (_, newValue) => {
  //   setCountry(newValue);
  //   setCountryState("success");
   
  // };

  // const getSearchDistrict = (_, newValue) => {
  //   setDistrict(newValue);
  //   setDistrictState("success");
  // };


  const onChange = (e) => {
    const inputValue = e.target.value;
    const phoneValue = inputValue.replace("(", "").replace(")", "").replaceAll(" ", "");
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
        if (verifyLength(inputValue, 3)) {
          setCodeState("success");
        } else {
          setCodeState("error");
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
      codeState === "success" &&
      emailState === "success" &&
      phoneState === "success" &&
      nameState === "success" 
      ) {
      return true;
    }

   if (nameState !== "success") {
      setNameState("error");
      openSnackbar("Center Name is invalid", "error");
    }
   else if (codeState !== "success") {
      setCodeState("error");
      openSnackbar("Center Code is invalid", "error");
    } else if (emailState !== "success") {
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
    return false;
  }

  const handleSave = () => {
    const details = removeTags(editorValue);
    const ClinicData = {
      id:id,
      name:name,
      code:code,
      email:email, 
      location:location,      
      details:details,
      phone:phone
    };
    console.log("ClinicData : ", ClinicData);
    if (isValidated()) {
      createCenter(ClinicData)
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

    // 0776045607


  

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
              label="Center Name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Text"
              success={nameState === "success"}
              error={nameState === "error"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormField
              isRequired
              label="Center Code"
              name="code"
              value={code}
              onChange={onChange}
              placeholder="code"
              success={codeState === "success"}
              error={codeState === "error"}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
           {id !== null?<label>Location:{location}</label>:null}
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
         
         
          {/* <Grid item xs={12} sm={4}>
            <Autocomplete
              value={district}
              options={districtsList}
              defaultValue={district}
              onChange={getSearchDistrict}
              renderInput={(params) => (
                <FormField
                  {...params}
                  label="District "
                  InputLabelProps={{ shrink: true }}
                  success={districtState === "success"}
                  error={districtState === "error"}
                />
              )}
            />
          </Grid> */}
        

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
