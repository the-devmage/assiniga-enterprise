import { createContext, useContext, useEffect, useState } from "react";
import {
  setPersistence,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState();

  async function login(email, password) {
    await setPersistence(auth, browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    });
  }

  function logout() {
    return signOut(auth);
  }

  // registering users and adding credential to the users database collection
  async function addUser(name, contact, email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userInfo = userCredential.user;
    await updateProfile(userInfo, {
      displayName: name,
    });
    await addDoc(collection(db, "users"), {
      name,
      contact,
      email,
      uid: userInfo.uid,
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, addUser }}>
      {children}
    </UserContext.Provider>
  );
}

// getting the context
function useAuth() {
  return useContext(UserContext);
}

export { AuthContext, useAuth };
