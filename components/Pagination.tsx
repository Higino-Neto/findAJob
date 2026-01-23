"use client";

import { PaginationButton } from "./PaginationButton";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={isFirstPage}
        >
          First Page
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          Previews Page
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          Next Page
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={isLastPage}
        >
          Last Page
        </PaginationButton>
      </div>
      <a className="text-end my-3 mr-2">
        {currentPage} of {totalPages} pages
      </a>
      <hr className="text-gray-400" />
    </div>
  );
}
