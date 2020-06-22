import React, {useEffect, useState} from "react";
import {Header} from "../components/header";
import styled from "styled-components";
import {Button} from "../components/button";
import {GoPlus, GoSearch} from "react-icons/go";
import Api from "../utils/Api";
import {Loader} from "../components/loader";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.section`
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  .margin-right-5 {
    margin-right: 5px;
  }
`;

const Container = styled.div`
  padding: 1rem;
  min-width: 48%;
  min-height: 80vh;
  margin-bottom: 2.2rem;
  border: 1px solid rgba(206,206,206,0.35);
  border-radius: .5rem;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  background-color: #fff;
`;

const Input = styled.input`
  border: 1px solid #d9d9d9;
  padding: .6rem;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  
  width: 50%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
`;

const Label = styled.label`
  color: #c7c7c7;
  line-height: 1.5rem;
`;

export const HomePage: React.FC = () => {
    const [ticketList, setTicketList] = useState([]);
    const [numbers, setNumbers] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);

        getTicketList()
            .then( () => setLoading(false));

    }, []);


    const getTicketList = async () => {
        const result = await Api.get("/api/ticket");
        if (result.status === 200) {
            setTicketList(result.data);
        }
    }

    const addTicket = async () => {
        if (!numbers.length) return;

        setLoading(true);

        const result = await Api.post("/api/ticket", {numbers});
        if(result.status === 200) {
            await getTicketList();
        }

        setLoading(false);
    }

    const searchTickets = async () => {

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
                            ticketList.map( (ticket: any) =>
                                <li> {ticket.id}. {ticket.numbers} </li>
                            )
                        }
                    </ul>

                </Container>

                <Container>
                    <Label>Поиск выйгрышных номеров:</Label>
                    <br/>
                    <FlexWrapper>
                        <Input type="text" className="ticket-search margin-right-5"/>
                        <Button onClick={searchTickets}>
                            <GoSearch size={'1rem'} color={'#fff'}/>
                            &nbsp; Поиск
                        </Button>
                    </FlexWrapper>
                </Container>

                <Loader isHidden={ !isLoading } />
            </Content>
        </>
    )
}