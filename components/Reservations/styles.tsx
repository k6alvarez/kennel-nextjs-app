import styled from "styled-components";

export const TotalDeposit = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  text-align: center;
  font-weight: bold;
`;

export const StepsAction = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
`;
export const StepsContent = styled.div`
  width: 100%;
`;

export const PetCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  background-color: ${(props) => props.theme.colors.secondary};

  gap: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[4]};
  padding-bottom: 0;
  margin-bottom: ${(props) => props.theme.space[4]};

  .ant-card {
    font-size: ${(props) => props.theme.fontSizes[0]};
  }
`;
