import { Link, useNavigate } from "react-router";
import PaginatedTabs from "../../../Components/paginationTab/paginationTabs";
import "./StaffList.css";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_STAFFS } from "../../../graphql/generalQueries";
import { Spin } from "antd";
import {
  removeSingleStaffFromCache,
  useSearch,
} from "../../../graphql/graphqlConfiguration";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import toast from "react-hot-toast";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import CustomSearchInput from "../../../Components/searchInputBox/CustomSearchInput";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteStaffAPI } from "../../../api/authentication";
import DeleteModal from "../../../Components/DeleteModal";

function StaffList() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [staffIdToDelete, setStaffIdToDelete] = useState("");
  const [deleteStaffName, setDeleteStaffName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  let itemsPerPage = 15;
  const [searchRole, setSearchRole] = useState("");

  let navigate = useNavigate();

  const {
    debouncedSearch,
    data: staffData,
    loading: staffLoading,
    error: staffError,
    fetchMore: fetchMoreStaff,
  } = useSearch(GET_ALL_STAFFS, itemOffset, itemsPerPage);

  useEffect(()=>{
    console.log(staffData)
  },[staffData])
  const totalNumberOfStaffs = staffData?.staffs?.totalCount;

  const tableTheme = useTheme([
    getTheme(),
    {
      Table: `
        border-radius: 8px 8px 0rem 0rem;
        border: 0.1rem solid #979595;
    
      --data-table-library_grid-template-columns:  50px repeat(6, minmax(0, 1fr)) 80px !important;

     
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchRole(value);
    debouncedSearch(value);
  };

  const handleDeleteStaff = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteStaffAPI(staffIdToDelete);

      toast.success(result?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      removeSingleStaffFromCache(staffIdToDelete);
    } catch (error) {
      toast.error(error?.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    setDeleteModal(false);
    setIsDeleting(false);
  };
  return (
    <div className="roles">
      <div className="headers">
        <div className="top">
          <div className="roles-title">Staff Accounts </div>

          <button
            className="btn-new-role"
            onClick={(e) => navigate("/dashboard/staff-account/Create-Staff-Account")}
          >
            Create Staff Account<span className="new-plus"> +</span>
          </button>
        </div>

        <div className="searchBox">
          <CustomSearchInput
            bgColor={"white"}
            placeholder="Search by full name, gender, contact, email or role"
            value={searchRole}
            onChange={handleSearch}
          />
        </div>
      </div>

      {isDeleteModal && (
        <DeleteModal
          setDeleteModel={setDeleteModal}
          handleDelete={handleDeleteStaff}
          itemName={deleteStaffName}
          item="Staff"
          isDeleting={isDeleting}
        />
      )}

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
                  <HeaderCell>Action</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {staffLoading ? (
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
                    <Cell></Cell>
                  </Row>
                ) : (
                  tableList.map((item) => (
                    <Row key={item._id} item={item}>
                      <Cell>
                        <input type="checkbox" />
                      </Cell>
                      <Cell>
                        {item?.userProfile?.fullName?.surname}{" "}
                        {item.userProfile?.fullName?.firstName}{" "}
                        {item.userProfile?.fullName?.middleName}
                      </Cell>
                      <Cell>{item?.userProfile?.gender}</Cell>
                      <Cell>{item?.userProfile?.contact}</Cell>
                      <Cell>{item?.userProfile?.email}</Cell>
                      <Cell>{item?.role?.name}</Cell>
                      <Cell>
                        {format(parseISO(item?.createdAt), "dd/MM/yyyy")}
                      </Cell>
                      <Cell>
                        <div className="staff-actions">
                          <button
                            onClick={(e) =>
                              navigate(
                                `/dashboard/staff-account/edit-staff-account/${item._id}`
                              )
                            }
                          >
                            <FaEdit size={18} color="#36454F" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModal(true),
                                setStaffIdToDelete(item?._id);
                              setDeleteStaffName(
                                `${item?.userProfile?.fullName?.surname} ${item?.userProfile?.fullName?.surname}`
                              );
                            }}
                          >
                            <MdDeleteOutline
                              size={18}
                              color="oklch(70.4% 0.191 22.216)"
                            />
                          </button>
                        </div>
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
