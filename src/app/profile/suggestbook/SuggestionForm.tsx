"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { postData } from "./postData";
const SuggestionForm = ({
  submitData,
}: {
  submitData: (data: FormData) => Promise<string>;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [book, setBook] = useState("");
  const [cover, setCover] = useState("");
  const [desclength, setDeslen] = useState(1000);
  const [titlelen, setTitlelen] = useState(1000);

  useEffect(() => {
    setDeslen(200 - desc.length);
    setTitlelen(100 - title.length);
  }, [title, desc]);

  useEffect(() => {
    const textarea = document.getElementById("textArea");

    textarea?.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default Enter key behavior
      }
    });
  });

  return (
    <div className="flex select-none flex-col gap-4 w-full items-start justify-center">
      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      <form
        className="w-full flex flex-col gap-2"
        action={async (data) => {
          const res = await postData(data);

          console.log(res?.id);
          if (res?.id === "INVDATA") {
            toast.error(`Can't submit form, enteries are invalid`);
          } else if (res?.id === "P2002") {
            toast.error(`This Book is already in the suggestion list`);
          } else if (res?.id) {
            router.replace("/profile");
          }
        }}
      >
        {/* Title */}
        <div className="flex w-full flex-col">
          <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
            <input
              type="text"
              name="title"
              placeholder="Enter Title of Book"
              maxLength={100}
              value={title}
              onChange={(e) => {
                e.preventDefault;
                setTitle(e.target.value);
              }}
              className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
            />
            <label className="absolute -top-3 pointer-events-none px-2  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
              Title
            </label>
          </div>
          <h1 className="px-3 text-xs text-gray-500 mt-2">
            {titlelen} Charcters Remaining
          </h1>
        </div>
        {/* Desc */}
        <div className="flex w-full flex-col">
          <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
            <textarea
              id="textArea"
              maxLength={200}
              name="desc"
              style={{ resize: "none" }}
              value={desc}
              onChange={(e) => {
                e.preventDefault;
                setDesc(e.target.value);
              }}
              placeholder="Enter Description for Users"
              className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
            />
            <label className="absolute -top-3 px-2 pointer-events-none bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
              Short Description
            </label>
          </div>
          <h1 className="px-3 text-xs text-gray-500 mt-2">
            {desclength} Charcters Remaining
          </h1>
        </div>
        {/* link */}
        <div className="flex w-full flex-col">
          <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
            <input
              type="text"
              placeholder="Enter Link of Book Resource"
              maxLength={100}
              value={book}
              name="booklink"
              onChange={(e) => {
                e.preventDefault;
                setBook(e.target.value);
              }}
              className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
            />
            <label className="absolute -top-3 px-2 pointer-events-none  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
              Link to Book
            </label>
          </div>
          <h1 className="px-3 text-xs text-gray-500 mt-2">**Enter Url Only</h1>
        </div>
        {/* image url */}
        <div className="flex w-full flex-col">
          <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
            <input
              type="text"
              maxLength={100}
              value={cover}
              name="coverlink"
              onChange={(e) => {
                e.preventDefault;
                setCover(e.target.value);
              }}
              placeholder="Enter Link for Book Cover"
              className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
            />
            <label className="absolute -top-3 px-2 pointer-events-none  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
              Book Cover
            </label>
          </div>
          <h1 className="px-3 text-xs text-gray-500 mt-2">**Enter Url Only</h1>
        </div>
        <div className="flex w-full flex-col">
          <button
            type="submit"
            className="bg-blue-700 rounded-md text-white p-2 w-fit text-start block text-base font-medium "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
