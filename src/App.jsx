//importing third parties components and packages
import { BrowserRouter as Router, Routes, Route } from "react-router";

import "./App.css";

//importing components
// import Login from "./Pages/Login";
import HomeLayout from "./Layouts/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DailyDelivery from "./Pages/DailyDelivery/DailyDelivery";
import Search from "./Pages/Search/Search";
import VendorAccount from "./Pages/VendorAccount/VendorAccount";
import ThirdParties from "./Pages/3PLS/ThirdParties";
import BulkSearch from "./Pages/BulkSearch/BulkSearch";
import Cod from "./Pages/COD/Cod";
import BulkUpdate from "./Pages/BulkUpdate/BulkUpdate";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomeLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/daily-delivery" element={<DailyDelivery />} />
            <Route path="/search" element={<Search />} />
            <Route path="/vendor-account" element={<VendorAccount />} />
            <Route path="/3pls" element={<ThirdParties />} />
            <Route path="/bulk-search" element={<BulkSearch />} />
            <Route path="/cod" element={<Cod />} />
            <Route path="/bulk-update" element={<BulkUpdate />} />
          </Route>
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
