import React, {useEffect, useState} from "react";
import {RiShutDownLine} from "react-icons/ri";
import Api from "../../utils/Api";
import {Button} from "../button";
import {Column, Container, StyledButton, Version} from "./header-styles";
import {MdDeleteForever} from "react-icons/md";
import {ConfirmDeleteModal} from "../confirm-truncate-modal";

export const Header: React.FC = () => {
    const [showTruncateModal, setShowTruncateModal] = useState<boolean>(false);
    const [appVersion, setAppVersion] = useState<string | null>(null);

    useEffect(() => {
        getAppVersion()
            .then((result) => {
                if (result.status === 200) {
                    setAppVersion(result.data.version);
                }
            });
    }, []);

    const shutDownApp = async () => {
        const result = await Api.post("/api/shutdown");

        if (result.status === 200) {
            // TODO: redirect to bye;
        }
    }

    const truncateData = async () => {
        const result = await Api.delete("/api/ticket/truncate");

        if (result.status === 200) {
            window.location.reload();
        }
    }

    const getAppVersion = async () => {
        return await Api.get("/version.json");
    }

    return (
        <Container>
            <Column>
                <Button className="danger"
                        onClick={ () => setShowTruncateModal(true) }>
                    <MdDeleteForever size={'1.3rem'}/>&nbsp;Отчистить базу
                </Button>
            </Column>

            <Column className="justify-flex-end">
                <Version>{ 'App version: 1.0.' + appVersion }</Version>
                <StyledButton onClick={ shutDownApp }> <RiShutDownLine size={'2rem'}/> </StyledButton>
            </Column>

            <ConfirmDeleteModal
                isOpen={showTruncateModal}
                onCancel={() => setShowTruncateModal(false)}
                onConfirm={ truncateData }
            />
        </Container>
    )
}