import React from "react";
import ReactPaginate from "react-paginate";
import {TicketPage} from "../../types";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  margin-top: 40px;
  min-height: 50px;
  
  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    font-size: 0.95rem;
    
    li {
      cursor: pointer;
      
      &.active {
        a {
           color: #7367f0;
           opacity: 1;
        } 

      }
      
      a {    
        padding: 0 5px;
        outline: none;
        font-weight: 500;
        opacity: 0.2;
      }
    }
  }
`;

const TotalText = styled.p`
    color: #808080;
    line-height: 1.5rem;
`;
type PaginationProps = {
    onPageChange: (selectedItem: { selected: number }) => void;
    page: TicketPage
}

export const Pagination: React.FC<PaginationProps> = ({onPageChange, page}) => {
    if (page.content.length) {
        return (
            <PaginationWrapper>
                <TotalText>Всего записей: {page.totalElements}</TotalText>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={page.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={onPageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </PaginationWrapper>
        )
    } else {
        return (
            <PaginationWrapper/>
        )
    }
}