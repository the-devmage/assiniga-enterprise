import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Modal from "../components/Modal";
import UserInfo from "../components/UserInfo";
import UserModal from "../components/UserModal";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

export default function Users() {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  // async function getUsers() {

  useEffect(() => {
    const fetchUser = () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(newData);
      });
    return () => {
      fetchUser();
    };
  }, []);

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
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-left">
              <tr>
                <th className="py-6">Existing Users</th>
                <th className="py-6">Contacts</th>
                <th className="py-6">Email</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users.map((user, index) => <UserInfo key={index} user={user} />)
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    <Loading height={"100%"} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal modalOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <UserModal />
        </Modal>
      </section>
    </>
  );
}
