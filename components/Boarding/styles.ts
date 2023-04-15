import styled from 'styled-components';





export const FlexCards = styled.div`
  display: grid;
  grid-template-columns: ${({ autoFill }) => autoFill ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))'};
  
  gap: ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[5]};
  background-color: ${({ theme }) => theme.colors.secondary};
  flex: 1;

  .ant-card {
    margin-bottom: 0;
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadows.light};
  }
`;

