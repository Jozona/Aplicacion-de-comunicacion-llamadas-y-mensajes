import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthConext } from "./AuthContext";

export const ChatConext = createContext();
export const ChatContextProvider = ({ children }) => {
    const {currentUser } = useContext(AuthConext);
    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }

    const chatReducer = (state, action) =>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
                }
            default:
                return state;
            }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatConext.Provider value={{ data:state, dispatch }}>

            {children}

        </ChatConext.Provider>
    );
};