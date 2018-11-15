import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import { StatusOrder } from "../../../redux/actions/orderActions";
import styled from "../../../theme/admin";
import { H2 } from "../../../theme/admin/elements/Headings";
import { Input } from "../../../theme/admin/objects/Forms";

interface Status {
    status: string;
}

export const WrapperOrder = styled(Link)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
    display: flex;
    color: ${props => props.theme.colors.colorGray()};
    transition: ${props => props.theme.transitions.transitionDefault};
    border-radius: ${props => props.theme.radius.defaultRadius};
    padding: ${props => props.theme.spacing.defaultSpacing(2)} ${props => props.theme.spacing.defaultSpacing(2)};

    &:nth-child(odd) {
        background-color: ${props => props.theme.colors.colorGrayLight(0.4)};
    }

    &:hover {
        background-color: ${props => props.theme.colors.colorGrayLight()};
    }
`;

export const Label = styled.span`
    font-weight: ${props => props.theme.fonts.fontLight};
    font-size: ${props => props.theme.fonts.small};
    color: ${props => props.theme.colors.colorGray()};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;

export const Row = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

export const Value = styled.span`
    margin-right: ${props => props.theme.spacing.defaultSpacing()};
    font-weight: ${props => props.theme.fonts.fontBold};
`;

export const ValueDescription = styled.span`
    font-weight: ${props => props.theme.fonts.fontLight};
`;

export const Headline = styled(H2)`
    font-weight: ${props => props.theme.fonts.fontLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    margin-top: ${props => props.theme.spacing.defaultSpacing(4)};
`;

export const WrapperProduct = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};

    &:last-child {
        margin-bottom: unset;
    }
`;

export const Status = styled<Status, "span">("span")`
    font-size: ${props => props.theme.fonts.small};
    background-color: ${props => {
        console.log(props.status);

        if (props.status === StatusOrder.canceled) {
            return props.theme.colors.colorAlert;
        } else if (props.status === StatusOrder.completed) {
            return props.theme.colors.colorSuccess;
        } else if (props.status === StatusOrder.pending) {
            return props.theme.colors.colorPrimary();
        } else if (props.status === StatusOrder.rejected) {
            return props.theme.colors.colorAlert;
        } else {
            return props.theme.colors.colorGray();
        }
    }};
    color: ${props => props.theme.colors.colorWhite};
    padding: ${props =>
        props.theme.spacing.defaultSpacing(0.1) + " " + props.theme.spacing.defaultSpacing(0.4) + " " + props.theme.spacing.defaultSpacing(0.2)};
    border-radius: ${props => props.theme.radius.smallRadius};
`;

export const StatusWrapper = styled.span`
    margin-left: auto;
`;

export const SearchInput = styled(Input.withComponent(DebounceInput))`

`;
