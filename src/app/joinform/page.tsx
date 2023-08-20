"use client";
import React, { useEffect, useState } from "react";
import { postData } from "./postData";
import State from "./state";
import { removeAllListeners } from "process";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";

const form = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("+91");
  const [namelen, setnamelen] = useState(50);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const validateEmail = () => {
    if (mail.length > 3) {
      setIsValidEmail(/^\S+@\S+\.\S+$/.test(mail));
    } else setIsValidEmail(true);
  };
  useEffect(() => {
    setnamelen(50 - name.length);
  }, [name]);

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      // Check if Ctrl+A is pressed (keyCode 65) and Ctrl key is also pressed (event.ctrlKey)
      if ((event.key === "a" || event.key === "A") && event.ctrlKey) {
        event.preventDefault(); // Prevent the default Ctrl+A behavior
        console.log("Fucker");
      }
    });
    return () => {
      removeAllListeners;
    };
  }, []);

  const { data: session } = useSession();

  if (session?.user.role === "USER") {
    return (
      <div className="flex select-none flex-col gap-10 min-h-[80vh] justify-center items-center w-full">
        <div className="flex flex-col items-center gap-10 min-h-fit justify-center w-full">
          <h1 className="text-3xl">Joining Form</h1>
          <Toaster position="bottom-left" />
          <form
            className={`flex flex-col max-w-[600px] w-full gap-4`}
            action={async (data) => {
              const res = await postData(data);

              console.log(res?.id);
              if (res?.id === "INVDATA") {
                toast.error(`Can't submit form, enteries are invalid`);
              } else if (res?.id === "P2002") {
                toast.error(`This Phone Number is already in use`);
              } else if (res?.id) {
                router.replace("/profile");
              }
            }}
          >
            <State>
              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full flex-col">
                  <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      maxLength={50}
                      value={name}
                      onChange={(e) => {
                        e.preventDefault;
                        setName(e.target.value);
                      }}
                      className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
                    />
                    <label className="absolute -top-3 pointer-events-none px-2  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
                      Name
                    </label>
                  </div>
                  <h1 className="px-3 text-xs text-gray-500 mt-2">
                    {namelen} Charcters Remaining
                  </h1>
                </div>

                <div className="flex w-full flex-col">
                  <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone"
                      maxLength={13}
                      minLength={3}
                      value={phone}
                      onChange={(e) => {
                        e.preventDefault();
                        if (
                          /^[0-9+]*$/.test(e.target.value) &&
                          e.target.value.length > 2
                        ) {
                          setPhone(e.target.value);
                        }
                      }}
                      className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
                    />
                    <label className="absolute -top-3 pointer-events-none px-2  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
                      Phone
                    </label>
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <div className="flex w-full p-3 rounded-md relative border border-gray-700/80  flex-col">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={mail}
                      onChange={(e) => {
                        e.preventDefault();
                        setMail(e.target.value);
                        validateEmail();
                      }}
                      className="peer outline-none  px-2  placeholder:text-transparent ring-0 "
                    />
                    <label className="absolute -top-3 pointer-events-none px-2  bg-white  peer-focus:text-black peer-focus:bg-white   left-3 peer-focus:-top-3 peer-placeholder-shown:top-3 text-base font-medium text-black">
                      Email
                    </label>
                  </div>
                  {!isValidEmail && (
                    <p className="px-3 mt-1" style={{ color: "red" }}>
                      Invalid email format
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-700 rounded-md text-white p-2 w-fit text-start block text-base font-medium "
                >
                  Submit
                </button>
              </div>
            </State>
          </form>
        </div>
      </div>
    );
  }
  if (session?.user.role === "APPLIED") {
    return (
      <div className="flex select-none flex-col gap-10 min-h-[80vh] justify-center items-center w-full">
        <div className="flex flex-col items-center gap-10 min-h-fit justify-center w-full">
          <h1 className="text-2xl">
            You've already filled this form , please wait for approval
          </h1>
          <h1 className="text-base">Right Now, you can explore our app.</h1>
          <Link
            href={"/"}
            className="bg-blue-700 w-fit rounded-md text-white px-4 py-2"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }
  if (session?.user.role === "EDITOR"||session?.user.role === "ADMIN") {
    return (
      <div className="flex select-none flex-col gap-10 min-h-[80vh] justify-center items-center w-full">
        <div className="flex flex-col items-center gap-10 min-h-fit justify-center w-full">
          <h1 className="text-2xl">
            You're already a contributor to this platform.
          </h1>
          <h1 className="text-base">Right Now, you can explore our app.</h1>
          <Link
            href={"/"}
            className="bg-blue-700 w-fit rounded-md text-white px-4 py-2"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }
};

export default form;
