import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider, useSelector } from "react-redux"; // Import the Provider
import { store } from "./utils/store";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import HomePage from "./routes/Home";
import ContactPage from "./routes/Contact";
import SignInPage from "./routes/Sign-in";
import SignUpPage from "./routes/Sign-up";
import DashBoard from "./routes/DashBoard";
import InvoicesPage from "./routes/Dashboard.invoices";
import MainPage from "./routes/Menu";
import Events from "./routes/Events";
import Subscription from "./routes/Subscription";
import Test from "./routes/Test";
import AllEvents from "./routes/AllEvents";
import All from "./routes/All";
import Apps from "./routes/Apps";
import AppInfo from "./routes/Appinfo";
import TodaysEvent from "./routes/TodaysEvent";
import CompletedEvents from "./routes/CompletedEvents.";
import EventDetails from "./routes/EventDetails";
import AddParticipants from "./routes/AddParticipants";
import SendEmailInvitation from "./routes/SendEmailInvitation";
import SendWhatsappInvitation from "./routes/SendWhatsappInvitation";
import TaskUpdates from "./routes/TaskUpdates";
import NotFoundPage from "./routes/NotFoundPage";
import SettingsPage from "./routes/SettingsPage";
import TabPreview from "./routes/TabPreview";
import ShareableEvent from "./routes/ShareableEvent";
import CreateEvent from "./routes/CreateEvent";
import ShareEventPreview from "./routes/ShareEventPreview";
import UpcomingEvents from "./routes/UpcomingEvents";
import EditEvent from "./routes/EditEvent";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "./utils/isAuthenticated";
import BuyTicket from "./routes/BuyTicket";
import AddTickets from "./routes/AddTickets";
import Ticket from "./routes/Ticket";
import RazorpayConnect from "./routes/RazorpayConnect";
import QRCodeScanner from "./routes/QRCodeScanner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/share/event/:id", element: <ShareableEvent /> },

      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashBoard /> },
          { path: "/dashboard/invoices", element: <InvoicesPage /> },
        ],
      },
      {
        element: <MainPage />,
        path: "Home",
      },
      {
        element: <ProtectedRoute component={Events} />,
        path: "events",
      },
      {
        element: <CreateEvent />,
        path: "events/CreateEvent",
      },
      {
        element: <EventDetails />,
        path: "events/:eventId",
      },
      {
        element: <EditEvent />,
        path: "events/update/:eventId",
      },
      {
        element: <SendEmailInvitation />,
        path: "events/:eventId/sendEmailInvitation",
      },
      {
        element: <SendWhatsappInvitation />,
        path: "events/:eventId/SendWhatsappInvitation",
      },
      {
        element: <AddParticipants />,
        path: "events/:eventId/addParticipants",
      },
      {
        element: <AddTickets />,
        path: "events/:eventId/addTicket",
      },
      {
        element: <Ticket />,
        path: "events/:eventId/Ticket",
      },
      {
        element: <BuyTicket />,
        path: "events/:eventId/buyTicket",
      },
      {
        element: <AllEvents />,
        path: "Events/all",
      },
      {
        element: <ShareEventPreview />,
        path: "events/share/:id/",
      },
      { path: "scan/events/:id/", element: <QRCodeScanner /> },
      {
        element: <TodaysEvent />,
        path: "events/today",
      },
      {
        element: <CompletedEvents />,
        path: "events/completed",
      },
      {
        element: <UpcomingEvents />,
        path: "events/upcoming",
      },
      {
        element: <TabPreview />,
        path: "events/:eventId/tabPreview",
      },

      {
        element: <ProtectedRoute component={TaskUpdates} />,
        path: "/tasks",
      },
      {
        element: <Subscription />,
        path: "Subscription",
      },
      {
        element: <Test />,
        path: "test",
      },

      {
        element: <Apps />,
        path: "apps",
      },
      {
        element: <AppInfo />,
        path: "apps/:appId",
      },
      {
        element: <SettingsPage />,
        path: "settings",
      },
      {
        element: <RazorpayConnect />,
        path: "account/razorpay/connect",
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
