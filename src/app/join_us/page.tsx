"use client";
import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { submit_Form } from "./submitFormData";
import { useSession } from "next-auth/react";
import USER_DATA from "../../components/userData";

const Page = () => {
  const { data: session } = useSession();
  const user_id = session?.user.id;
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      id: user_id ?? "",
    },
    onSubmit: async (values) => {
      const firstName = z.string().parse(values.first_name);
      const lastName = z.string().parse(values.last_name);
      const email = z.string().email().parse(values.email);
      const id = z.string().parse(values.id);
      const phone = z
        .string()
        .regex(/^\d{10}$/)
        .parse(values.phone);

      if (firstName && lastName && email && phone && id) {
        const res = await submit_Form(values);
        return res;
      }
      return "failed";
    },
  });

  return user_id ? (
    <form onSubmit={formik.handleSubmit} className="mx-auto">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* First Name */}
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Doe"
            required
            onChange={formik.handleChange}
            value={formik.values.last_name}
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
            onChange={formik.handleChange}
            value={formik.values.email}
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
            onChange={formik.handleChange}
            value={formik.values.phone}
            minLength={10}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="0123456789"
            pattern="[0-9]{10}"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Submit
      </button>
    </form>
  ) : (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <USER_DATA />
    </div>
  );
};

export default Page;
