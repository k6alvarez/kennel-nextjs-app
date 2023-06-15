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
  display: flex;
  align-items: stretch;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};

  margin-bottom: ${(props) => props.theme.space[4]};
`;
