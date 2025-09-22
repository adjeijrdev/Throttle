import "./DeniedAccount.module.css";

import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
// import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState,useEffect } from "react";

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
import { Spin } from "antd";
import { GET_ALL_VENDORS } from "../../../graphql/generalQueries";
import { useQuery } from "@apollo/client";

function DeniedAccount() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
  let itemsPerPage = 20;

  const {
    loading: vendorLoading,
    data: vendorData,
    error: vendorError,
    fetchMore: fetchMoreVendors,
    refetch: refetchVenors
  } = useQuery(GET_ALL_VENDORS, {
    variables: {
      offset: itemOffset,
      limit: itemsPerPage,
      status: "DENIED",
    },
    notifyOnNetworkStatusChange: true,
  });

  let navigate = useNavigate();

  useEffect(()=>{
      refetchVenors()
  },[])

  const totalNumberOfVendors = vendorData?.vendors?.totalCount;

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
      <div className="vd-pending-title">Denied Vendor Accounts</div>

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
                              `/dashboard/vendor-account/Denied-Account/details/${item?._id}`,
                            )
                          }
                        >
                          Denied
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
    </div>
  );
}

export default DeniedAccount;
