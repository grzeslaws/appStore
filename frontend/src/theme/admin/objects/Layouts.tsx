import styled from "..";

const Row = styled.div`
    margin-bottom: ${props => props.theme.spacing.defaultSpacing(3)};
    display: flex;
    flex-direction: column;

    &.inline {
        flex-direction: unset;
    }
`;

const WrapperFlex = styled.div`
    display: flex;
`;

const WrapperSidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.theme.spacing.defaultSpacing(35)};
    margin-left: ${props => props.theme.spacing.defaultSpacing(3)};
`;

export { Row, WrapperFlex, WrapperSidebar };
