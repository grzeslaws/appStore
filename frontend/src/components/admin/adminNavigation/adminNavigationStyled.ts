import { Link } from "react-router-dom";
import styled from "../../../theme/admin";
import { ButtonInverted } from "../../../theme/admin/objects/Buttons";

export const WrapperMenu = styled.ul`
    display: flex;
`;

export const MenuItem = styled.li`
    margin-right: ${props => props.theme.spacing.defaultSpacing(2)};
`;

export const LinkStyled = styled(Link)`
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    color: ${props => props.theme.colors.colorGray()};
    text-decoration: none;
    font-weight: bold;
    transition: ${props => props.theme.transitions.transitionDefault};

    &:hover {
        color: ${props => props.theme.colors.colorPrimary()};
    }
`;

export const WrapperNavigation = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(1.8)};
    border-bottom: 1px solid ${props => props.theme.colors.colorGrayLight};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const LogoutButton = styled(ButtonInverted)`
    margin-left: auto;
`;
