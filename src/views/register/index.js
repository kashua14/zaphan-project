import {  useState } from "react";
import GeneralLayout from "layouts/authentication/components/GeneralLayout";

import bgImage from "assets/img/hero-bg.jpeg";


import UserAccounts from "views/applications/Users";


export default function Register() {
  const [showAccountNotice, setShowAccountNotice] = useState(true);


  return (
    <GeneralLayout image={bgImage}>
      <UserAccounts showAccountNotice={showAccountNotice} />
    </GeneralLayout>
  );
}
