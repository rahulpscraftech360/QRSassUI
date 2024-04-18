import { Toaster } from "@/components/ui/toaster";
import { MainNav } from "@/components/main-nav";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Menu from "@/routes/Menu";
import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty"; // Import isEmpty from lodash
import axios from "../utils/axiosConfig";
import { updateActivePlan, updateUser } from "@/utils/organizationSlice";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const showHeader =
    !["/sign-in", "/sign-up"].some((path) =>
      location.pathname.startsWith(path)
    ) &&
    !location.pathname.startsWith("/share/event/") &&
    !location.pathname.startsWith("/events/share/") &&
    !location.pathname.startsWith("/scan/");
  console.log("show header", location.pathname);
  const isOrganization = useSelector(
    (state) => state.organizationSlice?.organizationData
  );
  const organization = useSelector(
    (state) => state.organizationSlice?.organizationData
  );
  const dispatch = useDispatch();
  const planEndDate = new Date(organization?.subscription?.currentPeriodEnd);
  const [isActivePlan, setIsActivePlan] = useState(false);
  // dispatch(updateUser(isActivePlan));
  // Get today's date
  useEffect(() => {
    dispatch(updateActivePlan({ isActivePlan: isActivePlan }));
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<", organization);
  }, [isActivePlan]);

  const today = new Date();
  const isActive = planEndDate >= today;
  console.log("active", isActive);
  console.log("isOrganizationLoggedIn", isOrganization);

  console.log("test is login", isOrganization);

  useEffect(() => {
    console.log("location", location);
    const isEmptyObject = isEmpty(isOrganization);
    // if (location.pathname != "/sign-in") {
    //   if (isEmptyObject) {
    //     console.log("not sign in");
    //     navigate("/sign-in");
    //   } else {
    //     console.log("signed User");
    //   }
    // }
  }, [location]);

  useEffect(() => {
    console.log("check trail events");
    const fetchEventsCount = async () => {
      if (organization.subscription.isTrial) {
        console.log("first, in trial");
        // Check events length by organization
        const orgId = organization.id;
        console.log(orgId);
        try {
          const response = await axios.get(`/events/byOrganization/${orgId}`);
          const eventsCount = response.data;
          console.log("event Count", eventsCount);
          if (eventsCount > 2) {
            console.log("buy produnct");
            // const isActivePlan = false;
            // dispatch(updateUser(isActivePlan));
            navigate(`/Subscription`);
          }
        } catch (error) {
          console.error("Error fetching events count:", error);
        }
      }
      console.log(
        ">>>>>>>>>>>>>>",
        isActive,
        organization?.subscription?.isTrail
      );
      if (!organization.subscription.isTrial && !isActive) {
        console.log("second, not in trial, not in active subscription");
        navigate(`/Subscription`);
      } else {
        console.log("first");
        console.log(!organization.subscription.isTrial);
        console.log(isActive);
        setIsActivePlan(true);
      }

      // dispatch(updateUser(isActivePlan));
    };

    fetchEventsCount();
  }, [organization, navigate]);

  return (
    <ClerkProvider
      navigate={navigate}
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary:
            "bg-slate-500 hover:bg-slate-400 text-sm normal-case",
        },
      }}
    >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {showHeader && (
          <header className="header border">
            <div className="flex w-full justify-between p-2">
              <div className=" flex  ">
                <MainNav />
              </div>
              <div className="flex gap-2 m-2 ">
                <SignedIn>
                  <UserButton afterSignOutUrl="/sign-in" />
                </SignedIn>
                <SignedOut className="">
                  <Link to="/sign-in">
                    <div className=" border-black border-2 rounded-lg p-1 mt-1">
                      Sign In
                    </div>
                  </Link>
                </SignedOut>
                <ModeToggle className="p-1" />
              </div>
            </div>
          </header>
        )}

        {/* <main className="flex items-center justify-center border-b px-6 min-h-screen">
          <div>
            <Menu />
            <Outlet />
            <Toaster />
          </div>
        </main> */}
        <main className="flex  border-b   justify-center   min-h-screen   ">
          {/* <div className="flex max-w-4xl ">
            <div className="w-1/4"> */}
          {showHeader && <Menu />}
          {/* </div>
          </div> */}
          <div className="flex-1 m-1 ">
            <Outlet />
          </div>
          <Toaster />
        </main>
      </ThemeProvider>
    </ClerkProvider>
  );
}
