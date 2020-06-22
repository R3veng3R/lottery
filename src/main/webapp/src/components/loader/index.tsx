import React from "react";
import styled from "styled-components";

import LoaderSrc from "./assets/loader.svg";

const Container = styled.div<{isHidden: boolean}>`
    display: ${ props => props.isHidden ? 'none' : 'flex' };
    justify-content: center;
    align-items: center;
    background:rgba(40, 44, 52, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 1000;
`;

type Props = {
    isHidden: boolean;
}

export const Loader: React.FC<Props> = ({ isHidden }) => (
    <Container isHidden={isHidden} >
        <img src={LoaderSrc} alt="" />
    </Container>
)