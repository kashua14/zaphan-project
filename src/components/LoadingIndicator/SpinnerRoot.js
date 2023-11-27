import { useState } from "react";
import { ClapSpinner } from "react-spinners-kit";

function Spinner() {
  const [loading] = useState(true);

  return (
    <div className="sweet-loading">
      <ClapSpinner
        // color="#0288D1"
        loading={loading}
        cssOverride={{ display: "block", margin: "0 auto" }}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
