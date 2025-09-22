import "./DeniedAccount.module.css";

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
import { useSearchB } from "../../../graphql/graphqlConfiguration";
import { GET_ALL_3PLS } from "../../../graphql/generalQueries";
import CustomSearchInput from "../../../Components/searchInputBox/CustomSearchInput";

export default function DeniedAccount() {
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [search3pl, setSearch3pl] = useState("");

  let navigate = useNavigate();
  let itemsPerPage = 15;

  const {
    debouncedSearch,
    loading: T3plLoading,
    data: T3plData,
    error: T3plError,
    fetchMore: fetchMoreT3pls,
  } = useSearchB(GET_ALL_3PLS, itemOffset, itemsPerPage, "DENIED");

  const totalNumberOf3Pls = T3plData?.T3pls?.totalCount;

  const handleSearch = (e) => {
    setSearch3pl(e);
    debouncedSearch(e);
  };

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
      <div className="vd-pending-title">Denied 3PL Accounts</div>

      <div className="table-container-st">
        <div className="full-search-container">
          <CustomSearchInput
            bgColor={"white"}
            placeholder="Search by company name, contact, office email or region"
            value={search3pl}
            onChange={handleSearch}
          />
        </div>

        <Table
          data={{ nodes: [...(T3plData?.T3pls?.data || [])] }}
          theme={tableTheme}
        >
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
                  <HeaderCell>Area of Operation</HeaderCell>
                  <HeaderCell>Region</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {
                  tableList?.length === 0 && (
                    <Row>
                      <Cell></Cell>
                      <Cell></Cell>
                      <Cell></Cell>
                      <Cell></Cell>
                      <Cell>No Data</Cell>
                      <Cell></Cell>
                      <Cell></Cell>

                    </Row>
                  )
                }
                {tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <input type="checkbox" />
                    </Cell>
                    <Cell>{item?.businessInfo?.companyName}</Cell>
                    <Cell>{item?.contactDetails?.name}</Cell>
                    <Cell>{item?.contactDetails?.phoneNumber}</Cell>
                    <Cell>{item?.contactDetails?.email}</Cell>
                    <Cell>{item?.businessInfo?.streetAddress}</Cell>
                    <Cell>{item?.businessInfo?.region} </Cell>
                    <Cell>
                      {" "}
                      <button
                        className="status-btn-st"
                        onClick={() =>
                          navigate(
                            `/dashboard/3pls/Denied-Account/details/${item?._id}`,
                            {
                              state: { status: "DENIED" },
                            }
                          )
                        }
                      >
                        Denied
                      </button>{" "}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>

        <div className="pagination-tab">
          <PaginatedTabs
            totalRecords={totalNumberOf3Pls}
            setItemOffset={setItemOffset}
            offSet={itemOffset}
            itemsPerPage={itemsPerPage}
            fetchMore={fetchMoreT3pls}
          />
        </div>
      </div>
    </div>
  );
}
