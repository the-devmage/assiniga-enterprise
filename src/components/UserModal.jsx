import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";

export default function UserModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await addUser(name, contact, email, password);
      toast.success("added a new user!");
      setName("");
      setContact("");
      setEmail("");
      setPassword("");
      setLoading(false);
      onClose();
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold ">Create New User</h2>
      <form
        onSubmit={handleSubmit}
        className="h-[300px] flex flex-col justify-center gap-6 items-center mt-4 "
      >
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-[100%] h-12 ">
          <input
            className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-full px-6 text-[14px] "
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            className="absolute right-5 top-2 text-[12px] cursor-pointer "
          >
            {showPassword ? <BiHide size={18} /> : <BiShow size={18} />}
          </span>
        </div>
        <button
          className="bg-[#ABDFF1] mt-8 rounded-lg border-[1px] border-[#0C4A60] h-10 px-6 place-self-end hover:shadow-md "
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </>
  );
}
