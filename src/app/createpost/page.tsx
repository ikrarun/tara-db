"use client";
import Footer from "@/UI/footer";
import NAV from "@/UI/nav";
import { getConsole } from "./getConsole";
import { useEffect, useState } from "react";

const Post = () => {
  const [imageDataURL, setImageDataUrl] = useState("");
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    console.log(imageDataURL);
  }, [imageDataURL]);
  return (
    <div className="flex flex-col">
      <NAV />
      <div className="w-full my-5  p-2 flex">
        <div className="max-w-[900px] mx-auto w-full mt-14 flex flex-col gap-2  items-center justify-center">
          <form action={getConsole} className="flex gap-2 flex-col">
            <div className="p-2 border border-gray-800 rounded-md">
              <input
                type="text"
                placeholder="title"
                className="outline-none ring-0"
                name="title"
                id="title"
              />
            </div>
            <div className="p-2 border border-gray-800 rounded-md">
              <input
                type="text"
                placeholder="Desc"
                className="outline-none ring-0"
                name="desc"
                id="desc"
              />
            </div>
            <div className="p-2 border border-gray-800 rounded-md">
              <input
                type="file"
                className="outline-none ring-0"
                name="image"
                accept="image/*"
                id="image"
                onChange={handleFileChange}
              />
            </div>

            <button
              className="bg-blue-700 rounded-md text-white px-4 py-2"
              type="submit"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
