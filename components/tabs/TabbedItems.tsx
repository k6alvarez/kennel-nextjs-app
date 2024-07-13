"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
import { Tabs } from "antd";

const TabbedItems = ({
  items,
  defaultActiveKey = "boardingHome",
  urlPath = "/boarding",
}: {
  items: any;
  defaultActiveKey?: string;
  urlPath?: string;
}) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const camelCaseTab = tab?.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const tabParamInItems = items.find(
    (item: { key: string | undefined }) => item.key === camelCaseTab
  );
  const router = useRouter();

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      activeKey={tabParamInItems ? camelCaseTab : defaultActiveKey}
      tabPosition={"top"}
      centered
      size="large"
      moreIcon={<DownOutlined />}
      style={{
        fontSize: "inherit",
      }}
      items={items}
      onTabClick={(key) => {
        const kebabCaseKey = key
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase();
        router.push(`${urlPath}?tab=${kebabCaseKey}`);
      }}
    />
  );
};

export default TabbedItems;
