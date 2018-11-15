import styled from "..";

const H1 = styled.h1`
    font-size: ${props => props.theme.fonts.h1};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(2)};
`;

const H2 = styled.h1`
    font-size: ${props => props.theme.fonts.h2};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1.5)};
`;

const H3 = styled.h1`
    font-size: ${props => props.theme.fonts.h3};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1.5)};
    font-weight: ${props => props.theme.fonts.fontBold};
`;

const H4 = styled.h1`
    font-size: ${props => props.theme.fonts.h4};
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(1.5)};
`;

export { H1, H2, H3, H4 };
