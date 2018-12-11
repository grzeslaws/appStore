import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { ModalContent } from "../../../model/ModalContent";
import store from "../../../redux/store/store";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Cancel, Modal, ModalWrapper, Title, WrapperButtons } from "./modalStyled";

export interface Props {
    i18n: Immutable<I18N>;
    modal: Immutable<ModalContent>;
    removeModal: () => any;
    updateSubmit: (flag: boolean) => any;
}

export class AdminModalComponent extends React.Component<Props, {}> {
    public render() {
        const { modal, children } = this.props;
        console.log(modal);

        return (
            <>
                {modal && (
                    <Modal onClick={this.closeModal}>
                        <ModalWrapper
                            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                event.stopPropagation();
                            }}>
                            <Title>{modal.title}</Title>
                            {modal.message}
                            {children}
                            <WrapperButtons>
                                <Button onClick={this.submit}>Submit</Button>
                                <Cancel onClick={this.closeModal}>Cancel</Cancel>
                            </WrapperButtons>
                        </ModalWrapper>
                    </Modal>
                )}
            </>
        );
    }

    private closeModal = () => this.props.removeModal()(store.dispatch);
    private submit = () => {
        this.props.updateSubmit(true)(store.dispatch);
        this.props.removeModal()(store.dispatch);
    };
}
