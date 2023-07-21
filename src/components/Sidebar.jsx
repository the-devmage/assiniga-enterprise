import { NavLink } from "react-router-dom";
import {
  BiSolidDashboard,
  BiSolidShoppingBag,
  BiSolidCartAdd,
} from "react-icons/bi";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { useUser } from "../context/user/UserContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function Sidebar() {
  const { logout } = useAuth();
  const { currentUser, loading } = useUser();

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
      <div className="text-center lg:text-left uppercase text-xl font-bold flex flex-col gap-3 items-center">
        <img
          className="h-[40px] rounded-[50%] "
          src="/images/logo.png"
          alt="logo"
        />
        <p className="tracking-wider">Assiniga</p>
      </div>
      <ul className="flex flex-col gap-4 mt-[-10px] ">
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
            to="records"
            className={({ isActive }) =>
              isActive ? activeLink : "flex items-center gap-3 px-6 py-3 "
            }
          >
            <ImBooks />
            <span>Records</span>
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
            <IoSettings />
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
        {loading && <Loading height={"25px"} loadingSize={20} />}

        <div className="w-10 h-10 p-1 text-white flex justify-center items-center rounded-full bg-[#0C4A60]">
          {currentUser?.location.charAt(0)}
        </div>
        <p>{currentUser?.location}</p>
      </div>
    </nav>
  );
}
