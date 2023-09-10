"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiHome6Line } from "react-icons/ri";

export default function Header() {
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
    if (pathname === "/profile/create_article") {
      setRealPath("Create Article");
      return;
    }
    if (pathname === "/profile/update") {
      setRealPath("Update Profile");
      return;
    }

    if (pathname === "/profile/recommend") {
      setRealPath("Recommend");
    } else {
      setRealPath("TARA DB");
    }
    return;
  }, [pathname]);
  return (
    <div className="inline-flex top-0 left-0 right-0   text-white z-[2000] bg-blue-700 w-full fixed p-3 justify-start items-center">
      <div className="flex w-full flex-row items-center mx-auto max-w-[900px] justify-between">
        <h1 className="capitalize w-full px-2 font-semibold text-xl">
          {realPath ?? "Home"}
        </h1>
        <Link href="/" className={"capitalize px-2 font-semibold text-xl"}>
          <RiHome6Line />
        </Link>
      </div>
    </div>
  );
}
