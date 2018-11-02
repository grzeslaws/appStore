import styled from "../../../theme/admin";
import { hoverOpacity } from "../../../theme/admin/tools/utils";

export const WrapperItems = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

export const Item = styled.li`

    &:after {
        content: "/";
        margin-left: ${props => props.theme.spacing.defaultSpacing(1)};
        margin-right: ${props => props.theme.spacing.defaultSpacing(1)};
    }

    &:last-child {
        &:after {
            display: none;
        }
    }
`;

export const ItemText = styled.span`
    margin-left: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;

export const ItemRemove = styled(ItemText)`
    color: ${props => props.theme.colors.colorAlert};
    font-size: ${props => props.theme.fonts.small};
    cursor: pointer;
    ${hoverOpacity()};
`;
