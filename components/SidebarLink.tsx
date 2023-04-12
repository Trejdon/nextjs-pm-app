"use client";
import Link from "next/link";
import { Settings, User, Grid, Calendar, Icon } from "react-feather";
// Hooks only work on the client side, therefore this entire component must be a client component
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LinkType } from "./Sidebar";

// Same result, cleaner syntax using the Record utility
// const icons: { [index: string]: Icon } = { Settings, User, Grid, Calendar };
const icons: Record<string, Icon> = { Settings, User, Grid, Calendar };

const SidebarLink = ({ link }: { link: LinkType }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];
  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
