import dashboard from "../Assets/icons/gdash.png";
import dailyDelivery from "../Assets/icons/daily-delivery.png";
import search from "../Assets/icons/search.png";
import bulkSearchIcon from "../Assets/icons/Bulk-search.png";
import bulkUpadateIcon from "../Assets/icons/Bulk-update.png";
import COD from "../Assets/icons/COD.png";
// import plsIcon from "../Assets/icons/3pls.png";
import plsIcon from "../Assets/icons/van.png";
import rider from "../Assets/icons/Rider.png";
import VendorAccountIcon from "../Assets/icons/VendorAccount.png";
import StaffAccount from "../Assets/icons/StaffAccount.png";
import plusIcon from "../Assets/icons/plusIcon.png";

const getDisplayAbleTabes = (viewAbleTabs) => {


  let SideNavLinks = [];

  if (viewAbleTabs?.includes("View Orders")) {
    SideNavLinks.push(
      {
        id: 1,
        name: "Dashboard",
        icon: dashboard,
        url: "/dashboard/main",
      },
      {
        id: 2,
        name: "Orders",
        icon: dailyDelivery,
        url: "/dashboard/daily-delivery",
      }
    );
  }

  if (viewAbleTabs?.includes("Add Order")) {
    SideNavLinks.push({
      id: 3,
      name: "Add Order",
      icon: plusIcon,
      url: "/dashboard/addOrder",
    });
  }

  if (viewAbleTabs?.includes("Cash on Delivery")) {
    SideNavLinks.push({
      id: 6,
      name: "Cash On Delivery",
      icon: COD,
      url: "/dashboard/cod",
    });
  }

  if (viewAbleTabs?.includes("Approve 3PL")) {
    SideNavLinks.push({
      id: 7,
      name: "3PL Account",
      icon: plsIcon,
      url: "/dashboard/3pls",
      childrens: [
        {
          id: 1,
          name: "Pending Account",
          url: "/dashboard/3pls/Pending-Account",
        },
        {
          id: 2,
          name: "Approved Account",
          url: "/dashboard/3pls/Approved-Account",
        },
        {
          id: 3,
          name: "Denied Account",
          url: "/dashboard/3pls/Denied-Account",
        },
      ],
    });
  }

  if (viewAbleTabs?.includes("Approve Rider")) {
    SideNavLinks.push({
      id: 8,
      name: "Rider Account",
      icon: rider,
      url: "/dashboard/rider",
      childrens: [
        {
          id: 1,
          name: "Pending Account",
          url: "/dashboard/rider/pending",
        },
        {
          id: 2,
          name: "Approved Account",
          url: "/dashboard/rider/approved",
        },
        {
          id: 3,
          name: "Denied Account",
          url: "/dashboard/rider/denied",
        },
      ],
    });
  }

  if (viewAbleTabs?.includes("Approve Vendor")) {
    SideNavLinks.push({
      id: 9,
      name: "Vendor Account",
      icon: VendorAccountIcon,
      url: "/dashboard/vendor-account",
      childrens: [
        {
          id: 1,
          name: "Pending Account",
          url: "/dashboard/vendor-account/Pending-Account",
        },
        {
          id: 2,
          name: "Approved Account",
          url: "/dashboard/Vendor-account/Approved-Account",
        },
        {
          id: 3,
          name: "Denied Account",
          url: "/dashboard/Vendor-Account/Denied-Account",
        },
      ],
    });
  }

  if (viewAbleTabs?.includes("Create Staff")) {
    SideNavLinks.push({
      id: 10,
      name: "Staff Account",
      icon: StaffAccount,
      url: "/dashboard/staff-account",
      childrens: [
        {
          id: 1,
          name: "Staff List",
          url: "/dashboard/staff-account/Staff-List",
        },
        {
          id: 2,
          name: "Create Staff Account",
          url: "/dashboard/staff-account/Create-Staff-Account",
        },
        {
          id: 3,
          name: "Staff Role",
          url: "/dashboard/staff-account/Staff-Role",
        },
      ],
    });
  }


  return SideNavLinks;
};

export default getDisplayAbleTabes;
