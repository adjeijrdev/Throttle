import "./PendingAccount.css";

import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
// import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useQuery } from "@apollo/client";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { GET_ALL_VENDORS } from "../../../graphql/generalQueries";
import { Spin } from "antd";

function PendingAccount() {
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 15;

  const {
    loading: vendorLoading,
    data: vendorData,
    error: vendorError,
    fetchMore: fetchMoreVendors,
    refetch: refetchVendors,
  } = useQuery(GET_ALL_VENDORS, {
    variables: {
      offset: itemOffset,
      limit: itemsPerPage,
      status: "PENDING",
    },
    notifyOnNetworkStatusChange: true,
  });

  const totalNumberOfVendors = vendorData?.vendors?.totalCount;
  const [isDeleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    refetchVendors();
  }, []);

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
    <div>
      <div className="vd-pending-title">Pending Vendor Accounts</div>

      <div className="table-container-st">
        <Table
          data={{ nodes: [...(vendorData?.vendors.data || [])] }}
          theme={tableTheme}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>
                  <HeaderCell>Business Name</HeaderCell>
                  <HeaderCell>Business Number</HeaderCell>
                  <HeaderCell>Email</HeaderCell>
                  <HeaderCell>Business Address</HeaderCell>
                  <HeaderCell>Business Type</HeaderCell>
                  <HeaderCell>Year in Operation</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {vendorLoading ? (
                  <Row>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>

                    <Cell>
                      <Spin size="large" className="loading-spinner" />
                    </Cell>
                  </Row>
                ) : (
                  tableList.map((item) => (
                    <Row key={item._id} item={item}>
                      <Cell>
                        <input type="checkbox" />
                      </Cell>
                      <Cell>{item.businessInfo.companyName}</Cell>
                      <Cell>
                        {item.businessInfo.businessRegistrationNumber}
                      </Cell>
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
                              `/vendor-account/Pending-Account/details/${item?._id}`,
                              {
                                state: { status: "PENDING" },
                              }
                            )
                          }
                        >
                          Pending
                        </button>{" "}
                      </Cell>
                    </Row>
                  ))
                )}
                {(tableList.length <=0 && !vendorLoading) && (
                  <Row>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>

                    <Cell>No Data Found</Cell>
                  </Row>
                )}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          <PaginatedTabs
            totalRecords={totalNumberOfVendors}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreVendors}
          />
        </div>
      </div>

      {/* <div className="table-container ">
        <div>
          <div className=" table-head vendor-table-head">
                 
            <span className="tb-head-checkbox"> <input type="checkbox"  /></span>
            <span>Business nameddddddddddddddddddddddddddddddddddddddddddddddddddddddd</span>
            <span>Business Number</span>
            <span>Email</span>
            <span>Business Address</span>
            <span>Business Type</span>
            <span>Year in Operation</span>
            <span>Status</span>
          </div>

          {businesses.map((business) => {
            return (
              <div key={business.id} className="tb-row vendor-table-row">
                <div>
                  <span>
                  <input type="checkbox" id={business.id} />
                  </span>
                </div>
                <div><span>{business.businessInfo.companyName}eeeeedddddddddddddddddddddddddddddddd</span></div>
                <div><span>{business.businessInfo.businessRegistrationNumber}</span></div>
                <div><span>{business.contactDetails.email}</span></div>
                <div><span>{business.businessInfo.businessAddress}</span></div>
                <div><span>{business.businessInfo.businessType}</span></div>
                <div><span>{business.businessInfo.yearsInOpertion}</span></div>


                 <div className="btn-container">
                
                  <button onClick={()=>console.log('dd')}>Status</button>
                </div>
              </div>
            );
          })}
        </div>
       

      </div> */}
    </div>
  );
}

export default PendingAccount;
