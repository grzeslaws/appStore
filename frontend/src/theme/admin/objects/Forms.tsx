import styled from "..";
import { hoverOpacity, placeholder } from "../tools/utils";

export interface FormInterface {
    big?: boolean;
}

interface Select {
    placeholderStyle?: boolean;
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing()};
`;

const Input = styled<FormInterface, "input">("input")`
    border: 1px solid ${props => props.theme.colors.colorGrayLight()};
    border-radius: ${props => props.theme.radius.defaultRadius};
    min-height: ${props => (props.big ? props.theme.spacing.defaultSpacing(4) : props.theme.spacing.defaultSpacing(3))};
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

    &:focus {
        border-color: ${props => props.theme.colors.colorPrimary()};
        color: ${props => props.theme.colors.colorPrimary()};
    }
`;

const TextArea = styled(Input.withComponent("textarea"))`
    min-height: ${props => props.theme.spacing.defaultSpacing(8)};
    padding-top: ${props => props.theme.spacing.defaultSpacing(1)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
`;

const Label = styled.label`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.8)};
    font-size: ${props => props.theme.fonts.h5};
    display: block;
`;

const WrapperSelect = styled(Input.withComponent("div"))`
    ${props => {
        const { paths, spacing, colors } = props.theme;
        return `
            ${hoverOpacity}
            position: relative;
            padding: 0;
            display: inline-flex;
            align-items: center;
            width: auto;
            cursor: pointer;
            height: max-content;

            &:before {
                content: "";
                position: relative;
                left: calc(100% - ${spacing.defaultSpacing(3.2)});
                width: ${spacing.defaultSpacing(0.1)};
                height: ${spacing.defaultSpacing(2)};
                background-color: ${colors.colorGrayLight()};
                display: inline-block;
                z-index: 0;
            }

            &:after {
                content: "";
                background-image: url(${paths.imagePath("arrow-breadcrumb.svg")});
                background-repeat: no-repeat;
                position: relative;
                right: ${spacing.defaultSpacing(1.4)};
                width: ${spacing.defaultSpacing(0.6)};
                height: ${spacing.defaultSpacing(1)};
                transform: rotate(90deg);
                display: inline-block;
                z-index: 0;
            }

            & > select {
                    background: none;
                    border: 0;
                    color: inherit;
                    outline: inherit;
                    appearance: none;
                    padding-left: ${spacing.defaultSpacing(1)};
                    padding-right: ${spacing.defaultSpacing(3)};
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                    font-family: inherit;
                    width: 100%;
                    height: 100%;
                    line-height: 1.4;
                }
        `;
    }};
`;

const Select = styled<Select, "select">("select")`
    ${props => {
        if (props.placeholderStyle) {
            return `
                color: ${props.theme.colors.colorGray()};
                font-style: italic;
                font-weight: ${props.theme.fonts.fontLight};
                font-family: ${props.theme.fonts.fontFamilyDefault};
                font-size: ${props.theme.fonts.h5}`;
        }
    }};
`;

export { Input, Label, WrapperInput, Form, TextArea, WrapperSelect, Select };
