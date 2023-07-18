import { NavLink } from "react-router-dom";
import {
  BiSolidDashboard,
  BiSolidShoppingBag,
  BiSolidCartAdd,
} from "react-icons/bi";
import { FiLogOut, FiSettings, FiUsers } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { nameInitials } from "../utils/helpers/NameInitials";

export default function Sidebar() {
  // const navigate = useNavigate();
  const { logout } = useAuth();

  //  destructuring user's name
  const { user } = useAuth();
  const { displayName } = user;
  // asynchronous function to log user out
  async function handleSignOut() {
    try {
      await logout();
      toast.success("logout successful");
    } catch (error) {
      toast.error("can't logout now");
    }
  }

  // active link style

  const activeLink =
    "flex items-center gap-3 px-6 py-3 bg-[#ABDFF1] rounded-lg";
  // bg-[#ABDFF1] rounded-lg flex items-center gap-3 p-3 w-[60%]

  return (
    <nav className="h-full flex flex-col justify-between p-2 pb-10">
      <ul className="flex flex-col gap-4 ">
        <li className="sidebar-list ">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <BiSolidDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="sidebar-list">
          <NavLink
            to="product"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <BiSolidShoppingBag />
            <span>Products</span>
          </NavLink>
        </li>
        <li className="sidebar-list">
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <BiSolidCartAdd />
            <span>Cart</span>
          </NavLink>
        </li>
        <li className="sidebar-list">
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <FiUsers fill="currentColor" />
            <span>Users</span>
          </NavLink>
        </li>
        <li className="sidebar-list">
          <NavLink
            to="settings"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <FiSettings />
            <span>Settings</span>
          </NavLink>
        </li>
        <li
          className="sidebar-list flex items-center gap-3 px-6 py-3 "
          onClick={handleSignOut}
        >
          <FiLogOut />
          <span>Logout</span>
        </li>
      </ul>
      <div className="flex items-center gap-2 py-[6px] px-3 rounded-md bg-[#ABDFF1]  ">
        <div className="w-10 h-10 p-1 text-white flex justify-center items-center rounded-full bg-[#0C4A60]">
          {nameInitials(displayName)}
        </div>
        <p>{displayName}</p>
      </div>
    </nav>
  );
}
