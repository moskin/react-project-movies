import React from 'react';
import '../stylesheets/PaginationStyle.css'

import Pagination from "react-js-pagination";

const MoviesPagination = props => {

    const {currentPage, totalPages, changeCurrentPage} = props;
    // const pageNumbers = Array.from(Array(totalPages), (x, index) => index + 1);

    return (
        <>
            <Pagination
                hideFirstLastPages
                pageRangeDisplayed={5}
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={totalPages}
                onChange={changeCurrentPage}
                innerClass={'pagination'}
                activeClass={'activeLi'}
                itemClass={'item'}
                linkClass={'link'}
                activeLinkClass={'activeLink'}
            />
        </>
    );
};
export default MoviesPagination;
