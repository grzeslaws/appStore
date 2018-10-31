import styled from "../../../theme/admin";

export const WrapperDashboard = styled.div`
    color: ${props => props.theme.colors.colorGray};
    flex: 1;
    padding: ${props => props.theme.spacing.defaultSpacing(2)};
    font-family: ${props => props.theme.fonts.fontFamilyDefault};
    font-weight: ${props => props.theme.fonts.fontLight};
`;
