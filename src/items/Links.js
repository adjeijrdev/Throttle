import dashboard from "../Assets/icons/gdash.png";
import dailyDelivery from "../Assets/icons/daily-delivery.png";
import search from "../Assets/icons/search.png";
import bulkSearchIcon from "../Assets/icons/Bulk-search.png";
import bulkUpadateIcon from "../Assets/icons/Bulk-update.png";
import COD from "../Assets/icons/COD.png";
// import plsIcon from "../Assets/icons/3pls.png";
import plsIcon from "../Assets/icons/Rider.png";
import VendorAccountIcon from "../Assets/icons/vendor-account.png";

export const SideNavLinks = [
  {
    id: 1,
    name: "Dashboard",
    icon: dashboard,
    url: "/",
  },
  {
    id: 2,
    name: "Daily Delivery",
    icon: dailyDelivery,
    url: "/daily-delivery",
  },
  {
    id: 3,
    name: "Search",
    icon: search,
    url: "/search",
  },
  {
    id: 4,
    name: "Bulk Search",
    icon: bulkSearchIcon,
    url: "/bulk-search",
  },
  {
    id: 5,
    name: "Bulk Update",
    icon: bulkUpadateIcon,
    url: "/bulk-update",
  },
  {
    id: 6,
    name: "COD/Remittance Search",
    icon: COD,
    url: "/cod",
  },
  {
    id: 7,
    name: "3PLs",
    icon: plsIcon,
    url: "/3pls",
  },
  {
    id: 8,
    name: "Vendor Account",
    icon: VendorAccountIcon,
    url: "/vendor-account",
  },
];
