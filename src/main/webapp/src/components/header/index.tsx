import React from "react";
import styled from "styled-components";

const Container = styled.header`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #640064 linear-gradient(30deg,#7367f0,rgba(115,103,240,.6));
    color: #f1f1f1;
    min-height: 45px;
    
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
`;

export const Header: React.FC = () => {

    return (
        <Container>
            <div>123</div>
            <div>456</div>
        </Container>
    )
}