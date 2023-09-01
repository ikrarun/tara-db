import { Button } from "components/Buttons/Button";
import AuthButton from "components/Buttons/AuthButton";
import { AuthEnums, Role } from "enum";

export function RoleBasedCard({ role }: { role: Role }) {
  return (
    <div className="flex flex-col w-full sm:w-fit py-3 px-7 justify-center bg-gray-400/30 rounded-md h-fit items-start">
      <div className="flex flex-col items-start justify-center p-3 ">
        <Content role={role} />
      </div>
    </div>
  );
}

function Content({ role }: { role: Role }) {
  let content;
  switch (role) {
    case Role.ADMIN || Role.EDITOR:
      content = (
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>Congrats and Thank you</h1>
            <h1>You are already a contributor to this platform.</h1>
          </div>
        </div>
      );
      break;
    case Role.APPLIED:
      content = (
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>Thanks for Showing your Intrest.</h1>
            <h1>
              But you have to wait for sometime as you have already applied.
            </h1>
          </div>
          <Button className="w-fit sm:text-sm text-xs" href="/profile">
            Profile
          </Button>
        </div>
      );
      break;
    case Role.USER:
      content = (
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>Thanks for Showing your Intrest.</h1>
            <h1>If you want to contribute, Just update your Profile and that's it.</h1>
          </div>
          <Button className="w-fit sm:text-sm text-xs" href="/profile/update">
            Update Now
          </Button>
        </div>
      );
      break;
    default:
      content = (
        <div className="flex gap-2 flex-col">
          <div className="flex flex-col gap-2 ml-2">
            <h1>Thanks for Showing your Intrest.</h1>
            <h1>It seems you&apos;re are not logged In.</h1>
          </div>
          <AuthButton
            className="w-fit sm:text-sm text-xs"
            authFunction={AuthEnums.SIGNIN}
          />
        </div>
      );
  }

  return content;
}
