import { Link, useNavigate } from "react-router";

// import "./StaffRole.css";
import { format, parseISO } from "date-fns";
import { useState, useEffect, forwardRef } from "react";
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

import { GET_ALL_RIDERS } from "../../graphql/generalQueries";
import PaginatedTabs from "../../Components/paginationTab/paginationTabs";
import styles from "./AssignRiderFilter.module.css";
import { useSearch, useSearchB } from "../../graphql/graphqlConfiguration";
import CustomSearchInput from "../../Components/searchInputBox/CustomSearchInput";

const AssignRiderTableFilter = forwardRef(({ handleAssignOrder  }, ref) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [searchRider, setSearchRider] = useState("");
  let itemsPerPage = 15;

  let navigate = useNavigate();

  const {
    debouncedSearch,
    loading: ridersLoading,
    data: ridersData,
    error: riderError,
    fetchMore: fetchMoreRiders,
  } = useSearchB(GET_ALL_RIDERS, itemOffset, itemsPerPage, "APPROVED");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchRider(value);
    debouncedSearch(value);
  };

  const totalNumberOfRiders = ridersData?.riders?.totalCount;

  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
    
      --data-table-library_grid-template-columns:  repeat(4, minmax(0, 1fr)) !important;
     
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
    <div className={styles.fullPage}>
    <div className={styles.tableContainer} ref={ref}>
      <div className="searchBox">
        <CustomSearchInput
          bgColor={"white"}
          placeholder="Search by full name, contact or vehicle"
          value={searchRider}
          onChange={handleSearch}
        />
      </div>
      <div>
        <Table
          data={{ nodes: [...(ridersData?.riders.data || [])] }}
          theme={tableTheme}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  {/* <HeaderCell>Rider ID</HeaderCell> */}
                  <HeaderCell>Full name</HeaderCell>

                  <HeaderCell>Contact</HeaderCell>
                  <HeaderCell>Vehicle</HeaderCell>
                  {/* <HeaderCell>City of Operation</HeaderCell> */}

                  <HeaderCell>Action</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {ridersLoading ? (
                  <Row>
                    <Cell></Cell>
                    <Cell></Cell>

                   

                    <Cell>
                      <Spin size="large" className="loading-spinner" />
                    </Cell>
                  
                    <Cell></Cell>
                  </Row>
                ) : (
                  tableList.map((item) => (
                    <Row key={item._id} item={item}>
                      <Cell>{item?.userProfile?.fullName}</Cell>

                      <Cell>{item?.contactDetails?.phoneNumber}</Cell>
                      <Cell>{item?.vehicleInfo?.vehicleType}</Cell>

                      <Cell>
                        {" "}
                        <button
                          className="status-btn-st"
                          onClick={() =>
                           handleAssignOrder({assignToID:item._id, assignToModelName:"Rider"})
                          }
                        >
                          Assign
                        </button>{" "}
                      </Cell>
                    </Row>
                  ))
                )}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          <PaginatedTabs
            totalRecords={totalNumberOfRiders}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreRiders}
          />
        </div>
      </div>
    </div>
    </div>

  );
});

export default AssignRiderTableFilter;
