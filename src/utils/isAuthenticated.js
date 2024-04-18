import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useIsAuthenticated() {
  console.log("useIsAuthenticated");
  const navigate = useNavigate();
  const authState = useSelector(
    (state) => state?.organizationSlice?.organizationData
  );
  console.log(authState);

  // Check if authState is an empty object
  if (authState && Object.keys(authState).length === 0) {
    // Redirect to the sign-in page
    console.log("not authenticated");
    return false;
  }
  console.log(" authenticated");
  return !!authState;
}
