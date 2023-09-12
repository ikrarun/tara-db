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
      <div className="  text-base w-full gap-2 inline-flex items-center  mx-auto max-w-[900px]">
        <Link href="/" className={" text-xl capitalize inline-flex items-center  font-normal "}>
        <RiHome6Line />
        </Link>
           {realPath ?? "Home"}
      </div>
    </div>
  );
}
