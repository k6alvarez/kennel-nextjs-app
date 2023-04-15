import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SingleRun } from "./SingleRun";
import { ThemePreferenceContext } from "../../pages/_app";

const RunSizeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
  width: 100%;
  margin: ${({ theme }) => theme.space[5]} 0;
`;

const getFilteredData = (data, filterType) => {
  switch (filterType) {
    case "a-b-wing":
      return data.filter(
        (run) => (run.wing === "A" || run.wing === "B") && run.petType === "dog"
      );
    case "a-wing":
      return data.filter((run) => run.wing === "A");
    case "b-wing":
      return data.filter((run) => run.wing === "B");
    case "c-wing":
      return data.filter((run) => run.wing === "C");
    case "dogs-only":
      return data.filter((run) => run.petType === "dog");
    case "cats-only":
      return data.filter((run) => run.petType === "cat");
    default:
      return data;
  }
};

export const RunSizes = ({ filterType = "all" }) => {
  const [runs, setRuns] = React.useState([]);
  const { editMode } = useContext(ThemePreferenceContext);

  useEffect(() => {
    fetch("/api/runs")
      .then((res) => res.json())
      .then((data) => {
        const filterData = getFilteredData(data, filterType);
        setRuns(filterData);
      });
  }, []);

  return (
    <RunSizeWrapper>
      {runs.length > 0 ? (
        runs
          .sort((a, b) => a.order - b.order)
          .map((run, i) => {
            return <SingleRun editMode={editMode} key={i} run={run} />;
          })
      ) : (
        <p>Run information coming soon.</p>
      )}
    </RunSizeWrapper>
  );
};
