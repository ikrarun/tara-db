"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { trpc } from "TRPC/client";
import { TRPCClientError } from "@trpc/client";

interface FileInputState {
  selectedFile: File | null;
}

const SuggestionForm: React.FC = () => {
  const pushData = trpc.suggestBooks.useMutation();

  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  // Data To Be Posted
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [book, setBook] = useState("");
  const [cover, setCover] = useState("");
  // Lengths of Input Data
  const [descLength, setDescLength] = useState(200);
  const [titleLength, setTitleLength] = useState(80);

  // Selected Image
  const [selectedImage, setSelectedImage] = useState<FileInputState>({
    selectedFile: null,
  });

  useEffect(() => {
    setDescLength(desc.length);
    setTitleLength(title.length);
  }, [title, desc]);

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

  const handleSubmit = async () => {
    setIsPending(true);

    toast.dismiss();
    toast.loading("Kindly wait");
    try {
      const res = await pushData.mutateAsync({
        title: title,
        desc: desc,
        cover_link: cover,
        book_link: book,
      });

      if ("error" in res) {
        toast.dismiss();
        toast.error(res.error);
        setIsPending(false);
      } else if ("code" in res) {
        toast.dismiss();
        toast.error("Failed to Post");
        setIsPending(false);
      } else if ("message" in res) {
        toast.dismiss();
        toast.success("Your Submission Successful");
        router.replace("/");
        setIsPending(false);
      }
      setIsPending(false);
    } catch (error) {
      // zodError will be inferred
      if (error instanceof TRPCClientError) {
        toast.dismiss();
        toast.error("Fill Fields Correctly");
        setIsPending(false);
        return null;
      }
      toast.dismiss();
      toast.error("Un-Expected Error");
      setIsPending(false);
      return null;
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4 select-none">
      <div>
        <Toaster position="bottom-left" reverseOrder={true} />
      </div>
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          toast.loading("Kindly wait");
          setIsPending(true);
          handleSubmit();
        }}
      >
        {/* Title */}
        <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <input
            type="text"
            placeholder="Title"
            className="outline-none w-full ring-0"
            name="title"
            autoComplete="false"
            maxLength={titleLength}
            value={title}
            minLength={4}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleLength(e.target.value.length);
            }}
            id="title"
          />
          <h1 className="text-xs text-gray-500">{titleLength}/80</h1>
        </div>

        {/* Desc */}
        <div className="p-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <textarea
            placeholder="Short Description"
            className="outline-none w-full ring-0"
            autoComplete="false"
            maxLength={descLength}
            style={{ resize: "none" }}
            name="desc"
            value={desc}
            rows={2}
            onChange={(e) => {
              const cleanText = e.target.value.replace(/\n/g, "");
              setDesc(cleanText);
            }}
          />
          <h1 className="text-xs text-gray-500">{descLength}/200</h1>
        </div>

        {/* Book Link */}
        <div className="p-1 my-1 flex flex-row items-center gap-1 border-b w-full border-gray-700 border-dashed">
          <input
            type="text"
            placeholder="Link of Book"
            className="outline-none w-full ring-0"
            name="book_link"
            autoComplete="false"
            maxLength={300}
            value={book}
            minLength={4}
            onChange={(e) => setBook(e.target.value)}
            id="book_link"
          />
        </div>

        {/* Book Image Selector */}
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
            onChange={(e) => e.preventDefault()}
            name="cover_link"
            value={cover}
            className="hidden"
          />
        </div>

        {/* Book Image Displayer */}
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
            className="inline-flex bg-blue-700 text-white w-fit mx-auto text-xs sm:text-sm disabled:bg-gray-700 hover:bg-blue-800 rounded-full py-2 px-4 items-center justify-center gap-2"
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
