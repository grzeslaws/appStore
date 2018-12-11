import * as React from "react";
import * as ReactDOM from "react-dom";
import { I18N } from "../../../i18n/i18n";
import { ModalContent } from "../../../model/ModalContent";
import { Cancel, Modal, ModalWrapper, Title, WrapperButtons } from "./modalStyled";

export interface Props {
    i18n: I18N;
    modal: ModalContent;
    closeModal: () => any;
}

export class AdminModalComponent extends React.Component<Props, {}> {
    constructor(props: Props, private wrapperModal: HTMLElement, private elementModal: HTMLElement | null) {
        super(props);

        this.elementModal = document.querySelector("#modal");
        this.wrapperModal = document.createElement("div");
    }
    public render() {
        const { children, modal } = this.props;
        return ReactDOM.createPortal(
            <>
                {this.props.modal && (
                    <Modal onClick={this.props.closeModal}>
                        <ModalWrapper
                            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                event.stopPropagation();
                            }}>
                            <Title>{modal.title}</Title>
                            {modal.message}

                            <WrapperButtons>
                                {children}
                                <Cancel onClick={this.props.closeModal}>Cancel</Cancel>
                            </WrapperButtons>
                        </ModalWrapper>
                    </Modal>
                )}
            </>,
            this.wrapperModal,
        );
    }

    public componentDidMount() {
        if (!this.elementModal) {
            return;
        }
        this.elementModal.appendChild(this.wrapperModal);
    }

    public componentWillUnmount() {
        if (!this.elementModal) {
            return;
        }
        this.elementModal.removeChild(this.wrapperModal);
    }
}
