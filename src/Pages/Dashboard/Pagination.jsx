import React, {useState} from 'react';
import './Pagination.css';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='pagination'>
            <button onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                    Previous
            </button>
            {[...Array(totalPages)].map((_, index) =>{
                const pageNumber = index + 1;
                return (
                        <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={currentPage === pageNumber ? 'active' : ''}>
                            {pageNumber}
                        </button>
                );
            })}
            <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
                Next
            </button>

        </div>
    );
};
export default Pagination;