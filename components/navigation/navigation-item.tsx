"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavigationItemProps {
  id: string;
  name: string;
  imgURL: string;
}
const NavigationItem = ({ id, name, imgURL }: NavigationItemProps) => {
  const params = useParams();
  const linkVariant = params?.serverId === id ? "default" : "primary";

  return (
    <Link
      key={id}
      href={`/server/${id}`}
      className={cn(
        "w-full hover:bg-white/45",
        buttonVariants({ variant: linkVariant, size: "default" }),
        linkVariant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white dark:bg-zinc-700",
        "justify-start"
      )}
    >
      <Image
        width={24}
        height={24}
        className="rounded-full w-7 h-7 mr-4"
        src={imgURL}
        alt={name}
      />
      <p className="overflow-hidden capitalize text-xs lg:text-xl">
        {name.toLowerCase().substring(0, 24)}
        {name.length > 24 ? "..." : ""}
      </p>
    </Link>
  );
};

export default NavigationItem;
