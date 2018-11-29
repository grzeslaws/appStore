import { hoverOpacity, placeholder, postsStatusColor, statusColor } from "../../../theme/admin/tools/utils";

import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import styled from "../../../theme/admin";
import { H2 } from "../../../theme/admin/elements/Headings";
import { WrapperSelect } from "../../../theme/admin/objects/Forms";
import { label } from "../../../theme/admin/tools/labels";

interface Status {
    status: string;
}

interface ColorBox {
    color: string;
    isSelected: boolean;
}

interface PostStatus {
    color: string;
    isSelected?: boolean;
}

interface Label {
    marginLeft?: boolean;
}

export const WrapperContent = styled.div`
    flex: 1;
`;

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

export const Label = styled<Label, "span">("span")`
    font-weight: ${props => props.theme.fonts.fontLight};
    font-size: ${props => props.theme.fonts.small};
    color: ${props => props.theme.colors.colorGray()};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};

    margin-left: ${props => (props.marginLeft ? props.theme.spacing.defaultSpacing() : null)};
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
    ${label}
    background-color: ${props => statusColor(props)};
`;

export const StatusWrapper = styled.span`
    margin-left: auto;
`;

const DebounceInputTemp = styled(DebounceInput)``;

export const SearchInput = styled(DebounceInputTemp.withComponent("input"))`
    border: 1px solid ${props => props.theme.colors.colorGrayLight()};
    border-radius: ${props => props.theme.radius.defaultRadius};
    min-height: ${props => props.theme.spacing.defaultSpacing(4)};
    padding: 0 ${props => props.theme.spacing.defaultSpacing(1)};
    font-size: ${props => props.theme.fonts.h4};
    color: ${props => props.theme.colors.colorGray()};
    outline: 0;
    transition: ${props => props.theme.transitions.transitionDefault};
    color: ${props => props.theme.colors.colorGray()};
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    ${props => placeholder(props.theme.colors.colorGray(), props.theme.fonts.fontLight, props.theme.fonts.fontFamilyDefault, props.theme.fonts.h5)};
    flex: 2;

    &:focus {
        border-color: ${props => props.theme.colors.colorPrimary()};
        color: ${props => props.theme.colors.colorPrimary()};
    }
`;

export const WrapperInputs = styled.div`
    display: flex;
`;

export const WrapperSelectMod = styled(WrapperSelect)`
    flex: 1;
    margin-left: ${props => props.theme.spacing.defaultSpacing(2)};
`;

export const ColorBox = styled<ColorBox, "div">("div")`
    width: ${props => props.theme.spacing.defaultSpacing(2)};
    height: ${props => props.theme.spacing.defaultSpacing(2)};
    background-color: ${props => (props.isSelected ? postsStatusColor(props) : "transparent")};
    border: 1px solid ${props => postsStatusColor(props)};
    border-radius: ${props => props.theme.radius.defaultRadius};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    cursor: pointer;
    ${hoverOpacity}
`;

export const WrapperColorBox = styled.div`
    display: flex;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
`;

export const PostStatusLabel = styled<PostStatus, "span">("span")`
    ${label}
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.3)};
    background-color: ${props => {
        if (props.isSelected) {
            return postsStatusColor(props);
        } else {
            return props.theme.colors.colorWhite;
        }
    }};
    border: 1px solid ${props => postsStatusColor(props)};
    color: ${props => {
        if (props.isSelected) {
            return props.theme.colors.colorWhite;
        } else {
            return postsStatusColor(props);
        }
    }};
    cursor: ${props => {
        if (props.isSelected) {
            return null;
        } else {
            return "pointer";
        }
    }};

    ${props => (!props.isSelected ? hoverOpacity : null)}

`;

export const WrapperPostStatus = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

export const RemovePostStatus = styled.span`
    ${hoverOpacity};
    cursor: pointer;
    margin-left: ${props => props.theme.spacing.defaultSpacing(0.3)};
`;
