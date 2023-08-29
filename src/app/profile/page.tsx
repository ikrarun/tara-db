import React from "react";
import USER_DATA from "../../_components/userData";
import { getServerAuthSession } from "Auth/auth";
import { Button } from "_components/Button";

const Profile = async () => {
  const session = await getServerAuthSession();

  const role = session?.user.role;

  if (!session) {
    return <USER_DATA />;
  }

  return role === "EDITOR" || role === "ADMIN" ? (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
        {/* s1 */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl">
            Thank you for actively contributing to this project.{" "}
          </h1>
          <h1 className="text-base text-gray-900/90">
            By being an integral part of our project, your active contributions
            play a vital role in its success. Your dedication and efforts are
            shaping our shared vision into reality. We extend our heartfelt
            gratitude for your ongoing support and participation, as together,
            we make meaningful strides towards our project&apos;s goals.
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
        <div className="flex flex-col justify-start items-start w-full">
          <Button
            className="text-sm sm:text-base inline-flex bg-blue-700 text-white hover:bg-blue-800 rounded-full py-3 px-5 items-center justify-center gap-2"
            href="/join_us"
          >
            Join Us
          </Button>
        </div>

        <h1 className="text-base text-gray-900/90">
          Join us as a contributor and be a vital part of our mission to create
          positive change.
        </h1>
      </div>
      <div className="my-2 border-b w-fit border-gray-900" />
      <USER_DATA />
    </div>
  );
};

export default Profile;
