import { nameInitials } from "../utils/helpers/NameInitials";
export default function UserInfo({ user }) {
  const initials = nameInitials(user.name)
  return (
    <>
      <tr>
        <td className="flex items-center ">
          <span className="rounded-[50%] flex justify-center items-center bg-[#0C4A60] w-[50px] h-[50px] mr-4 mb-2 text-white">
            {initials}
          </span>
          <span>{user.name} </span>
        </td>
        <td>
          <em>{user.contact} </em>
        </td>
        <td>{user.email} </td>
      </tr>
    </>
  );
}
