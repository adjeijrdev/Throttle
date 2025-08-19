//importing third parties components and packages
import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";

//importing components
import Login from "./Pages/Auth/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DailyDelivery from "./Pages/DailyDelivery/DailyDelivery";
import VendorAccount from "./Pages/VendorAccount/VendorAccount";
import ThirdParties from "./Pages/3PLS/ThirdParties";
import BulkSearch from "./Pages/BulkSearch/BulkSearch";
import Cod from "./Pages/COD/Cod";
import BulkUpdate from "./Pages/BulkUpdate/BulkUpdate";
import Register from "./Pages/Auth/Register";
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
import CreateRole from "./Pages/StaffAccount/StaffRole/CreateRole";
import Role from "./Pages/StaffAccount/StaffRole/Role";
import StaffRoles from "./Pages/StaffAccount/StaffRole/StaffRoles";
import EditRole from "./Pages/StaffAccount/StaffRole/EditRole";
import StaffList from "./Pages/StaffAccount/StaffList/StaffList";
import ViewDetails from "./Pages/VendorAccount/PendingAccount/ViewDetails";
import PendingAccountLayout from "./Pages/VendorAccount/PendingAccount/PendingAccountLayout";
import PendingAccountLayout3PL from "./Pages/3PLS/PendingAccount/PendingAccountLayout";
import ViewDetails3PL from "./Pages/3PLS/PendingAccount/viewDetails";

import { Offline, Online } from "react-detect-offline";
import EditStaff from "./Pages/StaffAccount/editStaff/EditStaff";
import VendorDeniedLayout from "./Pages/VendorAccount/DeniedAccount/VendorDeniedLayout";
import VendorDeniedViewDetails from "./Pages/VendorAccount/DeniedAccount/ViewDetails";
import VendorApprovedLayout from "./Pages/VendorAccount/ApprovedAccount/VendorApprovedLayout";
import VendorApprovedViewDetails from "./Pages/VendorAccount/ApprovedAccount/ViewDetials";
import RiderLayout from "./Pages/Rider/RiderLayout";
import Pending from "./Pages/Rider/account/pending/Pending";
import RiderPending from "./Pages/Rider/account/pending/Pending";
import RiderApproved from "./Pages/Rider/account/approved/Approved";
import RiderPendingLayout from "./Pages/Rider/account/pending/pendingLayout";
import RiderApprovedLayout from "./Pages/Rider/account/approved/ApprovedLayout";
import RiderDeniedLayout from "./Pages/Rider/account/denied/DeniedLayout";
import RiderDenied from "./Pages/Rider/account/denied/Denied";
import RiderApprovedDetails from "./Pages/Rider/account/approved/ApprovedDetails";
import RiderDeniedDetails from "./Pages/Rider/account/denied/DeniedDetails";
import RiderPendingDetails from "./Pages/Rider/account/pending/PendingDetails";
import DashBoardLayout from "./Pages/Dashboard/DashBoardLayout";

import AddOrderLayout from "./AddOrder/AddOrderLayout";
import AddOrder from "./AddOrder/AddOrder";
import OrderDetails from "./AddOrder/OrderDetails";

import UserProfile from "./UserProfile/UserProfile";
import { useSelector } from "react-redux";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

export default function App() {
  const viewAbleTabs = useSelector((state) => state.staffAuth?.viewAbleTabs);

  return (
    <div className="parent-container">
      {/* <Offline>
        <div className="network-offline">
          You are offline check your network connectivity
        </div>
      </Offline> */}

      <Router>
        <Routes>
          {/* Auth + media (outside layout) */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-rider" element={<RiderRegistration />} />
          <Route
            path="/register-third-party"
            element={<RegisterThirdParty />}
          />

          {/* Layout wrapper */}
          {viewAbleTabs?.length !== 0 && (
            <Route path="dashboard" element={<HomeLayout />}>
              {/* Main pages */}

              {viewAbleTabs?.includes("View Orders") && (
                <>
                  <Route path="main" element={<DashBoardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders/:id" element={<OrderDetails />} />
                  </Route>
                  <Route path="daily-delivery" element={<DailyDelivery />} />
                </>
              )}

              {viewAbleTabs?.includes("Add Order") && (
                <Route path="addOrder" element={<AddOrderLayout />}>
                  <Route index element={<AddOrder />} />
                </Route>
              )}

              {viewAbleTabs?.includes("Cash on Delivery") && (
                <Route path="cod" element={<Cod />} />
              )}

              {viewAbleTabs?.includes("Approve 3PL") && (
                <>
                  {/* 3PLs */}
                  <Route path="3pls" element={<ThirdParties />} />
                  <Route
                    path="3pls/Pending-Account"
                    element={<ThirdPartiesPending />}
                  />
                  <Route
                    path="3pls/Approved-Account"
                    element={<PendingAccountLayout3PL />}
                  >
                    <Route index element={<ThirdPartiesApproved />} />
                    <Route path="details/:id" element={<ViewDetails3PL />} />
                  </Route>
                  <Route
                    path="3pls/Denied-Account"
                    element={<ThirdPartiesDenied />}
                  />
                </>
              )}

              {viewAbleTabs?.includes("Approve Rider") && (
                <>
                  {/* Rider */}
                  <Route path="rider" element={<RiderLayout />}>
                    <Route path="pending" element={<RiderPendingLayout />}>
                      <Route index element={<RiderPending />} />
                      <Route
                        path="details/:id"
                        element={<RiderPendingDetails />}
                      />
                    </Route>
                    <Route path="approved" element={<RiderApprovedLayout />}>
                      <Route index element={<RiderApproved />} />
                      <Route
                        path="details/:id"
                        element={<RiderApprovedDetails />}
                      />
                    </Route>
                    <Route path="denied" element={<RiderDeniedLayout />}>
                      <Route index element={<RiderDenied />} />
                      <Route
                        path="details/:id"
                        element={<RiderDeniedDetails />}
                      />
                    </Route>
                  </Route>
                </>
              )}

              {viewAbleTabs?.includes("Approve Vendor") && (
                <>
                  {/* Vendor account + nested  hahahahaa ababio and his lazy work*/}
                  <Route path="vendor-account" element={<VendorAccount />} />
                  <Route
                    path="vendor-account"
                    element={<PendingAccountLayout />}
                  >
                    <Route path="Pending-Account" element={<VendorPending />} />
                    <Route
                      path="Pending-Account/details/:id"
                      element={<ViewDetails />}
                    />
                  </Route>
                  <Route
                    path="vendor-account"
                    element={<VendorApprovedLayout />}
                  >
                    <Route
                      path="Approved-Account"
                      element={<VendorApprovedAccount />}
                    />
                    <Route
                      path="Approved-Account/details/:id"
                      element={<VendorApprovedViewDetails />}
                    />
                  </Route>
                  <Route path="vendor-account" element={<VendorDeniedLayout />}>
                    <Route path="Denied-Account" element={<VendorDenied />} />
                    <Route
                      path="Denied-Account/details/:id"
                      element={<VendorDeniedViewDetails />}
                    />
                  </Route>
                </>
              )}

              {viewAbleTabs?.includes("Create Staff") && (
                <>
                  <Route path="user-profile" element={<UserProfile />} />
                  {/* Staff */}

                  <Route path="staff-account" element={<StaffAccount />}>
                    <Route path="Staff-List" element={<StaffList />} />
                    <Route
                      path="Create-Staff-Account"
                      element={<CreateStaffAccount />}
                    />
                    <Route
                      path="edit-staff-account/:id"
                      element={<EditStaff />}
                    />
                  </Route>
                  <Route path="staff-account" element={<Role />}>
                    <Route path="Staff-Role" element={<StaffRoles />} />
                    <Route path="create-Role" element={<CreateRole />} />
                    <Route path="edit-role/:id" element={<EditRole />} />
                  </Route>
                </>
              )}

              {/* Other pages */}
              <Route path="bulk-search" element={<BulkSearch />} />
              <Route path="bulk-update" element={<BulkUpdate />} />
            </Route>
          )}

          <Route path="/media" element={<Media />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}
