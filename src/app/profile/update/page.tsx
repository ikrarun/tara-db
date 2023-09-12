"use client";
import { Button } from "components/Buttons/Button";
import USER_DATA from "Lib/Auth/userData";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "components/Input/input";
import { trpc } from "TRPC/client";
import { TRPCClientError } from "@trpc/client";
import { revalidatePath } from "next/cache";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [pincode, setPincode] = useState<string>();
  const [state, setState] = useState<string>();
  const [city, setCity] = useState<string>();

  const update = async () => {
    toast.dismiss();
    toast.loading("Kindly wait");
    setIsPending(true);

    try {
      if (!state || !city || !pincode || !phone) {
        toast.dismiss();
        toast.error("Please Fill Details");
        setIsPending(false);

        return null;
      }
      const res = await trpc.updateProfile.useMutation().mutateAsync({
        state: state,
        city: city,
        pincode: pincode,
        phone: phone,
      });

      if ("error" in res) {
        toast.dismiss();
        toast.error(res.error);
      } else if ("code" in res) {
        toast.dismiss();
        toast.error(
          "Form Cann't be submitted"
        );
      } else if ("message" in res) {
        toast.dismiss();
        revalidatePath("/");
        toast.success("Your Submission Successful");
        router.back();
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

  if (status === "authenticated" && session?.user.role === "USER") {
    return (
      <div className="mx-auto w-full">
        <div className="z-[90000]">
          <Toaster position="bottom-left" />
        </div>
        <form action={update} className="grid w-full gap-6 mb-6 md:grid-cols-2">
          {/* Phone */}
          <Input
            label="Phone"
            type="tel"
            name="phone"
            maxLength={10}
            minLength={10}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
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
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />

          {/* City Name */}

          <Input
            label="City"
            type="text"
            required
            name="city"
            placeholder="ex. Lucknow"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          {/* Pin Code */}

          <Input
            label="Pin Code"
            type="text"
            required
            name="pincode"
            placeholder="ex. 000000"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
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
