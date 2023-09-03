"use client";
import { Button } from "components/Buttons/Button";
import USER_DATA from "Lib/Auth/userData";
import { useSession } from "next-auth/react";
import Data_Submission from "./Data_Submission";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/input";

const Page = () => {
  const { data: session, status } = useSession();
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

  if (status === "authenticated" && session?.user.role === "USER") {
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
          {/* Phone */}
          <Input
            label="Phone"
            type="tel"
            name="phone"
            maxLength={10}
            minLength={10}
            placeholder="0123456789"
            pattern="[0-9]{10}"
            required
          />

          {/* State Name */}

          <Input
            label="State"
            type="text"
            required
            name="state"
            placeholder="ex. UP"
          />

          {/* City Name */}

          <Input
            label="City"
            type="text"
            required
            name="city"
            placeholder="ex. Lucknow"
          />
          {/* Pin Code */}

          <Input
            label="Pin Code"
            type="text"
            required
            name="pincode"
            placeholder="ex. 000000"
          />

          <Button
            type="submit"
            disabled={isPending}
            className=" disabled:bg-gray-700 sm:text-sm text-xs w-full sm:w-fit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }

  if (
    (status === "authenticated" && session?.user.role === "ADMIN") ||
    (status === "authenticated" && session?.user.role === "EDITOR")
  )
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

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <USER_DATA />
      </div>
    );
  }
  if (status === "loading") {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Thanks for showing intreset in our Project.
            </h1>
            <h1 className="text-base animate-pulse duration-200 text-gray-900/90">
              Please wait.....
            </h1>
          </div>
        </div>
        <div className="my-4 border-b border-gray-900" />
      </div>
    );
  }
};

export default Page;
