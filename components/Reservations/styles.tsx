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
