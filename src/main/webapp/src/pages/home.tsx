import React, {useEffect, useState} from "react";
import {Header} from "../components/header";
import {Button} from "../components/button";
import {GoPlus, GoSearch} from "react-icons/go";
import Api from "../utils/Api";
import {Loader} from "../components/loader";
import {Ticket, TicketPage} from "../types";
import ReactPaginate from 'react-paginate';
import {Container, Content, FlexWrapper, Input, Label} from "./styles/home-styles";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_TICKET_PAGE: TicketPage = {
    content: [], empty: true, totalElements: 0, totalPages: 0, number: 0
}

export const HomePage: React.FC = () => {
    const [ticketPage, setTicketPage] = useState<TicketPage>(DEFAULT_TICKET_PAGE);
    const [searchPage, setSearchPage] = useState<TicketPage>(DEFAULT_TICKET_PAGE);

    const [numbers, setNumbers] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getTicketPage(0)
            .then(() => setLoading(false));

    }, []);


    const getTicketPage = async (page: number) => {
        const result = await Api.get(`/api/ticket?page=${page}&size=${DEFAULT_PAGE_SIZE}`);
        if (result.status === 200) {
            const page: TicketPage = result.data;
            setTicketPage(page);
            console.log("TicketsResult:", result);
        }
    }

    const getSearchPage = async (page: number) => {
        const result = await Api.get(`/api/ticket/search?query=${searchValue}&page=${page}&size=${DEFAULT_PAGE_SIZE}`);
        if (result.status === 200) {
            const page: TicketPage = result.data;
            setSearchPage(page);
            console.log("SearchResult", result);
        }
    }

    const addTicket = async () => {
        if (!numbers.length) return;

        setLoading(true);

        const result = await Api.post("/api/ticket", {numbers});
        if (result.status === 200) {
            await getTicketPage(ticketPage.number);
        }

        setLoading(false);
    }

    const searchTicket = async () => {
        if (!searchValue.length) return;

        setLoading(true);
        await getSearchPage(0);
        setLoading(false);
    }

    return (
        <>
            <Header/>

            <Content>
                <Container>
                    <Label>Введите номера из билета:</Label>
                    <br/>
                    <FlexWrapper>
                        <Input type="text" className="ticket-input margin-right-5"
                               value={numbers}
                               onChange={({target}) => setNumbers(target.value)}/>

                        <Button onClick={addTicket}>
                            <GoPlus size={'1rem'} color={'#fff'}/>
                            &nbsp; Добавить
                        </Button>
                    </FlexWrapper>

                    <ul>
                        {
                            ticketPage.content.map((ticket: Ticket, index: number) =>
                                <li key={index}> {ticket.id}. {ticket.numbers} </li>
                            )
                        }
                    </ul>

                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={ ticketPage.totalPages }
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={({selected}) => {
                            setLoading(true);
                            getTicketPage(selected)
                                .then(result => setLoading(false));
                        }}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />

                </Container>

                <Container>
                    <Label>Поиск выйгрышных номеров:</Label>
                    <br/>
                    <FlexWrapper>
                        <Input type="text" className="ticket-search margin-right-5"
                               value={searchValue}
                               onChange={({target}) => setSearchValue(target.value)} />

                        <Button onClick={searchTicket}>
                            <GoSearch size={'1rem'} color={'#fff'}/>
                            &nbsp; Поиск
                        </Button>
                    </FlexWrapper>


                    <ul>
                        {
                            searchPage.content.map((ticket: Ticket, index: number) =>
                                <li key={index}> {ticket.id}. {ticket.numbers} </li>
                            )
                        }
                    </ul>

                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={searchPage.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={({selected}) => {
                            setLoading(true);
                            getSearchPage(selected)
                                .then(result => setLoading(false));
                        }}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />

                </Container>

                <Loader isHidden={!isLoading}/>
            </Content>
        </>
    )
}