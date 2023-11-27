import { useContext, useEffect, useState } from "react";
import UserProfile from "./pages/userProfile";
import { CustomAppContext } from "context/MyAppProvider";
import LoadingIndicator from "components/LoadingIndicator";

export default function UserProfileMgt() {
  const currentPage = 1;
  const { state: currentUser, update } = useContext(CustomAppContext);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [currentUser]);
  
  return (
    <div>
      <LoadingIndicator loading={isLoading} />
      {currentPage === 1 && (
        <UserProfile setIsLoading={setIsLoading} dispatch={update} currentUser={currentUser} />
      )}
    </div>
  );
}
