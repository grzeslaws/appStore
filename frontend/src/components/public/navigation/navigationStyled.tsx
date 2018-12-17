import IconCart from "-!svg-react-loader?name=Icon!../../../assets/images/icon-cart.svg";
import { Link, NavLink } from "react-router-dom";
import styled from "../../../theme/public";

export const WrapperNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
`;

export const WrapperMenu = styled.ul`
    display: flex;
    color: ${props => props.theme.colors.colorGray()};
    font-weight: ${props => props.theme.fonts.fontBold};
`;

export const MenuItem = styled.li`
    display: flex;
    margin-right: ${props => props.theme.spacing.defaultSpacing()};
`;

export const MenuLink = styled(NavLink)`
    color: ${props => props.theme.colors.colorGray()};

    &:hover {
        color: ${props => props.theme.colors.colorPrimary()};
    }

    &.active {
        color: ${props => props.theme.colors.colorPrimary()};
    }
`;

export const WrapperCart = styled(Link)`
    display: flex;
    position: relative;
`;

export const Icon = styled(IconCart)`
    height: ${props => props.theme.spacing.defaultSpacing(4)};
    fill: ${props => props.theme.colors.colorGray()};
`;

export const Counter = styled.div`
    position: absolute;
    right: -3px;
    top: -4px;
    font-size: ${props => props.theme.fonts.small};
    background-color: ${props => props.theme.colors.colorAlert()};
    border-radius: ${props => props.theme.radius.ovalRadius};
    min-height: ${props => props.theme.spacing.defaultSpacing(2)};
    min-width: ${props => props.theme.spacing.defaultSpacing(2)};
    color: ${props => props.theme.colors.colorWhite()};
    justify-content: center;
    align-items: center;
    display: flex;
    padding-left: ${props => props.theme.spacing.defaultSpacing(0.5)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;
