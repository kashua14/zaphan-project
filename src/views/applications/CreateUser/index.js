import React from "react";
import MDBox from "components/MDBox";

import Forms from "./forms";

export default function AccountNoticeDialog(props) {
  return (
    <MDBox>
      <Forms
        applicationDetails={props.applicationDetails}
        handleCancelUser={props.handleCancelUser}
        staff={props.staff}
        userDetails={props.userDetails}
      />
    </MDBox>
  );
}
