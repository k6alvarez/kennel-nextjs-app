import Link from "next/link";
import prisma from "@/lib/prisma";
import { dancing_script } from "@/app/fonts";
import { GilletteKennelsBadge } from "./svgs/GilletteKennelsBadge";

type LogoProps = {
  /** @defaultValue 'flex flex-1 md:flex-none mr-[46px] md:mr-0' */
  styles?: string;
};

export const Logo = async ({
  styles = "flex flex-1 md:flex-none md:mr-0 items-center",
}: LogoProps) => {
  let appSettings = await prisma?.appSetting.findFirst();
  return (
    <div className={styles}>
      <Link href="/" className="flex items-center ">
        <GilletteKennelsBadge />
        <div className="flex flex-col gap-1 mt-2">
          <span
            className={`text-[2rem] self-center ${dancing_script.className}`}
          >
            {appSettings?.name ?? "My Next App"}
          </span>
          {appSettings?.slogan && (
            <span className="hidden md:flex text-xs text-nowrap">
              {appSettings.slogan}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};
