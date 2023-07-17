import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="h-[100vh] flex flex-col justify-center items-center ">
      <h1 className="text-[150px] lg:text-[350px] text-[#0C4A60]">
        4<span className="text-[#ABDFF1]">0</span>4
      </h1>
      <p className="uppercase font-semibold mt-[-50px] ">Sorry, there is nothing here</p>
      <Link to="/" className="uppercase font-bold bg-[#ABDFF1] tracking-wide px-4 py-2 m-2 rounded-md">Go back</Link>
    </section>
  );
}
