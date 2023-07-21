import Login from "../components/auth/Login";

export default function Welcome() {
  return (
    <div className="h-[100vh] flex py-16 lg:py-8 justify-between overflow-hidden lg:p-12 gap-6 bg-[#E0E7E9]">
      <div className="flex flex-col h-[100%] gap-[50px] flex-grow mt-4 lg:mt-0">
        <nav>
          <h3 className="text-center lg:text-left uppercase text-xl font-bold flex gap-3 items-center">
            <img
              className="h-[37px] rounded-[50%] "
              src="/images/logo.png"
              alt="logo"
            />
            assiniga ent
          </h3>
        </nav>
        <div>
          <Login />
        </div>
      </div>
      <div className="h-[100%] hidden lg:block ">
        <img
          className="h-full w-full object-cover rounded-[20px] "
          src="images/welcome.png"
          alt="welcome screen"
        />
      </div>
    </div>
  );
}
