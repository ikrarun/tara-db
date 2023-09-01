"use client";
import { Button } from "components/Buttons/Button";
import USER_DATA from "Lib/Auth/userData";
import { useSession } from "next-auth/react";
import Data_Submission from "./Data_Submission";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onCreate = async (formData: FormData) => {
    const res = await Data_Submission(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    if ("error" in res) {
      toast.dismiss();
      toast.error(res.error);
    } else if ("code" in res) {
      toast.dismiss();
      toast.error(
        "Either you have already filled this form or number is already in use"
      );
    } else if ("message" in res) {
      toast.dismiss();
      toast.success("Your Submission Successful");
      router.back();
    }

    setIsPending(false);
  };

  if (session?.user.role === "USER") {
    return (
      <div className="mx-auto w-full">
        <div className="z-[90000]">
          <Toaster position="bottom-left" />
        </div>
        <form
          action={(data) => {
            toast.dismiss();
            toast.loading("Kindly wait");
            setIsPending(true);
            onCreate(data);
          }}
          className="grid w-full gap-6 mb-6 md:grid-cols-2"
        >
          {/* Real Name */}
          <div className="w-full">
            <label
              htmlFor="real_name"
              className="block w-full mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              disabled={true}
              name="name"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
            />
          </div>
          {/* Pen Name */}
          <div className="w-full">
            <label
              htmlFor="user_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              min={2}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Doe"
              required
            />
          </div>
          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="abc-xyz@mail.com"
              required
            />
          </div>
          {/* Phone */}
          <div className="w-full">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              maxLength={10}
              minLength={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="0123456789"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="text-white disabled:bg-gray-700 w-full sm:w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
  if (session === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <USER_DATA />
      </div>
    );
  }
  if (session?.user.role === "ADMIN" || session?.user.role === "EDITOR")
    return (
      <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
        <div className="flex flex-col items-start justify-center gap-3 p-3 ">
          <h1 className="text-2xl font-semibold">
            Thanks for showing your interest.
          </h1>
          <h1 className="text-sm">
            But you are already a contributor on this platform.
          </h1>
          <Button className="text-sm sm:text-base" href={"/"}>
            Home
          </Button>
        </div>
      </div>
    );
};

export default Page;
