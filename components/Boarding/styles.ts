import styled from 'styled-components';


export const RunSizeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;    
`;

export const FlexCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  
  gap: ${({ theme }) => theme.space[6]};
  padding: ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.secondary};

  .ant-card {
    margin-bottom: 0;
    width: 100%;
    box-shadow: ${({ theme }) => theme.shadows.light};
  }
`;

