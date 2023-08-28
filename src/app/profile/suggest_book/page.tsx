import { getServerAuthSession } from "Auth/auth";
import SuggestionForm from "./SuggestionForm";
import { ConditionalCard } from "_components/ConditionalCard";

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
        <SuggestionForm />
      </div>
    );
  }

  if (role === "USER" || role === "APPLIED") {
    if (role === "USER") {
      return (
        <ConditionalCard role={"USER"} href={"/join_us"} result={"Join Us"} />
      );
    } else if (role === "APPLIED")
      return <ConditionalCard role={"APPLIED"} href={"/"} result={"Home"} />;
  }

  if (!session) {
    return <ConditionalCard role={"USER"} login={true} result={"Sign In"} />;
  }
};

export default Suggested;
