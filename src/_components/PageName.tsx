"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiHome6Line } from "react-icons/ri";

const PageName = () => {
  const pathname = usePathname();
  const [realPath, setRealPath] = useState("");
  useEffect(() => {
    if (pathname === "/articles") {
      setRealPath("Articles");
      return;
    }
    if (pathname === "/books") {
      setRealPath("Books");
      return;
    }

    if (pathname === "/profile") {
      setRealPath("Profile");
      return;
    }
    if (pathname === "/profile/post") {
      setRealPath("Create Article");
      return;
    }
    if (pathname === "/join_us") {
      setRealPath("Join Us");
      return;
    }

    if (pathname === "/profile/suggest_book") {
      setRealPath("Suggest Book");
    } else {
      setRealPath("Home");
    }
    return;
  }, [pathname]);
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <h1 className="capitalize px-2 font-semibold text-xl">
        {realPath ?? "Home"}
      </h1>
      <Link href="/" className="capitalize px-2 font-semibold text-xl">
        <RiHome6Line />
      </Link>
    </div>
  );
};

export default PageName;
