import React from "react";

import "./Pagination.css";
export default function Pagination({
    handlePageChange,
    currentPage,
    totalPages,
}) {
    const maxVisiblePages = 10;
    let pagesToShow = [];

    if (totalPages <= maxVisiblePages) {
        pagesToShow = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        pagesToShow = [1];

        if (start > 2) pagesToShow.push("...");

        for (let i = start; i <= end; i++) {
            pagesToShow.push(i);
        }

        if (end < totalPages - 1) pagesToShow.push("...");

        pagesToShow.push(totalPages);
    }

    return (
        <div className="pagination">
            {pagesToShow.map((page, index) => (
                <React.Fragment key={index}>
                    {page === "..." ? (
                        <span className="pagination_dots">...</span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                            className={page === currentPage ? "pagination_button active" : "pagination_button"}
                        >
                            {page}
                        </button>
                    )}
                    {index !== pagesToShow.length - 1 && <span className="pagination_separator"></span>}
                </React.Fragment>
            ))}
        </div>
    );
}
