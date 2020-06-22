import React from "react";
import styled from "styled-components";
import {RiShutDownLine} from "react-icons/ri";
import Api from "../../utils/Api";

const Container = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #640064 linear-gradient(30deg,#7367f0,rgba(115,103,240,.6));
    color: #f1f1f1;
    min-height: 45px;
    
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`;

const Column = styled.div`
    min-width: 50%;
    min-height: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const StyledButton = styled.div`
    align-items: center;
    justify-content: center;
    min-height: inherit;
    width: 45px;
    background-image: linear-gradient(30deg,#ea5455,rgba(234,84,85,.5));
    position: relative;
    display: flex;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    box-shadow: -4px 1px 26px -5px rgba(238,87,87,0.50);
     
    :hover {
        background-image: linear-gradient(30deg,#e42728,rgba(236,102,103,0.5));
   
    }
`;

export const Header: React.FC = () => {

    const shutDownApp = async () => {
        const result = await Api.post("/actuator/shutdown");

        if (result.status === 200) {
            // TODO: redirect to bye;
        }
    }

    return (
        <Container>
            <Column/>

            <Column>
                <StyledButton onClick={ shutDownApp }> <RiShutDownLine size={'2rem'}/> </StyledButton>
            </Column>
        </Container>
    )
}