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
  const [desc_length, setDes_len] = useState(1000);
  const [title_len, setTitle_len] = useState(1000);

  useEffect(() => {
    setDes_len(200 - desc.length);
    setTitle_len(100 - title.length);
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
    <div className="flex flex-col items-start justify-center w-full gap-4 select-none">
      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      <form
        className="flex flex-col w-full gap-2"
        action={async (data) => {
          const res = await postData(data);

          if (res?.id === "INV_DATA") {
            toast.error(`Can't submit form, entries are invalid`);
          } else if (res?.id === "P2002") {
            toast.error(`This Book is already in the suggestion list`);
          } else if (res?.id) {
            router.replace("/profile");
          }
        }}
      >
        {/* Title */}
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col w-full p-3 border rounded-md border-gray-700/80">
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
              className="px-2 outline-none peer placeholder:text-transparent ring-0 "
            />
            <label className="absolute px-2 text-base font-medium text-black bg-white pointer-events-none -top-3 peer-focus:text-black peer-focus:bg-white left-3 peer-focus:-top-3 peer-placeholder-shown:top-3">
              Title
            </label>
          </div>
          <h1 className="px-3 mt-2 text-xs text-gray-500">
            {title_len} Characters Remaining
          </h1>
        </div>
        {/* Desc */}
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col w-full p-3 border rounded-md border-gray-700/80">
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
              className="px-2 outline-none peer placeholder:text-transparent ring-0 "
            />
            <label className="absolute px-2 text-base font-medium text-black bg-white pointer-events-none -top-3 peer-focus:text-black peer-focus:bg-white left-3 peer-focus:-top-3 peer-placeholder-shown:top-3">
              Short Description
            </label>
          </div>
          <h1 className="px-3 mt-2 text-xs text-gray-500">
            {desc_length} Characters Remaining
          </h1>
        </div>
        {/* link */}
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col w-full p-3 border rounded-md border-gray-700/80">
            <input
              type="text"
              placeholder="Enter Link of Book Resource"
              maxLength={100}
              value={book}
              name="book_link"
              onChange={(e) => {
                e.preventDefault;
                setBook(e.target.value);
              }}
              className="px-2 outline-none peer placeholder:text-transparent ring-0 "
            />
            <label className="absolute px-2 text-base font-medium text-black bg-white pointer-events-none -top-3 peer-focus:text-black peer-focus:bg-white left-3 peer-focus:-top-3 peer-placeholder-shown:top-3">
              Link to Book
            </label>
          </div>
          <h1 className="px-3 mt-2 text-xs text-gray-500">**Enter Url Only</h1>
        </div>
        {/* image url */}
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col w-full p-3 border rounded-md border-gray-700/80">
            <input
              type="text"
              maxLength={100}
              value={cover}
              name="cover_link"
              onChange={(e) => {
                e.preventDefault;
                setCover(e.target.value);
              }}
              placeholder="Enter Link for Book Cover"
              className="px-2 outline-none peer placeholder:text-transparent ring-0 "
            />
            <label className="absolute px-2 text-base font-medium text-black bg-white pointer-events-none -top-3 peer-focus:text-black peer-focus:bg-white left-3 peer-focus:-top-3 peer-placeholder-shown:top-3">
              Book Cover
            </label>
          </div>
          <h1 className="px-3 mt-2 text-xs text-gray-500">**Enter Url Only</h1>
        </div>
        <div className="flex flex-col w-full">
          <button
            type="submit"
            className="block p-2 text-base font-medium text-white bg-gray-950 rounded-md w-fit text-start "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
