import React from "react";
import USER_DATA from "./userData";

import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/essentials/Button";

const Profile = async () => {
  const session = await getServerAuthSession();

  const role = session?.user.role;

  if (!session || role === "USER") {
    return (
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Would you like to contribute to this project?
            </h1>
            <h1 className="text-base text-gray-900/90">
              We are reaching out to you with a sincere request for support. Our
              project holds great potential to create positive change, but we
              need assistance to bring our vision to life. Your contribution,
              whether it&apos;s your time, expertise, or resources, can play a
              pivotal role in making this project a success. We believe that by
              working together, we can achieve something remarkable. Your
              support would not only help us achieve our goals but also be a
              testament to the strength of our community. We are excited about
              the possibilities and would be truly grateful if you could join us
              on this journey. Thank you for considering our request.
            </h1>
          </div>
          {/* s2 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/donate_link"
            >
              Donate Us
            </Link>

            <h1 className="text-base text-gray-900/90">
              Join hands with us in making a difference. Your contribution will
              help us achieve our goals and leave a lasting legacy.
            </h1>
          </div>
          {/* s3 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/join_form"
            >
              Join Us
            </Link>

            <h1 className="text-base text-gray-900/90">
              Join us as a contributor and be a vital part of our mission to
              create positive change.
            </h1>
          </div>

          {/* s4 */}
          <div className="my-5 border-b border-gray-900" />
        </div>
        {/* <USER_DATA all_session={all_session} /> */}
        <USER_DATA />
      </div>
    );
  } else if (role === "EDITOR" || role === "ADMIN") {
    return (
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Thank you for actively contributing to this project.{" "}
            </h1>
            <h1 className="text-base text-gray-900/90">
              By being an integral part of our project, your active
              contributions play a vital role in its success. Your dedication
              and efforts are shaping our shared vision into reality. We extend
              our heartfelt gratitude for your ongoing support and
              participation, as together, we make meaningful strides towards our
              project&apos;s goals.
            </h1>
          </div>
          {/* s2 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/donate_link"
            >
              Donate Us
            </Link>

            <h1 className="text-base text-gray-900/90">
              Join hands with us in making a difference. Your contribution will
              help us achieve our goals and leave a lasting legacy.
            </h1>
          </div>
          {/* s3 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/profile/post"
              prefetch={false}
            >
              Create A Post
            </Link>

            <h1 className="text-base text-gray-900/90">
              Unveil the truth and dispel myths surrounding the remarkable lives
              of Ambedkar and Buddha. Join us in unraveling the inspiring
              stories that shaped their legacies, as we delve into the journey
              of enlightenment and social transformation. Let&apos;s contribute to a
              more informed perspective by sharing the untold facts and
              dispelling misconceptions through our upcoming post.
            </h1>
          </div>
          {/* s4 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/profile/suggest_book"
            >
              Suggest A Book
            </Link>

            <h1 className="text-base text-gray-900/90">
              Whether you&apos;re seeking intellectual stimulation or a momentary
              escape, our diverse collection has something for every reader.
              Embark on a literary journey and immerse yourself in the
              captivating realms waiting within these pages.
            </h1>
          </div>
          {/* s5 */}
          <div className="my-5 border-b border-gray-900" />
        </div>
        {/* <USER_DATA all_session={all_session} /> */}
        <USER_DATA />
      </div>
    );
  } else if (session.user.role === "APPLIED") {
    return (
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4">
          {/* s1 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">
              Would you like to contribute to this project?
            </h1>
            <h1 className="text-base text-gray-900/90">
              We are reaching out to you with a sincere request for support. Our
              project holds great potential to create positive change, but we
              need assistance to bring our vision to life. Your contribution,
              whether it&apos;s your time, expertise, or resources, can play a
              pivotal role in making this project a success. We believe that by
              working together, we can achieve something remarkable. Your
              support would not only help us achieve our goals but also be a
              testament to the strength of our community. We are excited about
              the possibilities and would be truly grateful if you could join us
              on this journey. Thank you for considering our request.
            </h1>
          </div>
          {/* s2 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <Link
              className="px-2 py-1 text-xl text-white bg-blue-700 rounded-md w-fit"
              href="/donate_link"
            >
              Donate Us
            </Link>

            <h1 className="text-base text-gray-900/90">
              Join hands with us in making a difference. Your contribution will
              help us achieve our goals and leave a lasting legacy.
            </h1>
          </div>
          {/* s3 */}
          <div className="my-5 border-b border-gray-900" />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-900/90">
              Thanks for showing your interest to work with us, please wait while
              are processing your request.
            </h1>
            <h1 className="text-base text-gray-900/90">
              Join us as a contributor and be a vital part of our mission to
              create positive change.
            </h1>
          </div>

          {/* s4 */}
          <div className="my-5 border-b border-gray-900" />
        </div>
        {/* <USER_DATA all_session={all_session} /> */}
        <USER_DATA />
      </div>
    );
  }
};

export default Profile;
