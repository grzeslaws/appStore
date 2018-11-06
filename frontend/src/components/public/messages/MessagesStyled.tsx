import { MessageType } from "../../../model/Message";
import styled from "../../../theme/admin";

interface Type {
    type?: MessageType;
    show?: boolean;
}

export const Wrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
`;

export const WrapperMessage = styled<Type, "div">("div")`
    background-color: ${props => {
        if (props.type === MessageType.succces) {
            return props.theme.colors.colorSuccess;
        } else if (props.type === MessageType.error) {
            return props.theme.colors.colorAlert;
        } else if (props.type === MessageType.warning) {
            return props.theme.colors.colorGray();
        }
    }};
    min-height: ${props => props.theme.spacing.defaultSpacing(6)};
    color: ${props => props.theme.colors.colorWhite};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${props => props.theme.transitions.transitionDefault};
    opacity: ${props => props.show ? 1 : 0};
`;

export const RemoveMessage = styled.div`
    font-size: ${props => props.theme.fonts.h4};
    position: absolute;
    right: ${props => props.theme.spacing.defaultSpacing(2.5)};
    cursor: pointer;
`;
