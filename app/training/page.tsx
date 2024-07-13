import { HeroPlayer } from "@/components/HeroPlayer";
import ContentItem from "@/components/content/ContentItem";
import prisma from "@/lib/prisma";
import TabbedItems from "@/components/tabs/TabbedItems";
import { Content } from "@/components/ui/Content";

const defaultMetadata = {
  name: "Gillette Kennels",
  slogan: "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
};

export const generateMetadata = async () => {
  try {
    let appSettings = await prisma?.appSetting.findFirst();
    let data = appSettings ?? defaultMetadata;

    return {
      title: `${data.name} Obedience Training`,
      description: `Our classes range from puppy head start classes to basic, intermediate, and advanced obedience!`,
    };
  } catch (e) {
    return defaultMetadata;
  }
};

export default async function TrainingPage() {
  const trainingSections = await prisma?.contentItem.findMany({
    where: {
      page: "TRAINING",
    },
  });

  const getTrainingSection = (sectionName: string) => {
    return (
      trainingSections?.find((item) => item.name === sectionName)?.content ?? ""
    );
  };

  const items = [
    {
      label: "Training",
      key: "trainingContent",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingContent"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Group Lessons",
      key: "trainingGroupLessons",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingGroupLessons"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Boarding School",
      key: "trainingBoardingSchool",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingBoardingSchool"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Private Lessons",
      key: "trainingPrivateLessons",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingPrivateLessons"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Agility",
      key: "trainingAgilityLessons",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingAgilityLessons"),
            }}
          />
        </Content>
      ),
    },
    {
      label: "Consultations",
      key: "trainingConsultations",
      children: (
        <Content>
          <div
            dangerouslySetInnerHTML={{
              __html: getTrainingSection("trainingConsultations"),
            }}
          />
        </Content>
      ),
    },
  ];
  return (
    <>
      <HeroPlayer page="TRAINING" promoGroup="" name="trainingBanner" />
      <ContentItem
        contentStyles="bg-secondary text-black p-6 text-[1.4rem] text-center"
        page="TRAINING"
        section="MAIN"
        name="trainingPromoTitle"
      />

      <div className="max-w-[96vw] mx-auto">
        <TabbedItems
          items={items}
          urlPath="/training"
          defaultActiveKey="trainingContent"
        />
      </div>
    </>
  );
}
