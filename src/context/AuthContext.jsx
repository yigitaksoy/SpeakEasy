import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getCurrentUser = () => {
    console.log(currentUser);
    return currentUser;
  };

  return (
    <AuthContext.Provider value={{ getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
