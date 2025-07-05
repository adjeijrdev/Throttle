//importing third parties components and packages
import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";

//importing components
import Login from "./Pages/Auth/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DailyDelivery from "./Pages/DailyDelivery/DailyDelivery";
import Search from "./Pages/Search/Search";
import VendorAccount from "./Pages/VendorAccount/VendorAccount";
import ThirdParties from "./Pages/3PLS/ThirdParties";
import BulkSearch from "./Pages/BulkSearch/BulkSearch";
import Cod from "./Pages/COD/Cod";
import BulkUpdate from "./Pages/BulkUpdate/BulkUpdate";
import Register from "./Pages/Auth/Register"
import Media from "./Pages/Media";
import RiderRegistration from "./Pages/Auth/RiderRegistration";
import StaffAccount from "./Pages/StaffAccount/StaffAccount";
import RegisterThirdParty from "./Pages/Auth/RegisterThirdParty";

//Importing subMenus
import ThirdPartiesApproved from "./Pages/3PLS/ApprovedAccount/ApprovedAccount";
import ThirdPartiesDenied from "./Pages/3PLS/DeniedAccount/DeniedAccount";
import ThirdPartiesPending from "./Pages/3PLS/PendingAccount/PendingAccount";
import VendorApprovedAccount from "./Pages/VendorAccount/ApprovedAccount/ApprovedAccount";
import VendorDenied from "./Pages/VendorAccount/DeniedAccount/DeniedAccount";
import VendorPending from "./Pages/VendorAccount/PendingAccount/PendingAccount";
import CreateStaffAccount from "./Pages/StaffAccount/CreateStaffAccount/CreateStaffAccount";
import Stafflist from "./Pages/StaffAccount/StaffList/StaffList";
import StaffRole from "./Pages/StaffAccount/StaffRole/StaffRole";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<HomeLayout />}>
          {/* Main pages */}
          <Route index element={<Dashboard />} />
          <Route path="daily-delivery" element={<DailyDelivery />} />
          <Route path="search" element={<Search />} />

          {/* Vendor account + nested */}
          <Route path="vendor-account" element={<VendorAccount />} />
          <Route path="vendor-account/Pending-Account" element={<VendorPending />} />
          <Route path="vendor-account/Approved-Account" element={<VendorApprovedAccount />} />
          <Route path="vendor-account/Denied-Account" element={<VendorDenied />} />

          {/* 3PLs */}
          <Route path="3pls" element={<ThirdParties />} />
          <Route path="3pls/Pending-Account" element={<ThirdPartiesPending />} />
          <Route path="3pls/Approved-Account" element={<ThirdPartiesApproved />} />
          <Route path="3pls/Denied-Account" element={<ThirdPartiesDenied />} />

          {/* Other pages */}
          <Route path="bulk-search" element={<BulkSearch />} />
          <Route path="bulk-update" element={<BulkUpdate />} />
          <Route path="cod" element={<Cod />} />

          {/* Staff */}
          <Route path="staff-account" element={<StaffAccount />} />
          <Route path="staff-account/Staff-List" element={<Stafflist />} />
          <Route path="staff-account/Create-Staff-Account" element={<CreateStaffAccount />} />
          <Route path="staff-account/Staff-Role" element={<StaffRole />} />
        </Route>

        {/* Auth + media (outside layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-rider" element={<RiderRegistration />} />
        <Route path="/register-third-party" element={<RegisterThirdParty />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Router>
  );
}
