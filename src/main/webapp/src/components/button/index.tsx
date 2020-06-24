import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    text-align: center;
    cursor: pointer;
    border: 0 solid transparent;
    padding: .9rem 1.5rem;
    border-radius: .4285rem;
    background-color: #7367f0;

    position: relative;
    overflow: hidden;
    outline: none;
    font-weight: 400;
    color: #fff;
    vertical-align: middle;
    user-select: none;
    font-size: 0.85rem;
    line-height: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 41px;
    
    :hover {
       background-color: #887ef2;
    }
`;

type ButtonProps = {
    onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ onClick, ...props }) => (
    <StyledButton onClick={ onClick } {...props}>
        { props.children }
    </StyledButton>
)