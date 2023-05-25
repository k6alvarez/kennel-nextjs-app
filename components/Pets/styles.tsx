import styled from "styled-components";
import { GridItems } from "../ui-kit/Base";

export const Wrapper = styled.div`
  padding: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.secondary};
  margin: ${(props) => props.theme.space[5]} 0;

  .ant-card {
    margin: 0;
  }

  .ant-card-body {
    min-height: 230px;
  }
`;

export const StyledGridItems = styled(GridItems)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: ${(props) => props.theme.space[4]};

  button {
    margin: 0;
    min-width: max-content;
  }

  > a {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;
