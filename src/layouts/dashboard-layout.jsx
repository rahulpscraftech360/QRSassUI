import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const isOrganizationLoggedIn = useSelector(
    (state) => state.organizationSlice.isOrganizationLoggedIn
  );
  console.log("isOrganizationLoggedIn", isOrganizationLoggedIn);
  const navigate = useNavigate();

  console.log("test", userId);

  useEffect(() => {
    if (!isOrganizationLoggedIn) {
      console.log("not sign in");
      navigate("/sign-in");
    }
    console.log("signed User");
  });

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
