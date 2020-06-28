import {Header} from "../header";
import React from "react";
import {BodyContainer} from "../../pages/styles/home-styles";
import styled from "styled-components";
import {BsInfoSquare} from "react-icons/bs";

const EXIT_MESSAGE = "Программа выгружена. БД сохранена, спасибо. Это окно можно теперь закрыть"

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 8%;
  max-height: 8rem;
  max-width: 350px;
  border: 1px solid #cecece;
  border-radius: .5rem;
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  padding-right: 2rem;
  padding-left: 2rem;
  background-color: #fff;
`;

const Text = styled.p`
  margin: 0 0 0 15px;
  line-height: 1.45;
  color: #626262;
  font-weight: 400;
`;

export const ExitScreen: React.FC = () => (
    <>
        <Header disabled/>
        <BodyContainer>
            <TextWrapper>
                <BsInfoSquare fontSize={ '5.5rem' } color={"#7367f0"}/>
                <Text>
                    {EXIT_MESSAGE}
                </Text>
            </TextWrapper>
        </BodyContainer>
    </>
)