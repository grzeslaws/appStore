import styled from "..";
import { placeholder } from "../tools/utils";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
`;

const Input = styled.input`
    border: 1px solid ${props => props.theme.colors.colorGrayLight};
    border-radius: ${props => props.theme.radius.defaultRadius};
    height: ${props => props.theme.spacing.defaultSpacing(3)};
    padding: 0 ${props => props.theme.spacing.defaultSpacing(1)};
    font-size: ${props => props.theme.fonts.h4};
    color: ${props => props.theme.colors.colorGray};
    outline: 0;
    transition: ${props => props.theme.transitions.transitionDefault};
    color: ${props => props.theme.colors.colorGray};
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
    ${props => placeholder(props.theme.colors.colorGray, props.theme.fonts.fontLight, props.theme.fonts.fontFamilyDefault)};

    &:focus {
        border-color: ${props => props.theme.colors.colorPrimary};
        color: ${props => props.theme.colors.colorPrimary};
    }
`;

const TextArea = styled(Input.withComponent("textarea"))`
    height: ${props => props.theme.spacing.defaultSpacing(10)};
    padding-top: ${props => props.theme.spacing.defaultSpacing(1)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
`;

const Label = styled.label`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.8)};
    display: block;
`;

export { Input, Label, WrapperInput, Form, TextArea };
