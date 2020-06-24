import React from "react";
import {Ticket} from "../../types";
import styled from "styled-components";
import Moment from "react-moment";

const TableContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 10px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    max-width: 100%;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgb(255, 255, 255);
`;

const TableHead = styled.div`
    display: flex;
    text-align: left;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
    display: flex;
    -webkit-box-align: stretch;
    align-items: stretch;
    align-content: stretch;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.87);
    background-color: rgb(255, 255, 255);
    min-height: 32px;
    
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0, 0, 0, 0.12);
    
    &.header-row {
        div {
              color: #808080;
              font-size: 0.9rem;
              font-weight: 500;
        }
    }
`;

const TableCol = styled.div`
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    line-height: normal;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    padding-left: 10px;

    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0px;
    max-width: 100%;
    min-width: 100px;
    
    &.id {
      max-width: 5px;
    }
`;

type TableProps = {
    data: Ticket[];
}

export const Table: React.FC<TableProps> = ({data}) => {

    return (
        <TableContainer>
            <TableHead>
                <TableRow className="header-row">
                    <TableCol className="id">#</TableCol>
                    <TableCol>Номера билета</TableCol>
                    <TableCol>Дата записи</TableCol>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    data.map((ticket: Ticket, index: number) => (
                        <TableRow key={index}>
                            <TableCol className="id">{index + 1}.</TableCol>
                            <TableCol dangerouslySetInnerHTML={{ __html: ticket.numbers}} />
                            <TableCol> <Moment format={"DD/MM/YYYY HH:mm:ss"}>{ticket.created}</Moment></TableCol>
                        </TableRow>
                    ))
                }
            </TableBody>
        </TableContainer>
    )
}