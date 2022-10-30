import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useContext, useState, useEffect } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";

//Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import { AuthConext } from '../Context/AuthContext';
import Chats from '../pages/Chats';
import { ChatConext } from '../Context/ChatContext';

const Search = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthConext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", username)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {

        console.log(user);
        console.log(currentUser);
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            console.log("0");
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                console.log("1");
                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                console.log("2");
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                console.log("3");
            }
        } catch (err) {
            console.log(err);

        }

        setUser(null);
        setUsername("")
    };

    const handleButton = e => {
        handleSearch();
        console.log(username)

    }

    // AQUI BUSCAMOS A LAS CONVERSACIONES DEL USUARIO!!! DIVISIOOOOOOOON
    // GRANDE T1 

    const [chats, setChats] = useState([]);

    const { dispatch } = useContext(ChatConext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelectChat = (u) =>{
        dispatch({type: "CHANGE_USER", payload: u})
    }


    return (
        <ListGroup as="ol" >
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Buscar usuario"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onKeyDown={handleKey}
                    onChange={e => setUsername(e.target.value)}
                />
                <Button variant="dark" id="button-addon2" onClick={handleButton}>
                    Buscar
                </Button>
            </InputGroup>
            {err && <span>Usuario no encontrado</span>}
            {user &&
                <div onClick={handleSelect}>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start" >
                        <Card.Img variant="left" src={user.photoURL} className="rounded-circle img" width={60}
                            height={60} />
                        <div className="ms-2 me-auto">
                            <a ><div className="fw-bold" >{user.displayName}</div></a>
                            Jesse
                        </div>
                    </ListGroup.Item></div>}

            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div key={chat[0]} onClick={()=>handleSelectChat(chat[1].userInfo)}><ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <Card.Img variant="left" src={chat[1].userInfo.photoURL} className="rounded-circle img" width={60}
                        height={60} />
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{chat[1].userInfo.displayName}</div>
                        {chat[1].lastMessage?.text}
                    </div>
                </ListGroup.Item></div>
            ))}
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Card.Img variant="left" src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/EFGOFQJMCZHHFJSXZGWTCKGZ3Q.jpeg" className="rounded-circle img" width={60}
                    height={60} />
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Home & Work</div>
                    Bienvenido
                </div>
            </ListGroup.Item>

        </ListGroup>

    )

}

export default Search