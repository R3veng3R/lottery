import React, {ChangeEvent} from "react";
import {Button} from "../button";
import styled from "styled-components";

export const INPUT_ID = 'hidden-file-input';
const ACCEPTED_FILES = '.txt, .csv';

const Container = styled.div`
  margin-left: 5px;
`;

type UploaderProps = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const FileUploader: React.FC<UploaderProps> = ({onChange}) => {
    const onButtonClick = () => {
        const input = document.getElementById(INPUT_ID);

        if (input) {
            input.click();
        }
    }

    return (
        <Container>
            <Button onClick={ onButtonClick }> Загрузить </Button>
            <input type="file"
                   accept={ACCEPTED_FILES}
                   id={INPUT_ID}
                   onChange={onChange}
                   style={{display: 'none'}}
            />
        </Container>
    )
}