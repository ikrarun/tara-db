"use client";
import React from "react";
import USER_DATA from "../../Lib/Auth/userData";
import NavButton from "components/Buttons/NavButton";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();

  const role = session?.user.role;

  if (status==='unauthenticated') {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Thanks for showing intreset in our Project.
            </h1>
            <h1 className="text-base text-gray-900/90">
              We extend our heartfelt gratitude for your ongoing support and
              participation, as together, we make meaningful strides towards our
              project&apos;s goals.
            </h1>
          </div>
        </div>
        <div className="my-4 border-b border-gray-900" />
        <USER_DATA />
      </div>
    );
  }

else if(status==='loading') {
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

  return role === "EDITOR" || role === "ADMIN" ? (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
        {/* s1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">
            Thank you for actively contributing to this project.
          </h1>
          <h1 className="text-base text-gray-900/90">
            We extend our heartfelt gratitude for your ongoing support and
            participation, as together, we make meaningful strides towards our
            project&apos;s goals.
          </h1>
        </div>
      </div>
      <div className="my-4 border-b border-gray-900" />
      <USER_DATA />
    </div>
  ) : (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">
          Would you like to contribute to this project?
        </h1>
        <h1 className="text-base">
          Just update your Profile and that&apos;s it.
        </h1>
        <div className="flex flex-col justify-start items-start w-full">
          <NavButton
            className="w-fit sm:text-sm text-xs"
            href="/profile/update"
            variant="blue"
          >
            Update Now
          </NavButton>
        </div>

        <h1 className="text-base text-gray-900/90">
          Join us as a contributor and be a vital part of our mission to create
          positive change.
        </h1>
      </div>
      <div className="my-4 border-b border-gray-900" />
      <USER_DATA />
    </div>
  );
};

export default Profile;
