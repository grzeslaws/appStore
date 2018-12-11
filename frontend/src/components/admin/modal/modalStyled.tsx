import styled from "../../../theme/admin";
import { ButtonAlert } from "../../../theme/admin/objects/Buttons";

export const Modal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: ${props => props.theme.colors.colorWhite(0.8)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ModalWrapper = styled.div`
    width: ${props => props.theme.spacing.defaultSpacing(60)};
    background-color: ${props => props.theme.colors.colorGrayLight()};
    padding: ${props => props.theme.spacing.defaultSpacing(2)};
    border-radius: ${props => props.theme.radius.defaultRadius};
    position: relative;
`;

export const Title = styled.div`
    font-size: ${props => props.theme.fonts.h2};
    font-weight: ${props => props.theme.fonts.fontBold};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

export const WrapperButtons = styled.div`
    display: flex;
    margin-top: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const Cancel = styled(ButtonAlert)`
    margin-left: ${props => props.theme.spacing.defaultSpacing()};
`;
