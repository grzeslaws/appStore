import styled from "../../../theme/admin";
import { H2 } from "../../../theme/admin/elements/Headings";
import { ButtonInverted } from "../../../theme/admin/objects/Buttons";
import { hoverOpacity } from "../../../theme/admin/tools/utils";

export const BoxProduct = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors.colorGrayLight};
    padding-top: ${props => props.theme.spacing.defaultSpacing(2)};
    padding-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
    background-color: ${props => props.theme.colors.colorWhite};
`;

export const WrapperProducts = styled.div`
    flex: 1;
`;

export const Wrapper = styled.div`
    display: flex;
`;

export const WrapperSettings = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.theme.spacing.defaultSpacing(35)};
    margin-left: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const WrapperPagination = styled.div`
    margin-top: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export const Row = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
    display: flex;
    flex-direction: column;

    &.inline {
        flex-direction: unset;
    }
`;

export const RowProductName = styled.div`
    display: flex;
    align-items: center;
`;

export const WrapperPostType = styled.ul`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1)};
`;

export const PostTypeItem = styled.li`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;

export const PostTypeText = styled.span`
    margin-left: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;

export const PostTypeRemove = styled(PostTypeText)`
    color: ${props => props.theme.colors.colorAlert};
    font-size: ${props => props.theme.fonts.small};
    cursor: pointer;
    ${hoverOpacity()};
`;

export const Images = styled.div`
    border-radius: ${props => props.theme.radius.defaultRadius};
    width: ${props => props.theme.spacing.defaultSpacing(4)};
    height: ${props => props.theme.spacing.defaultSpacing(4)};
    background-size: cover;
    margin-right: ${props => props.theme.spacing.defaultSpacing(1)};
    background-position: center;
`;

export const ProductName = styled(H2)`
    margin-bottom: unset;
    font-weight: ${props => props.theme.fonts.fontBold};
    cursor: pointer;
    ${hoverOpacity()};
`;

export const ToggleEditor = styled(ButtonInverted)`
    margin-left: auto;
`;

export const WrapperDetails = styled.div`
    margin-top: ${props => props.theme.spacing.defaultSpacing(3)};
`;
