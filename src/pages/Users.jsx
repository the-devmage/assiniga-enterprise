import Modal from "../components/Modal";
import UserInfo from "../components/UserInfo";
import UserModal from "../components/UserModal";
import { useState } from "react";
import Loading from "../components/Loading";
import { useUser } from "../context/user/UserContext";

export default function Users() {
  const [modalOpen, setModalOpen] = useState(false);

  // async function getUsers() {
  const { users, loading } = useUser();

  return (
    <>
      <h1 className="mb-6 ml-12 text-4xl font-bold ">User</h1>
      <section className="bg-[#E8F7FB] min-h-[80%] rounded-xl m-3 py-8 px-8 ">
        <header className="pb-6 border-b-[#0C4A60] text-right">
          <button
            className="bg-[#ABDFF1] text-sm shadow-none hover:shadow-lg ease-in-out transition-400 px-6 py-2 rounded-xl "
            onClick={() => setModalOpen(true)}
          >
            Add New User
          </button>
        </header>

        <div className="flex flex-col ">
          <header className="users-layout gap-x-[2.4rem] mb-2 mx-10 uppercase font-bold px-5 font-helvetica ">
            <div></div>
            <div>User</div>
            <div>Contact</div>
            <div>Email</div>
          </header>

          <section>
            {loading && <Loading height={"100%"} />}
            {users.map((user) => (
              <UserInfo key={user.id} user={user} />
            ))}
          </section>
        </div>
      </section>

      <Modal modalOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <UserModal />
      </Modal>
    </>
  );
}
