import { Link } from "react-router-dom";

import { getCurrentUser } from "util/AuthUtils";

import React from "react";
import MDBox from "components/MDBox";

// Common Functions
export function removeCommas(str) {
  let strTemp = str ?? "";
  if (strTemp !== "") {
    while (strTemp.search(",") >= 0) {
      strTemp = `${strTemp}`.replace(",", "");
    }
    return Number(strTemp);
  }
  return "";
}

export function verifyMoney(money) {
  const numberRex = /^[0-9]+$/;
  if (numberRex.test(removeCommas(money))) {
    return true;
  }
  return false;
}

export function formatMoney(n) {
  if (n !== null && n !== undefined) {
    return n
      .toString()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}

export function formatEnum(enumValue) {
  if (enumValue !== null && enumValue !== undefined && enumValue !== "") {
    const frags = enumValue.toLowerCase().split("_");
    let i;
    for (i = 0; i < frags.length; i += 1) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  }
  return "Unknown";
}

// function that returns true if value is an integer, false otherwise
export function verifyNumber(value) {
  const numberRex = /^[0-9]+$/;
  const valueTemp = value ?? null;

  return valueTemp !== null && valueTemp !== "" && numberRex.test(value);
}

// function that verifies if a string has a given length or not
export function verifyLength(value, length) {
  const valueTemp = value ?? null;
  return valueTemp !== null && valueTemp.length >= length;
}

export function validateLength(value, length, maxLength) {
  const valueTemp = value ?? null;
  return valueTemp !== null && valueTemp.length >= length && valueTemp.length <= maxLength;
}

export function verifyEmail(value) {
  const emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
}

// verifyPhone
export function verifyPhone(value) {
  const valueTemp = value ?? "";

  // const phoneNo = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const phoneNo = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  return (
    valueTemp !== "" &&
    valueTemp.match(phoneNo) &&
    (valueTemp?.replace(/[^0-9]/g, "").length >= 12 ||
      valueTemp?.replace(/[^0-9]/g, "").length <= 20)
  );
}

export function phoneFormat(input) {
  // returns (###) ###-####
  let inputTemp = input.replace(/\D/g, "");
  const size = inputTemp.length;
  if (size > 0 && size <= 3) {
    inputTemp = `(+${inputTemp}`;
  } else if (size > 0 && size <= 6) {
    inputTemp = `(+${inputTemp.slice(0, 3)}) ${inputTemp.slice(3, 6)}`;
  } else if (size > 0) {
    inputTemp = `(+${inputTemp.slice(0, 3)}) ${inputTemp.slice(3, 6)} ${inputTemp.slice(
      6,
      9
    )} ${inputTemp.slice(9)}`;
  }

  return inputTemp;
}

export function renderText(textData) {
  const parser = new DOMParser();
  const el = parser.parseFromString(`<div>${textData}</div>`, "text/html");
  let link = null;
  el.querySelectorAll("a").forEach((a) => {
    const to = a.getAttribute("href");
    const text = a.innerText;
    const linkTo = `staff${to.split("staff")[1]}`;
    const finalLink = `/${linkTo}`;
    link = <Link to={finalLink}>{text}</Link>;
    a.replaceWith("");
  });
  return (
    <MDBox>
      <MDBox dangerouslySetInnerHTML={{ __html: el.body.innerHTML }} /> {link}
    </MDBox>
  );
}

export function numberWithCommas(x) {
  if (x !== null && x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}

export function showSignature(data) {
  if (data === null) {
    return <MDBox>No Signature Added</MDBox>;
  }
  return (
    <MDBox>
      <img
        id="testImage"
        style={{
          maxHeight: "50px",
          zIndex: -10,
          transform: data.includes("againromainvirgo") ? "rotate(0deg)" : "rotate(90deg)",
        }}
        src={data}
        alt="logo"
      />
      {/* <canvas id="canvas"></canvas> */}
    </MDBox>
  );
}

export async function permissions(module, submodule, process, permission, fx) {
  let userPermissions = [];
  let permitted = false;

  getCurrentUser()
    .then((response) => {
      userPermissions = response.permissions;

      if (userPermissions.length > 0) {
        userPermissions.map((access) => {
          if (
            access.module === module &&
            access.process === process &&
            access.permission === permission &&
            !permitted
          ) {
            permitted = true;
            fx();
          } else {
            console.log(`2show ${process} ${permitted}`);
          }
          return 0;
        });
      }

      return permitted;
    })
    .catch((error) => {
      console.log("Permissions Error - ", error.message);
      return permitted;
    });
}

export const getInitials = (name) => {
  let initials = "NN";
  if (name !== null && name.toUpperCase() !== "NONE") {
    initials = name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0);
  }
  return initials.toUpperCase();
};

export function capitalizeFirstLetter(string) {
  if (string !== null && string !== undefined && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
}

export function convertJSONToParams(json) {
  const params = [];
  for (const [key, value] of Object.entries(json)) {
    const answer = value.trim();
    const questionId = parseInt(key);
    const param = { questionId, answer };
    if (answer.toLowerCase() === "yes") {
      param.yesAnswer = true;
    }
    params.push(param);
  }
  return params;
}

export const capitalizeString = (x) =>
  typeof x === "string" && x !== null && x !== undefined ? x.toUpperCase() : x;

export function scrollToTopPage(pageId) {
  document.getElementById(pageId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function removeTags(str) {
  if (str === null || str === "") return false;

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

export function transformDataToJSON(data) {
  const json = {};
  for (const obj of data) {
    if (obj.answer !== null && obj.questionId !== null) {
      json[obj.questionId] = obj.answer;
    }
  }
  return json;
}

export function isPasswordValid(password) {
  // Check if the password has at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Check if the password contains at least one special character (e.g., !@#$%^&*)
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  // If all checks pass, the password is valid
  return true;
}

export function isNotNullOrEmpty(value) {
  return value !== null && value !== undefined && value !== "";
}
