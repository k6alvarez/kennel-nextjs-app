import prisma from "@/lib/prisma";
import { HeroPlayer } from "@/components/HeroPlayer";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import PromoLinks from "@/components/promos/PromoLinks";

const defaultMetadata = {
  name: "Gillette Kennels",
  slogan: "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
};

export const generateMetadata = async () => {
  try {
    let appSettings = await prisma?.appSetting.findFirst();
    let data = appSettings ?? defaultMetadata;

    return {
      title: `${data.name} | ${data.slogan}`,
      description: `The premier boarding kennel in Kalamazoo, Portage, and Battle Creek`,
    };
  } catch (e) {
    return defaultMetadata;
  }
};

export default function Home() {
  return (
    <>
      <HeroPlayer />
      <ContentItem
        contentStyles="bg-secondary text-black p-6 text-[1.4rem] text-center"
        page="HOME"
        section="MAIN"
      />
      <Content>
        <PromoLinks />
        <ContentItem page="HOME" section="SECONDARY" name="HOME-SECONDARY" />
      </Content>
    </>
  );
}
