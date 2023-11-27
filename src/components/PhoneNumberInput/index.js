import React from "react";
import PropTypes from "prop-types";
import { createTheme, InputLabel, ThemeProvider } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
// import PhoneNumberInputRoot from "./PhoneNumberInputRoot";
import "./index.css";

const theme = createTheme({
  components: {
    Input: {
      styleOverrides: {
        root: {
          border: 0,
          font: "inherit",
          height: "1.4375em",
          padding: "4px 0 5px",
          fontSize: "0.875rem",
          borderBottom: "1px solid #d2d6da",
          letterSpacing: "inherit",
        },
      },
    },
  },
});

function PhoneNumberInput({ onChange, value, label, required }) {
  const isValid = isPossiblePhoneNumber(value ?? "");
  return (
    <ThemeProvider theme={theme}>
      <InputLabel error={!isValid} focused shrink required={required}>
        {label}
      </InputLabel>
      <PhoneInput
        international
        value={value}
        defaultCountry="UG"
        placeholder="Enter phone number"
        countryCallingCodeEditable={false}
        error={isValid ? undefined : "Invalid phone number"}
        onChange={onChange}
      />
    </ThemeProvider>
  );
}

PhoneNumberInput.defaultProps = {
  label: "Phone number",
  required: true,
  value: "",
};

PhoneNumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default PhoneNumberInput;
