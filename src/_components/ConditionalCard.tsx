import { Role } from "@prisma/client";
import ConditionalButton from "_components/ConditionalButton";

export const ConditionalCard = ({
  role, href, login, result,
}: {
  role: Role;
  href?: string;
  login?: boolean;
  result: string;
}) => {
  return (
    <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
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
        <ConditionalButton
          classes="text-sm sm:text-base"
          href={href ?? ""}
          login={login}
          result={result} />
      </div>
    </div>
  );
};
