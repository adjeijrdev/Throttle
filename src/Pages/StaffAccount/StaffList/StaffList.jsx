import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
import "./StaffList.css";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_STAFFS } from "../../../graphql/generalQueries";
import { Spin } from "antd";
import { useSearch } from "../../../graphql/graphqlConfiguration";
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
import CustomSearchInput from "../../../Components/searchInputBox/CustomSearchInput";

function StaffList() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(true);
  let itemsPerPage = 20;
  const [searchRole, setSearchRole] = useState("");

  let navigate = useNavigate();

    const {
      debouncedSearch,
      data: staffData,
      loading: staffLoading,
      error: staffError,
      fetchMore: fetchMoreStaff,
    } = useSearch(GET_ALL_STAFFS,itemOffset, itemsPerPage);

  const totalNumberOfStaffs = staffData?.staffs?.totalCount;

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

          & .btn-container{
            display: flex;
            gap: 0.5rem;

            & button{
              padding: 0.7rem 3rem;
              border-radius: 0.8rem;
              border: 0.1rem solid #cdd4db;
              background-color: transparent;
              cursor: pointer;
              color: #003627;
              transition-duration: 250ms;
              transition-property: background-color, color, border;
              transition-timing-function: ease-in-out;
             

            }
          
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
        }

        & input{
          border-color:#fff;
          width:15.98px;
          height:15.09px;
          border-radius:4px
          outline:1px solid green;
         
        }

         & .header-action{
          
            padding-left:6rem;
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

  useEffect(()=>{
    console.log(staffData)
  },[staffData])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchRole(value);
    debouncedSearch(value);
  };

  return (
    <div className="roles">
      <div className="headers">
        <div className="top">
          <div className="roles-title">Staff Accounts</div>

          <button
            className="btn-new-role"
            onClick={(e) => navigate("/staff-account/Create-Staff-Account")}
          >
            Create Staff Account<span className="new-plus"> +</span>
          </button>
        </div>

        <div className="searchBox">
          <CustomSearchInput
            bgColor={"white"}
            placeholder="Search by role title"
            value={searchRole}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-container-st">
        <Table
          data={{ nodes: [...(staffData?.staffs.data || [])] }}
          theme={tableTheme}
          layout={{ custom: true, horizontalScroll: true }}
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>
                    <input type="checkbox" />
                  </HeaderCell>

                  <HeaderCell>Full Name</HeaderCell>
                  <HeaderCell>Gender</HeaderCell>
                  <HeaderCell>Contact</HeaderCell>
                  <HeaderCell>Email Address</HeaderCell>
                  <HeaderCell>Role</HeaderCell>
                  <HeaderCell>Date Created</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {staffLoading ? (
                  <Row>
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
                      <Cell>
                        {item?.userProfile?.fullName?.surname}{" "}
                        {item.userProfile?.fullName?.middleName}{" "}
                        {item.userProfile?.fullName?.firstName}
                      </Cell>
                      <Cell>{item?.userProfile?.gender}</Cell>
                      <Cell>{item?.userProfile?.contact}</Cell>
                      <Cell>{item?.userProfile?.email}</Cell>
                      <Cell>{item?.role?.name}</Cell>
                      <Cell>
                        {format(parseISO(item?.createdAt), "dd/MM/yyyy")}
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
            totalRecords={totalNumberOfStaffs}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreStaff}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffList;
