import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import {Button} from "../button";
import {Label} from "../../pages/styles/home-styles";

const CONFIRM_MESSAGE_DELETE = "Вы уверены, что хотите отчистить базу?";
const CONFIRM_MESSAGE_NO_RETURN = "Данные невозможно будет вернуть";

const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -30%)',
        boxShadow: '10px 10px 12px 1px rgba(0,0,0,0.33)'
    },
    overlay: {
        backgroundColor: 'rgba(40, 44, 52, 0.5)'
    },
};

const Container = styled.div`
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

type ModalProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
}

export const ConfirmDeleteModal: React.FC<ModalProps> = ({isOpen, onConfirm, onCancel}) => {

    return (
        <ReactModal
            style={customStyles}
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <Container>
                <div style={{marginBottom: '2rem'}}>
                    <Label>{CONFIRM_MESSAGE_DELETE}</Label>
                    <br/>
                    <Label className="margin-bot-5">{CONFIRM_MESSAGE_NO_RETURN}</Label>
                </div>

                <FlexWrapper>
                    <Button className={'danger'} onClick={onConfirm}>Удалить</Button>
                    <Button onClick={onCancel}>Отмена</Button>
                </FlexWrapper>
            </Container>
        </ReactModal>
    )
}