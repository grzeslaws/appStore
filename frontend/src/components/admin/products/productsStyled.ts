import styled from "../../../theme/admin";
import { H2 } from "../../../theme/admin/elements/Headings";
import { ButtonAlert, ButtonFile, ButtonInverted } from "../../../theme/admin/objects/Buttons";
import { Input, WrapperSelect } from "../../../theme/admin/objects/Forms";
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
    width: ${props => props.theme.spacing.defaultSpacing(12)};
    height: ${props => props.theme.spacing.defaultSpacing(12)};
    background-size: cover;
    margin-right: ${props => props.theme.spacing.defaultSpacing(2)};
    background-position: center;
`;

export const ProductName = styled(H2)`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.8)};
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

export const ButtonsInline = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const ButtonDeleteProduct = styled(ButtonAlert)`
    margin-left: ${props => props.theme.spacing.defaultSpacing(1)};
`;

export const WrapperProduct = styled.div`
    display: flex;
    flex-direction: column;
`;

export const WrapperItemsForProducts = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(0.2)};

    & > span {
        color: ${props => props.theme.colors.colorGray(0.7)};
        margin-right: ${props => props.theme.spacing.defaultSpacing(1)};
        font-size: ${props => props.theme.fonts.h5};
        font-weight: ${props => props.theme.fonts.fontLight};
    }

    &.matginTop {
        margin-top: ${props => props.theme.spacing.defaultSpacing(1)};
    }
`;

export const WrapperSelectMod = styled(WrapperSelect)`
    flex: 1;
    margin-left: ${props => props.theme.spacing.defaultSpacing(2)};
    /* height: max-content; */
`;

export const WrapperInputInline = styled.div`
    flex: 1;
    margin-left: ${props => props.theme.spacing.defaultSpacing(2)};
    height: max-content;
`;

export const ButtonFileMod = styled(ButtonFile)`
    flex: 1;
`;

export const ImageName = styled.div`
    font-size: ${props => props.theme.fonts.h5};
    margin-top: ${props => props.theme.spacing.defaultSpacing(0.5)};
`;

export const WrapperButtonFile = styled.div`
    flex: 1;
`;
