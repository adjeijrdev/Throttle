import dashboard from "../Assets/icons/gdash.png";
import dailyDelivery from "../Assets/icons/daily-delivery.png";
import search from "../Assets/icons/search.png";
import bulkSearchIcon from "../Assets/icons/Bulk-search.png";
import bulkUpadateIcon from "../Assets/icons/Bulk-update.png";
import COD from "../Assets/icons/COD.png";
// import plsIcon from "../Assets/icons/3pls.png";
import plsIcon from "../Assets/icons/Rider.png";
import VendorAccountIcon from "../Assets/icons/VendorAccount.png";
import StaffAccount from "../Assets/icons/StaffAccount.png"

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
    name: "3PL Account",
    icon: plsIcon,
    url: "/3pls",
     childrens:[
       {
        id: 1,
        name: "Pending Account",
        url: "/3pls/Pending-Account"
      },
      {
        id: 1,
        name: "Approved Account",
        url: "/3pls/Approved-Account"
      },
      {
        id: 1,
        name: "Denied Account",
        url: "/3pls/Denied-Account"
      },
    ]
  },
  {
    id: 8,
    name: "Vendor Account",
    icon: VendorAccountIcon,
    url: "/vendor-account",
     childrens:[
      {
        id: 1,
        name: "Pending Account",
        url: "/vendor-account/Pending-Account"
      },
      {
        id: 1,
        name: "Approved Account",
        url: "/Vendor-account/Approved-Account"
      },
      {
        id: 1,
        name: "Denied Account",
        url: "/Vendor-Account/Denied-Account"
      },
    ]
  },
  {
    id: 9,
    name: "Staff Account",
    icon: StaffAccount,
    url: "/staff-account",
     childrens:[
       {
        id: 1,
        name: "Staff List",
        url: "/staff-account/Staff-List"
      },
      {
        id: 1,
        name: "Create Staff Account",
        url: "/staff-account/Create-Staff-Account"
      },
      {
        id: 1,
        name: "Staff Role",
        url: "/staff-account/Staff-Role"
      },
    ]
  }
];
