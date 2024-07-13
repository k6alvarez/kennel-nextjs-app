import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { antThemeConfig } from "@/app/themeConfig";
import { App, ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { dancing_script, lato } from "./fonts";

export const metadata = {
  title:
    "Gillette Kennels | The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
  description:
    "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
  metadataBase: new URL("https://www.gillettekennels.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title:
      "Gillette Kennels | The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
    description:
      "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",

    url: "https://www.gillettekennels.com/",
    site_name: "Gillette Kennels Boardng & Obedience Training",
    images: [
      {
        url: "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1707345740/Screenshot_2024-02-07_at_2.42.15_PM.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${dancing_script.variable}`}>
      <body className="bg-white text-black">
        <ConfigProvider theme={antThemeConfig}>
          <AntdRegistry>
            <App>
              <div className="grid grid-rows-[auto,2fr,auto] min-h-screen">
                <Navigation />
                <main>{children}</main>
              </div>
            </App>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
