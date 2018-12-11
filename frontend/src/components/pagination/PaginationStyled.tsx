import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "../../theme/public";

export const LinkItem = styled<{ current?: boolean } & LinkProps>(({ current, ...rest }) => <Link {...rest} />)`
    background-color: ${props => {
        if (props.current) {
            return props.theme.colors.colorGray(0.5);
        } else {
            return props.theme.colors.colorGray();
        }
    }};
    color: ${props => props.theme.colors.colorWhite};
    border-radius: ${props => props.theme.radius.smallRadius};
    margin-right: ${props => props.theme.spacing.defaultSpacing(0.5)};
    padding-left: ${props => props.theme.spacing.defaultSpacing(0.2)};
    padding-right: ${props => props.theme.spacing.defaultSpacing(0.2)};
    min-width: ${props => props.theme.spacing.defaultSpacing(2)};
    min-height: ${props => props.theme.spacing.defaultSpacing(2)};
    text-align: center;
    cursor: ${props => {
        if (props.current) {
            return "not-allowed";
        } else {
            return null;
        }
    }};
`;

export const Wrapper = styled.div`
    margin-top: ${props => props.theme.spacing.defaultSpacing(3)};
    display: flex;
`;
