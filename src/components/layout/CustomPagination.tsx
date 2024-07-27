"use client";
import { useSearchParams , useRouter} from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";
import Pagination from "react-js-pagination";

interface Props {
  resPerPage: number;
  filteredRoomCount: number;
}
const CustomPagination = ({ resPerPage, filteredRoomCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;
  const handlePageChange = (currentPage: string) => {
    // alert(currentPage);
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };
  return (
    <div>
      {resPerPage < filteredRoomCount && (
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={filteredRoomCount}
            onChange={handlePageChange}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
