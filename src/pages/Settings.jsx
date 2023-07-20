import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/user/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
export default function Settings() {
  const [name, setName] = useState("Assiniga Enterprise");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const locationRef = useRef(null);

  //fetching current user info
  const { currentUser, loading } = useUser();

  //  setting focus on the input field
  useEffect(() => {
    if (openEdit) {
      locationRef.current.focus();
    }
  }, [openEdit]);

  // user document reference

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const docRef = doc(db, "users", currentUser.id);
      await updateDoc(docRef, {
        contact,
        location,
      });
      toast.success("User details successfully updated");
      setUpdateLoading(false);
    } catch (error) {
      toast.error("Couldn't update user details");
      setUpdateLoading(false);
    }
  }
  return (
    <>
      <h1 className="mb-5 mt-1 ml-12 text-4xl font-bold ">Settings</h1>
      <section className="bg-[#E8F7FB] h-[60%] rounded-xl m-3 py-8 px-4 overflow-auto ">
        <div className=" w-full h-[70%] flex flex-col">
          <form className="m-8 font-helvetica flex flex-col gap-4">
            <div className="flex gap-12 items-center pb-4 border-b-[0.5px] ">
              <label htmlFor="name" className="text-lg w-[150px]">
                Shop name
              </label>
              <input
                type="text"
                value={name}
                disabled
                className="bg-transparent disabled:opacity-75 disabled:cursor-not-allowed rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] h-8 px-6 text-gray-600 text-[16px]"
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="flex gap-12 items-center pb-4 border-b-[0.5px] ">
                  <label htmlFor="name" className="text-lg w-[150px] ">
                    Location
                  </label>
                  <input
                    ref={locationRef}
                    type="text"
                    placeholder={currentUser?.location}
                    value={location}
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!openEdit}
                    className="bg-transparent disabled:opacity-75 disabled:cursor-not-allowed rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] h-8 px-6 text-gray-600 text-[16px]"
                  />
                </div>
                <div className="flex gap-12 items-center pb-4 border-b-[0.5px] ">
                  <label htmlFor="name" className="text-lg w-[150px] ">
                    Contact
                  </label>
                  <input
                    type="text"
                    placeholder={currentUser?.contact}
                    value={contact}
                    required
                    onChange={(e) => setContact(e.target.value)}
                    disabled={!openEdit}
                    className="bg-transparent disabled:opacity-75 disabled:cursor-not-allowed rounded-lg border-[1px] border-[#0C4A60] outline-[#0C4A60] h-8 px-6 text-gray-600 text-[16px]"
                  />
                </div>
              </>
            )}
          </form>
          <div className="self-end flex gap-4 h-[40px] m-5 mx-10 font-semibold font-raleway">
            <button
              onClick={() => setOpenEdit((openEdit) => !openEdit)}
              className="px-6 py-1 w-24 hover:bg-transparent border transition duration-300 hover:opacity-50 border-gray-500 bg-transparent text-gray-700 rounded-md"
            >
              {openEdit ? "Cancel" : "Edit"}
            </button>
            <button
              disabled={!openEdit}
              onClick={handleSubmit}
              className="px-6 py-1 w-24 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-transparent border-0 hover:text-gray-700 hover:border border-gray-500 bg-[#559cb4] text-white rounded-md"
            >
              {updateLoading ? (
                <Loading height={"25px"} loadingSize={20} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
