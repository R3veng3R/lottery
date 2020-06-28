import React, {ChangeEvent, useEffect, useState} from "react";
import {Header} from "../components/header";
import {Button} from "../components/button";
import {GoPlus, GoSearch} from "react-icons/go";
import Api from "../utils/Api";
import {Loader} from "../components/loader";
import {InputEvent, TicketPage} from "../types";
import {BodyContainer, Content, FlexWrapper, Input, Label} from "./styles/home-styles";
import {FileUploader} from "../components/file-upload";
import {Table} from "../components/table";
import {Pagination} from "../components/pagination";
import {DEFAULT_PAGE_SIZE} from "../constants/AppConstants";
import {ExitScreen} from "../components/exit-screen";

const DEFAULT_TICKET_PAGE: TicketPage = {
    content: [], empty: true, totalElements: 0, totalPages: 0, number: 0
}

export const HomePage: React.FC = () => {
    const [ticketPage, setTicketPage] = useState<TicketPage>(DEFAULT_TICKET_PAGE);
    const [searchPage, setSearchPage] = useState<TicketPage>(DEFAULT_TICKET_PAGE);

    const [numbers, setNumbers] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isAppClosed, setAppClosed] = useState<boolean>(false);

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
            const searchArray = searchValue.split(" ");

            page.content.forEach(ticket => {
                searchArray.forEach(string => {
                    ticket.numbers = ticket.numbers.trim()
                        .split(' ').join('&nbsp;')
                        .replace(new RegExp('(?!\/mark)' + string, 'g'), `<mark>${string}</mark>`);
                });
            });

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
            setNumbers("");
        }

        setLoading(false);
    }

    const searchTicket = async () => {
        if (!searchValue.length) return;

        setLoading(true);
        await getSearchPage(0);
        setLoading(false);
    }

    const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();

        if (event.target.files?.length) {
            setLoading(true);

            const file = event.target.files[0];
            const form = new FormData();
            form.append("file", file);
            const result = await Api.post(
                "/api/ticket/upload", form,
                {headers: {'Content-Type': 'multipart/form-data'}});

            if (result.status === 200) {
                await getTicketPage(0);
            }
        }

        event.target.value = "";
        setLoading(false);
    }

    const onEnterKey = (event: React.KeyboardEvent, type: InputEvent) => {
        if (event.key === 'Enter') {
            switch (type) {
                case InputEvent.Input:
                    return addTicket();

                case InputEvent.Search:
                    return searchTicket();
            }
        }
    }

    if (isAppClosed) {
        return ( <ExitScreen /> );
    }

    return (
        <>
            <Header onAppShutdown = { () => setAppClosed(true) } />

            <BodyContainer>
                <Content>
                    <Label>Введите номера из билета:</Label>
                    <br/>
                    <FlexWrapper>
                        <Input type="text" className="ticket-input margin-right-5"
                               value={numbers}
                               onKeyUp={ (event: React.KeyboardEvent) => onEnterKey(event, InputEvent.Input) }
                               onChange={({target}) => setNumbers(target.value)}/>

                        <Button onClick={addTicket}>
                            <GoPlus size={'1rem'} color={'#fff'}/>
                            &nbsp; Добавить
                        </Button>

                        <FileUploader onChange={onFileChange}/>
                    </FlexWrapper>

                    <Pagination  page={ticketPage} onPageChange={
                        ({selected}) => {
                            setLoading(true);
                            getTicketPage(selected)
                                .then(() => setLoading(false));
                        }} />
                    <Table data={ticketPage.content} page={ticketPage.number}/>
                </Content>

                <Content>
                    <Label>Поиск выйгрышных номеров:</Label>
                    <br/>
                    <FlexWrapper>
                        <Input type="text" className="ticket-search margin-right-5"
                               value={searchValue}
                               onKeyUp={ (event: React.KeyboardEvent) => onEnterKey(event, InputEvent.Search) }
                               onChange={({target}) => setSearchValue(target.value)}/>

                        <Button onClick={searchTicket}>
                            <GoSearch size={'1rem'} color={'#fff'}/>
                            &nbsp; Поиск
                        </Button>
                    </FlexWrapper>

                    <Pagination page={searchPage} onPageChange={
                        ({selected}) => {
                            setLoading(true);
                            getSearchPage(selected)
                                .then(() => setLoading(false));
                        }}/>
                    <Table data={searchPage.content} page={searchPage.number}/>

                </Content>
                <Loader isHidden={!isLoading}/>
            </BodyContainer>
        </>
    )
}