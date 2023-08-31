import {Button} from 'components/Buttons/Button'
import AuthButton from 'components/Buttons/AuthButton'
enum Role {
  USER,
  ADMIN,
  APPLIED,
  EDITOR,
  NOROLE
}

enum Login {
  SIGNIN,
  SIGNOUT,
}

const Content = ({ role }:{role:Role}) => {
  let content;
// console.log(role)
  switch (role) {
    case Role.ADMIN||Role.EDITOR:
      content = <div className='flex gap-2 flex-col'>
      <div className='flex flex-col gap-2 ml-2'>
        <h1>Congrats and Thank you</h1>
        <h1>You are already a contributor to this platform.</h1>
       </div>
      </div>
      break;
    case Role.APPLIED:
      content = <div className='flex gap-2 flex-col'>
      <div className='flex flex-col gap-2 ml-2'>
        <h1>Thanks for Showing your Intrest.</h1>
        <h1>But you have to wait for sometime as you have already applied.</h1>
       </div>
        <Button className='w-fit sm:text-sm text-xs' href='/profile'>Profile</Button>
      </div>
      break;
    case Role.USER:
      content = <div className='flex gap-2 flex-col'>
      <div className='flex flex-col gap-2 ml-2'>
        <h1>Thanks for Showing your Intrest.</h1>
        <h1>But You have to Join us, for making Contributions.</h1>
       </div>
        <Button className='w-fit sm:text-sm text-xs' href='/join_us'>Join US</Button>
      </div>
      break;
    default:
     content = (
       <div className="flex gap-2 flex-col">
         <div className="flex flex-col gap-2 ml-2">
           <h1>Thanks for Showing your Intrest.</h1>
           <h1>But,It seems you&apos;re are logged In.</h1>
         </div>
         <AuthButton classes="w-fit sm:text-sm text-xs" login={Login.SIGNIN} />
       </div>
     );
  }


  return content;
};

export const RoleBasedCard = ({ role }: { role: Role }) => {
  return (
    <div className="flex flex-col w-full justify-center bg-gray-400/30 rounded-md h-80 items-center">
      <div className="flex flex-col items-start justify-center gap-3 p-3 ">
        <Content role={role} />
      </div>
    </div>
  );
};
