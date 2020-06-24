import React from "react";
import styled from "styled-components";
import classNames from "classnames";

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
    
    &.danger {
      background-color: #ea5455;
      :hover {background-color: #ec6a6b}
    }
`;

type ButtonProps = {
    onClick: () => void;
    className?: string;

}

export const Button: React.FC<ButtonProps> = ({onClick, ...props}) => (
    <StyledButton  {...props}
                   onClick={onClick}
                   className={classNames('button ' + props.className)}>

        {props.children}
    </StyledButton>
)