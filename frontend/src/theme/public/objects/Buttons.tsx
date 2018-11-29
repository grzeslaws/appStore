import styled, {css} from "..";

interface Button {
    small?: boolean;
    htmlFor?: string;
}

const Button = styled<Button, "button">("button")`
    color: ${props => props.theme.colors.colorWhite};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: normal;
    padding: ${props => props.theme.spacing.defaultSpacing(0.3) + " " + props.theme.spacing.defaultSpacing(2)};
    min-height: ${props => (props.small ? props.theme.spacing.defaultSpacing(3) : props.theme.spacing.defaultSpacing(4))};
    border-radius: ${props => props.theme.radius.defaultRadius};
    background-color: ${props => props.theme.colors.colorPrimary()};
    font-size: ${props => props.theme.fonts.h4};
    outline: 0;
    cursor: pointer;
    transition: ${props => props.theme.transitions.transitionDefault};
    border: none;
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: center;
    height: fit-content;

    &:hover {
        opacity: 0.8;
    }
`;

const InvertedCss = css`
    background-color: ${props => props.theme.colors.colorWhite};
    border: 1px solid ${props => props.theme.colors.colorPrimary()};
    color: ${props => props.theme.colors.colorPrimary()};
`;

const ButtonInverted = styled(Button)`
    ${InvertedCss}
`;

const ButtonAlert = styled(Button)`
    background-color: ${props => props.theme.colors.colorAlert};
`;

const ButtonSuccess = styled(Button)`
    background-color: ${props => props.theme.colors.colorSuccess()};
`;

const ButtonFile = styled(Button.withComponent("label"))`${InvertedCss}`;

export { Button, ButtonInverted, ButtonFile, ButtonAlert, ButtonSuccess };
