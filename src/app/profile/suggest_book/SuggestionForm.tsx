"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { postData } from "./postData";
import Image from "next/image";
import { Button } from "@/components/Button";
interface FileInputState {
  selectedFile: File | null;
}

const SuggestionForm = () => {
  const router = useRouter();
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
          setSelectedImage((prevState) => ({ ...prevState, selectedFile }));
          setCover(dataUrl);
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
          const res = await postData(data);

          if (res?.id === "INV_DATA") {
            toast.dismiss();
            toast.error(`Can't submit form, entries are invalid`);
          } else if (res?.id === "P2002") {
            toast.dismiss();
            toast.error(`This Book is already in the suggestion list`);
          } else if (res?.id) {
            toast.dismiss();
            toast.success(`Your Submission is successful`);
            toast.dismiss();
            toast.loading(`You will be redirected to Profile Page`);
            setTimeout(() => {
              toast.dismiss();
              router.replace("/");
            }, 2000);
          }
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
            <Button
              onClick={(e) => {
                e.preventDefault();
                setCover("");
                setSelectedImage({ selectedFile: null });
              }}
            >
              Clear
            </Button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex flex-col w-full">
          <Button className="w-fit mx-auto" type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
