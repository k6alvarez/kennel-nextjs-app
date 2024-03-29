import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { SingleRun } from "./SingleRun";
import { ThemePreferenceContext } from "../../pages/_app";

const RunSizeWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${({ theme }) => theme.space[5]};
  padding: ${({ theme }) => theme.space[5]};
  width: 100%;
  margin: ${({ theme }) => theme.space[5]} 0;

  &:last-child {
    margin-bottom: 0;
  }

  .ant-card {
    flex-grow: unset;
  }
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

  const fetchData = async () => {
    try {
      const res = await fetch("/api/runs");
      const data = await res.json();
      const filterData = getFilteredData(data, filterType).sort(
        (a, b) => a.order - b.order
      );
      setRuns(filterData);
    } catch (error) {
      console.error("Error fetching runs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterType]);

  return (
    <RunSizeWrapper>
      {runs.length > 0 ? (
        runs.map((run, i) => {
          return (
            <SingleRun
              setRuns={setRuns}
              editMode={editMode}
              key={i}
              run={run}
            />
          );
        })
      ) : (
        <p>Run information coming soon.</p>
      )}
    </RunSizeWrapper>
  );
};
