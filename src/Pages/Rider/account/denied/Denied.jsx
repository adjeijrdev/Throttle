

import { Link, useNavigate } from "react-router";

// import "./StaffRole.css";
import { useState, useEffect } from "react";
import { Spin } from "antd";

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
import { GET_ALL_RIDERS } from "../../../../graphql/generalQueries";
import { useQuery } from "@apollo/client";
import { useSearchB } from "../../../../graphql/graphqlConfiguration";
import CustomSearchInput from "../../../../Components/searchInputBox/CustomSearchInput";

function RiderDenied() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
   const [searchRider,setSearchRider] = useState("");

  let itemsPerPage = 15;

  let navigate = useNavigate();

  
    const {
    debouncedSearch,
    loading: ridersLoading,
    data: ridersData,
    error: riderError,
    fetchMore: fetchMoreRiders,
    } = useSearchB(GET_ALL_RIDERS,itemOffset,itemsPerPage, "DENIED")
  
   
    const totalNumberOfRiders = ridersData?.riders?.totalCount;

        const handleSearch = (e) => {
    const value = e.target.value;
    setSearchRider(value);
    debouncedSearch(value);
  };


  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
    
      --data-table-library_grid-template-columns:  50px repeat(6, minmax(0, 1fr)) !important;
     
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

                  <div className="full-search-container">
          
                  <CustomSearchInput
                    bgColor={"white"}
                    placeholder="Search by full name, contact or vehicle"
                    value={searchRider}
                    onChange={handleSearch}
                  />
                </div>
        <Table data={{ nodes: [...(ridersData?.riders.data || [])] }} theme={tableTheme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>
                  {/* <HeaderCell>Rider ID</HeaderCell> */}
                  <HeaderCell>Full name</HeaderCell>
                  <HeaderCell>Gender</HeaderCell>
                  <HeaderCell>Mobile Number</HeaderCell>
                  <HeaderCell>Vehicle</HeaderCell>
                  {/* <HeaderCell>City of Operation</HeaderCell> */}
                  <HeaderCell>Year</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </HeaderRow>
              </Header>

                <Body>
                {ridersLoading ? (
                  <Row>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                    <Cell></Cell>

                    <Cell>
                      <Spin size="large" className="loading-spinner" />
                    </Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                  </Row>
                ) : (
                  tableList.map((item) => (
                    <Row key={item._id} item={item}>
                      <Cell>
                        <input type="checkbox" />
                      </Cell>
                      <Cell>{item?.userProfile?.fullName}</Cell>
                      <Cell>{item?.userProfile?.gender}</Cell>
                      <Cell>{item?.contactDetails?.phoneNumber}</Cell>
                      <Cell>
                                                {item?.vehicleInfo?.vehicleType}

                      </Cell>
                      <Cell>
                        {item?.professionalDetails?.yearsOfDrivingExperience}
                      </Cell>
                      <Cell>
                        {" "}
                        <button
                          className="status-btn-st"
                          onClick={() => navigate(`/rider/denied/details/${item?._id}`)}
                        >
                          Denied
                        </button>{" "}
                      </Cell>
                    </Row>
                  ))
                )}
                  {(tableList.length <=0 && !ridersLoading) && (
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
          {/* <PaginatedTabs pageCount={30} setItemOffset={setItemOffset} /> */}
        </div>
      </div>

    
    </div>
  );
}

export default RiderDenied;
