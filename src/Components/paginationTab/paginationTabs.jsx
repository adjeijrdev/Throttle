import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import "./paginationTab.css"

function PaginatedTabs({ pageCount, setItemOffset }) {
 


  const handlePageClick = (event) => {
    setItemOffset(event.selected);
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

    
      />
    </>
  );
}


export default PaginatedTabs