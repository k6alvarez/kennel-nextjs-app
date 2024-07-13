import { HeroPlayer } from "@/components/HeroPlayer";
import ContentItem from "@/components/content/ContentItem";
import prisma from "@/lib/prisma";
import TabbedItems from "@/components/tabs/TabbedItems";
import { Content } from "@/components/ui/Content";
import { Collapse } from "antd";
import SingleRun from "@/components/boarding/SingleRun";
import BoardingRates from "@/components/boarding/BoardingRates";

const defaultMetadata = {
  name: "Gillette Kennels",
  slogan: "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
};

export const generateMetadata = async () => {
  try {
    let appSettings = await prisma?.appSetting.findFirst();
    let data = appSettings ?? defaultMetadata;

    return {
      title: `Boarding at ${data.name}`,
      description: `The premier boarding kennel in Kalamazoo, Portage, and Battle Creek`,
    };
  } catch (e) {
    return defaultMetadata;
  }
};

export default async function BoardingPage() {
  const boardingSections = await prisma?.contentItem.findMany({
    where: {
      page: "BOARDING",
    },
  });

  const petRunsCats = await prisma?.petRun.findMany({
    where: {
      petType: "cat",
    },
    orderBy: {
      name: "desc",
    },
  });

  const medicalIssues = await prisma?.medicalIssue.findMany();
  const medicalItems = medicalIssues?.map((issue) => {
    return {
      label: issue.name,
      key: issue.id,
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: issue.description,
            }}
          />
        </Content>
      ),
    };
  });

  const specialServices = await prisma?.service.findMany();
  const serviceItems = specialServices?.map((service) => {
    return {
      label: service.name,
      key: service.id,
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: service.description,
            }}
          />
        </Content>
      ),
    };
  });

  const getBoardingSection = (sectionName: string) => {
    return (
      boardingSections?.find((item) => item.name === sectionName)?.content ?? ""
    );
  };

  const items = [
    {
      label: "Dog Boarding",
      key: "boardingHome",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingHome"),
            }}
          />
          <BoardingRates />
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingCWing"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Cat Boarding",
      key: "boardingCats",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingCats"),
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            {petRunsCats?.map((run) => (
              <div key={run.id}>
                <SingleRun run={run} />
              </div>
            ))}
          </div>
        </Content>
      ),
    },
    {
      label: "Before Boarding",
      key: "boardingBefore",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingBefore"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Checking In",
      key: "boardingCheckin",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingCheckin"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Vaccinations",
      key: "boardingVaccinations",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingVaccinations"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Medical Issues",
      key: "boardingMedicalIssues",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingMedicalIssues"),
            }}
          />
          <Collapse items={medicalItems} size="large" />
        </Content>
      ),
    },
    {
      label: "Special Services",
      key: "boardingServices",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getBoardingSection("boardingServices"),
            }}
          />
          <Collapse items={serviceItems} size="large" />
        </Content>
      ),
    },
  ];
  return (
    <>
      <HeroPlayer page="BOARDING" promoGroup="" name="boardingBanner" />
      <ContentItem
        contentStyles="bg-secondary text-black p-6 text-[1.4rem] text-center"
        page="BOARDING"
        section="MAIN"
        name="boardingPromoTitle"
      />

      <div className="max-w-[96vw] mx-auto">
        <TabbedItems items={items} />
      </div>
    </>
  );
}
