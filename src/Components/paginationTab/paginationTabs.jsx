import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import "./paginationTab.css"

function PaginatedTabs({ totalRecords, setItemOffset, offSet,itemsPerPage,fetchMore}) {
 
 const pageCount = Math.ceil(totalRecords / itemsPerPage);



  const handlePageClick = (event) => {
    setItemOffset(event.selected * itemsPerPage);

    fetchMore({
      variables: { offset: event.selected * itemsPerPage,limit: itemsPerPage }
    })
  };

  return (
    <>
      
      <ReactPaginate
        // breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakClassName="ellipsis-container"
        breakLinkClassName ="ellipsis-element"
        pageClassName="pg-tab"
        pageLinkClassName="pg-tab-element"
        activeClassName="active-tab"
        activeLinkClassName="active-tab-element"
        previousClassName="prev-tab"
        nextClassName="next-tab"
        previousLinkClassName="prev-tab-element"
        disabledClassName="prev-next-disable"
        disabledLinkClassName="prev-next-disable-element"
        className='pagination-tb'
        forcePage={offSet / itemsPerPage}
    
      />
    </>
  );
}


export default PaginatedTabs