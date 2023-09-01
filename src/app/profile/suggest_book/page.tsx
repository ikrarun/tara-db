import { getServerAuthSession } from "Lib/Auth/auth";
import SuggestionForm from "./SuggestionForm";
import { RoleBasedCard } from "components/Cards/RoleBasedCard";
enum Role {
  USER,
  ADMIN,
  APPLIED,
  EDITOR,
  NOROLE,
}
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
        <RoleBasedCard role={Role.USER}  />
      );
    } else if (role === "APPLIED")
      return <RoleBasedCard role={Role.APPLIED}/>;
  }

  if (!session) {
    return <RoleBasedCard role={Role.NOROLE}/>;
  }
};

export default Suggested;
