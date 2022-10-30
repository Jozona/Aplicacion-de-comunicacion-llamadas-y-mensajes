import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthConext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user)
        });

        return () => {
            unsub();
        }

    }, []);

    return (
        <AuthConext.Provider value={{ currentUser }}>

            {children}

        </AuthConext.Provider>
    );
};