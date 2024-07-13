import prisma from "@/lib/prisma";
import SingleRun from "./SingleRun";

const BoardingRates = async ({
  type = "all",
}: {
  type?: "all" | "dog" | "cat";
}) => {
  let petRuns;
  if (type === "all") {
    petRuns = await prisma?.petRun.findMany({
      orderBy: {
        name: "desc",
      },
    });
  } else {
    petRuns = await prisma?.petRun.findMany({
      where: {
        petType: type,
      },
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {petRuns.map((run) => (
        <div key={run.id}>
          <SingleRun run={run} />
        </div>
      ))}
    </div>
  );
};

export default BoardingRates;
