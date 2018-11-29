import IconClose from "-!svg-react-loader?name=Icon!../../../assets/images/icon-close.svg";
import { MessageType } from "../../../model/Message";
import styled, { keyframes } from "../../../theme/admin";
import { hoverOpacity } from "../../../theme/admin/tools/utils";

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

const showMessage = keyframes`
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

export const WrapperMessage = styled<Type, "div">("div")`
    background-color: ${props => {
        if (props.type === MessageType.succces) {
            return props.theme.colors.colorSuccess();
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
    opacity: ${props => (props.show ? 1 : 0)};
    animation: ${showMessage} ${props => props.theme.transitions.transitionDefault};
`;

export const IconToClose = styled(IconClose)`
    ${hoverOpacity}

    fill: ${props => props.theme.colors.colorWhite};
    position: absolute;
    right: ${props => props.theme.spacing.defaultSpacing(2.5)};
    cursor: pointer;
    width: ${props => props.theme.spacing.defaultSpacing(2)};
`;
