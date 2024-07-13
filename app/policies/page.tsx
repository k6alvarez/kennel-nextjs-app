import { auth } from "@/auth";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import { Collapse } from "antd";
import prisma from "@/lib/prisma";

export const generateMetadata = async () => {
  try {
    const session = await auth();
    return {
      title: `Polices`,
      description: `Welcome to the polices page`,
    };
  } catch (e) {
    return {
      title: `Polices`,
      description: `Welcome to the polices page`,
    };
  }
};

export default async function PoliciesPage() {
  const polices = await prisma?.policy.findMany();
  const policesItems = polices?.map((policy) => {
    return {
      label: policy.name,
      key: policy.id,
      children: <div dangerouslySetInnerHTML={{ __html: policy.content }} />,
    };
  });
  return (
    <Content>
      <ContentItem page="POLICIES" section="MAIN" name="policiesContent" />
      <Collapse items={policesItems} size="large" />
    </Content>
  );
}
