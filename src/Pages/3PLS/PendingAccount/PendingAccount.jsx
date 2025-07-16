import "./PendingAccount.module.css";

import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
// import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

const businesses = {
  nodes: [
    {
      id: "biz0000",
      businessInfo: {
        companyName: "QuickLogix",
        businessRegistrationNumber: "REG123456",
        yearsInOpertion: 5,
        businessAddress: "123 Speed Ave, Accra",
        businessType: "Courier",
      },
      contactDetails: {
        email: "kwame@quicklogix.com",
      },
      status: "INACTIVE",
    },
    {
      id: "biz001",
      businessInfo: {
        companyName: "QuickLogix",
        businessRegistrationNumber: "REG123456",
        yearsInOpertion: 5,
        businessAddress: "123 Speed Ave, Accra",
        businessType: "Courier",
      },
      contactDetails: {
        email: "kwame@quicklogix.com",
      },
      status: "INACTIVE",
    },
    {
      id: "biz002",
      businessInfo: {
        companyName: "EcoFresh Delivery",
        businessRegistrationNumber: "REG654321",
        yearsInOpertion: 3,
        businessAddress: "45 Palm Street, Kumasi",
        businessType: "Grocery Delivery",
      },
      contactDetails: {
        email: "info@ecofresh.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz003",
      businessInfo: {
        companyName: "SkyNet Freight",
        businessRegistrationNumber: "REG777888",
        yearsInOpertion: 8,
        businessAddress: "78 Cargo Lane, Tema",
        businessType: "Freight Forwarding",
      },
      contactDetails: {
        email: "support@skynetfreight.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz004",
      businessInfo: {
        companyName: "RideNow",
        businessRegistrationNumber: "REG121212",
        yearsInOpertion: 2,
        businessAddress: "14 Junction Rd, Takoradi",
        businessType: "Ride Hailing",
      },
      contactDetails: {
        email: "hello@ridenow.com",
      },
      status: "INACTIVE",
    },
    {
      id: "biz005",
      businessInfo: {
        companyName: "MedFast Supplies",
        businessRegistrationNumber: "REG333222",
        yearsInOpertion: 6,
        businessAddress: "88 Health Ave, Cape Coast",
        businessType: "Medical Supplies",
      },
      contactDetails: {
        email: "orders@medfast.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz006",
      businessInfo: {
        companyName: "JollofExpress",
        businessRegistrationNumber: "REG909090",
        yearsInOpertion: 4,
        businessAddress: "3 Tasty Blvd, Accra",
        businessType: "Food Delivery",
      },
      contactDetails: {
        email: "eat@jollofexpress.com",
      },
      status: "INACTIVE",
    },
    {
      id: "biz007",
      businessInfo: {
        companyName: "Swift Cargo",
        businessRegistrationNumber: "REG444555",
        yearsInOpertion: 7,
        businessAddress: "90 Wharf Rd, Tema",
        businessType: "Logistics",
      },
      contactDetails: {
        email: "book@swiftcargo.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz008",
      businessInfo: {
        companyName: "FarmLink Ghana",
        businessRegistrationNumber: "REG888333",
        yearsInOpertion: 9,
        businessAddress: "21 Agri Park, Sunyani",
        businessType: "Agriculture",
      },
      contactDetails: {
        email: "contact@farmlinkgh.com",
      },
      status: "INACTIVE",
    },
    {
      id: "biz009",
      businessInfo: {
        companyName: "CleanFlow Services",
        businessRegistrationNumber: "REG111999",
        yearsInOpertion: 5,
        businessAddress: "12 Hygiene Rd, Accra",
        businessType: "Sanitation",
      },
      contactDetails: {
        email: "admin@cleanflow.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz010",
      businessInfo: {
        companyName: "AutoGo Repairs",
        businessRegistrationNumber: "REG000456",
        yearsInOpertion: 10,
        businessAddress: "56 Mechanic Street, Tamale",
        businessType: "Auto Repairs",
      },
      contactDetails: {
        email: "fixit@autogo.com",
      },
      status: "ACTIVE",
    },
    {
      id: "biz011",
      businessInfo: {
        companyName: "Green Basket",
        businessRegistrationNumber: "REG112233",
        yearsInOpertion: 3,
        businessAddress: "101 Fresh Lane, Ho",
        businessType: "Organic Produce",
      },
      contactDetails: {
        email: "fresh@greenbasket.com",
      },
      status: "INACTIVE",
    },
  ],
};

function PendingAccount() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);

  let navigate = useNavigate();

  // const tableTheme = useTheme(getTheme());

  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
    
      --data-table-library_grid-template-columns:  50px repeat(7, minmax(0, 1fr)) !important;
     
      `,
      BaseCell: `
        height: 47px;

      `,
      BaseRow: `
       
  `,
      Cell: `
          color:#06264D;
          height:56px;
          font-size: 1.4rem;
          font-weight:500;
          font-family: "Poppins", sans-serif;

        & input{
          width:15.98px;
          height:15.09px;
          border-radius:4px
          outline:1px solid green;
          border:1px solid green !important;
        }

        `,
      HeaderRow: `
        background-color: #17654F;
        border-color: #003627;
        height: 56px;
        padding:25px;
        

      `,
      HeaderCell: `
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 1.6rem;
        color: #FFFFFF;
  
      & input{
          border-color:#fff;
          width:15.98px;
          height:15.09px;
          border-radius:4px
          outline:1px solid green;
         
        }

         & input:checked{
          border-color:#fff;
        }

        
      `,
      Body: `
    
      `,
      Row: `
          cursor: pointer;

          transition-duration: 250ms;
          transition-property: background-color;
          transition-timing-function: ease-in-out;

          &:hover{
          background-color:#D6E3E0;
          border-color:#979595;
          }
      `,
    },
  ]);

  return (
    <div className="">
      <div className="vd-pending-title">Pending 3PL Accounts</div>

      <div className="table-container-st">
        <Table data={businesses} theme={tableTheme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>
                  <HeaderCell>Company Name</HeaderCell>
                  <HeaderCell>Contact Person</HeaderCell>
                  <HeaderCell>Mobile Number</HeaderCell>
                  <HeaderCell>Office Email</HeaderCell>
                  <HeaderCell>Office Line</HeaderCell>
                  <HeaderCell>Region</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <input type="checkbox" />
                    </Cell>
                    <Cell>{item.businessInfo.companyName}</Cell>
                    <Cell>{item.businessInfo.businessRegistrationNumber}</Cell>
                    <Cell>{item.contactDetails.email}</Cell>
                    <Cell>{item.businessInfo.businessAddress}</Cell>
                    <Cell>{item.businessInfo.businessType}</Cell>
                    <Cell>
                      {item.businessInfo.yearsInOpertion}{" "}
                      {item.businessInfo.yearsInOpertion && "years"}
                    </Cell>
                    <Cell>
                      {" "}
                      <button
                        className="status-btn-st"
                        onClick={() =>
                          navigate(
                            "/3pls/Approved-Account/details/1"
                          )
                        }
                      >
                        Pending
                      </button>{" "}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          {/* <PaginatedTabs pageCount={30} setItemOffset={setItemOffset} /> */}
        </div>
      </div>

    
    </div>
  );
}

export default PendingAccount;
