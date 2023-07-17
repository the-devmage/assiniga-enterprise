import { nameInitials } from "../utils/helpers/NameInitials";
export default function UserInfo({ user }) {
  const initials = nameInitials(user.name);
  return (
    <div className="users-layout gap-x-[2.4rem] items-center px-5 py-3 border-b border-b-[#ABDFF1] hover:bg-[#ABDFF1] rounded-md ease-in-out duration-300 ">
      <div className="rounded-[50%] flex justify-center items-center bg-[#0C4A60] w-[50px] h-[50px] mr-4 mb-2 text-white">
        {initials}
      </div>
      <div>{user.name}</div>
      <div>{user.contact} </div>
      <div>{user.email} </div>
    </div>
  );
}
