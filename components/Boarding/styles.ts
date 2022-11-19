import styled from 'styled-components';
import { Content } from '../ui-kit/Base';

export const FlexCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[7]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex-wrap: ${({ nowrap }) => (nowrap ? "nowrap" : "wrap")};
  background-color: ${({ theme }) => theme.colors.secondary};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }

  .ant-card {
    flex: 1;
    margin-bottom: 0;
    min-width: 25%;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      width: 33vw;
    }
  }
`;

export const TabContent = styled(Content)`
  padding-top: 0;
  padding-bottom: 0;
`;