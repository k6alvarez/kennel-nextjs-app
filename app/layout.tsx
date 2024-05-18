import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet boarding | An obedient dog is a happy dog",
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
    title: "Pet boarding | An obedient dog is a happy dog",
    description:
      "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
    url: "https://www.gillettekennels.com/",
    siteName:
      "The premier boarding kennel in Kalamazoo, Portage, and Battle Creek",
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
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        {/* <NextAuthProvider> */}
        {/* <Toaster />
            <Suspense fallback="Loading...">
              <AuthStatus />
            </Suspense> */}
        <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
          {/* <Navigation /> */}
          <main>{children}</main>
          {/* <Footer /> */}
        </div>
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}
