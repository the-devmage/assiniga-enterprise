import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import Loading from "../Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("login successful");
      setLoading(false);
      navigate("/app");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-12 text-center mt-[85px] md:mt-5 md:p-16 ">
      <div>
        <h2 className="text-[40px] font-bold ">Welcome Back</h2>
        <p className="text-[14px]">Sign into your account</p>
      </div>
      <form
        className="flex flex-col justify-between gap-[30px] w-[80%] md:px-20 lg:min-w-[500px] "
        onSubmit={handleSubmit}
      >
        <input
          className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
          type="email"
          required
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            className="bg-transparent rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] w-[100%] h-12 px-6 text-[14px] "
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            className="absolute right-4 top-4 text-[12px] cursor-pointer "
          >
            {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <input
            className=" "
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.value)}
          />
          <span className="text-[12px] ">Remember me</span>
        </div>

        <button
          className="bg-[#ABDFF1] rounded-lg border-[1px] hover:bg-[#a0dff4] w-[100%] h-12 text-[14px] "
          type="submit"
          disabled={loading}
        >
          {loading ? <Loading height={"25px"} loadingSize={20} /> : "Login"}
        </button>
      </form>
    </div>
  );
}
