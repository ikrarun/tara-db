"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import Data_Submission from "./Data_Submission";
interface FileInputState {
  selectedFile: File | null;
}

const SuggestionForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [book, setBook] = useState("");
  const [cover, setCover] = useState("");
  const [desc_length, setDes_len] = useState(1000);
  const [title_len, setTitle_len] = useState(1000);

  const [selectedImage, setSelectedImage] = useState<FileInputState>({
    selectedFile: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const dataUrl = reader.result as string;
        if (dataUrl.startsWith("data:image/")) {
          if (selectedFile.size <= 100 * 1024) {
            setSelectedImage((prevState) => ({ ...prevState, selectedFile }));
            setCover(dataUrl);
          } else {
            toast.dismiss();
            toast.error("Image size should be 100KB or smaller.");
          }
        } else {
          toast.dismiss();
          toast.error("Please select an image file (JPG, JPEG, PNG).");
        }
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    setDes_len(desc.length);
    setTitle_len(title.length);
  }, [title, desc]);

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4 select-none">
      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      <form
        className="flex flex-col w-full gap-2"
        action={async (data) => {
          toast.dismiss();
          toast.loading("Kindly wait");
          const res = await Data_Submission(data);
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Introduce a delay of 2000 milliseconds (2 seconds)
          if ("error" in res) {
            toast.dismiss();
            toast.error(res.error);
          } else if ("code" in res) {
            toast.dismiss();
            toast.error("Some error Occurred while Submission");
          } else if ("message" in res) {
            toast.dismiss();
            toast.success("Your Submission Successful");
            router.replace("/");
          }
          setIsPending(false);
        }}
      >
        {/* Title */}
        <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <input
            type="text"
            placeholder="Title"
            className="outline-none w-full ring-0"
            name="title"
            autoComplete={"false"}
            maxLength={100}
            value={title}
            minLength={4}
            onChange={(e) => {
              e.preventDefault;
              setTitle(e.target.value);
              setTitle_len(e.target.value.length);
            }}
            id="title"
          />
          <h1 className="text-xs text-gray-500">{title_len}/80</h1>
        </div>
        {/* Desc */}

        <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <textarea
            placeholder="Short Description"
            className="outline-none w-full ring-0"
            autoComplete={"false"}
            maxLength={200}
            style={{ resize: "none" }}
            name="desc"
            value={desc}
            rows={2}
            onChange={(e) => {
              e.preventDefault;
              const cleanText = e.target.value.replace(/\n/g, "");

              setDesc(cleanText);
            }}
          />
          <h1 className="text-xs text-gray-500">{desc_length}/200</h1>
        </div>

        {/* link */}
        <div className="p-1 my-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <input
            type="text"
            placeholder="Link of Book"
            className="outline-none w-full ring-0"
            name="book_link"
            autoComplete={"false"}
            maxLength={300}
            value={book}
            minLength={4}
            onChange={(e) => {
              e.preventDefault;
              setBook(e.target.value);
            }}
            id="book_link"
          />
        </div>

        {/* image url */}

        <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <label htmlFor="coverInput" className="text-gray-500 w-full">
            {selectedImage.selectedFile
              ? selectedImage.selectedFile.name
              : "Choose Cover (Images only)"}
            <input
              type="file"
              multiple={false}
              id="coverInput"
              style={{ display: "none" }}
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </label>
          <input
            type="text"
            onChange={(e) => {
              e.preventDefault();
            }}
            name="cover_link"
            value={cover}
            className="hidden"
          />
        </div>
        {cover ? (
          <div className="sm:w-1/4 my-2 max-h-36 ">
            <div className=" h-32 w-auto relative rounded-md overflow-clip">
              <Image
                src={cover}
                alt=""
                style={{ objectFit: "cover" }}
                fill={true}
              />
            </div>
            <button
              className="inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-2 px-4 items-center justify-center gap-2 text-xl"
              onClick={(e) => {
                e.preventDefault();
                setCover("");
                setSelectedImage({ selectedFile: null });
              }}
            >
              Clear
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col w-full">
          <button
            className="inline-flex bg-blue-700 text-white w-fit mx-auto text-xs sm:text-sm disabled:bg-gray-700 hover:bg-blue-800 rounded-full py-2 px-4 items-center justify-center gap-2 "
            disabled={isPending}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
