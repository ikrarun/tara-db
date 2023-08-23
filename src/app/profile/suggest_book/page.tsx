import { getServerAuthSession } from "@/server/auth";
import SuggestionForm from "./SuggestionForm";
import Link from "next/link";
import { Role } from "@prisma/client";
const submitData = async (data: FormData) => {
  "use server";
  console.log(data);
  return "a";
};

const Suggested = async () => {
  const session = await getServerAuthSession();
  const role = session?.user.role;

  if (role === "EDITOR" || role === "ADMIN") {
    return (
      <div className="min-h-[70vh] flex flex-col w-full items-center gap-4 justify-center">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <h1 className="text-3xl font-semibold">Suggest a Book</h1>
          <h1 className="text-base">
            Thanks for choosing to suggest a book to our users.
          </h1>
        </div>
        <SuggestionForm submitData={submitData} />
      </div>
    );
  }

  if (role === "USER" || role === "APPLIED") {
    if (role === "USER") {
      return (
        <ConditionalCard role={"USER"} href={"/join_form"} result={"Join Us"} />
      );
    } else if (role === "APPLIED")
      return <ConditionalCard role={"APPLIED"} href={"/"} result={"Home"} />;
  }

  if (!session) {
    return (
      <ConditionalCard
        role={"USER"}
        href={"/api/auth/signin"}
        result={"Sign In"}
      />
    );
  }
};

const ConditionalCard = ({
  role,
  href,
  result,
}: {
  role: Role;
  href: string;
  result: string;
}) => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 border rounded-md border-gray-700/50">
        <h1 className="text-2xl font-semibold">
          Thanks for showing your interest.
        </h1>
        <h1 className="text-sm">
          But you have to join us, before posting anything to platform.
        </h1>
        <h1 className="text-xs text-gray-500">
          {role === "APPLIED" &&
            "If you&apos;ve already applied for joining please wait for a moment."}
        </h1>
        <Link
          className="p-2 text-white bg-gray-950 rounded-md w-fit"
          href={href}
        >
          {result}
        </Link>
      </div>
    </div>
  );
};

export default Suggested;
