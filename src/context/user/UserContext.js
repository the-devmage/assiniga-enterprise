import { useState, useContext, createContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../AuthContext";

const FetchedUsers = createContext();

export default function UserContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const email = user?.email;

  //retrieving shop info
  const usersCollection = "users";
  const { data, loading } = useFetch(usersCollection);
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  //  fetching current user
  const currentUser =
    users?.length !== 0
      ? users.filter((user) => user.email === email)[0]
      : null;

  return (
    <FetchedUsers.Provider value={{ users, currentUser, loading }}>
      {children}
    </FetchedUsers.Provider>
  );
}

export function useUser() {
  return useContext(FetchedUsers);
}
