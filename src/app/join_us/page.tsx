"use client";
import { useState } from "react";
import { Button } from "_components/Button";
import { useSession } from "next-auth/react";
import USER_DATA from "_components/userData";
import { Toaster, toast } from "react-hot-toast";
import { trpc } from "_trpc/_important/client";

const Page = () => {
  const { data: session } = useSession();
  const user_id = session?.user.id as string;

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const postData = trpc.joiningRequest.useMutation({
    onSuccess(data, variables, context) {
      toast.dismiss();
      toast.success(JSON.stringify(data));
    },
    onError(error, variables, context) {
      toast.dismiss();
      toast.error(JSON.stringify(error.data?.code));
    },
  });

  const submitData = async () => {
    if (!user_id) {
      toast.dismiss();
      toast.error("You have to login before Submitting the form.");
    }
    toast.dismiss();
    toast.loading("Please Wait");
    try {
      await postData.mutateAsync({
        first_name,
        last_name,
        phone,
        email,
        id: user_id,
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error("An error occurred");
    }
  };

  return user_id ? (
    <div className="mx-auto w-full">
      <form className="grid w-full gap-6 mb-6 md:grid-cols-2">
        {/* First Name */}
        <Toaster position="bottom-left" />
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block w-full mb-2 text-sm font-medium text-gray-900 "
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            min={2}
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="John"
            required
          />
        </div>
        {/* Last Name */}
        <div className="w-full">
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            min={2}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Doe"
            required
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}
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
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            maxLength={10}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            minLength={10}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="0123456789"
            pattern="[0-9]{10}"
            required
          />
        </div>
      </form>

      <Button
        onClick={(e) => {
          e.preventDefault();
          submitData();
        }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Submit
      </Button>
    </div>
  ) : (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <USER_DATA />
    </div>
  );
};

export default Page;
