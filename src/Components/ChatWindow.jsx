import Navigation from '../Components/NavigationLayout';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { collection, query, where, getDocs, serverTimestamp, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";
import Search from '../Components/Search';
import { db, storage } from '../firebase';
import { arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


//Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import { useContext } from 'react';
import { ChatConext } from '../Context/ChatContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuid } from "uuid";
import { AuthConext } from '../Context/AuthContext';
import Mensaje from './Mensaje';
import MessageGroup from './MessageGroup';

const ChatWindow = () => {

    const { data } = useContext(ChatConext);
    const [err, setErr] = useState(false);

    const [idGroup, setIdGroup] = useState("null");
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);

    const [chatIsGroup, setIsGroup] = useState(false);

    const { currentUser } = useContext(AuthConext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })





        return () => {

            unSub()
        }



    }, [data.chatId]);

    useEffect(() => {

        const unSubGroup = onSnapshot(doc(db, "chats", idGroup), (doc) => {
            doc.exists() && setMessagesGroup(doc.data().messages)
            console.log(idGroup)
        })

        return () => {
            unSubGroup()
        }



    }, [idGroup]);
    



    //DIVISION PARA EL ENVIO DE MENSAJES
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSendMessage = async () => {

        if (chatIsGroup) {
            console.log("es grupo")
            if (img) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", idGroup), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                    displayName: currentUser.displayName,
                                    photoURL: currentUser.photoURL,
                                }),
                            });
                        });
                    }
                );

            } else {
                await updateDoc(doc(db, "chats", idGroup), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    })
                })
            }
        } else {
            if (img) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    (error) => {
                        //TODO:Handle Error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        });
                    }
                );

            } else {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    })
                })
            }

            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", data.user.uid), {
                [data.chatId + ".lastMessage"]: {
                    text,
                },
                [data.chatId + ".date"]: serverTimestamp(),
            });
        }


        setIsGroup(false);
        setIdGroup("null")
        setMessagesGroup([])
        console.log("ya lo puse falso")
        setText("");
        setImg(null);
    }


    // DIVISION PARA TRAER MSG DE UN GRUPO
    const handlerGroup = async (g) => {

        try {
            console.log("chats/" + g)
            const docRef = doc(db, "chats", g);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setIsGroup(true);
                setIdGroup(g);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setIsGroup(false);
                setIdGroup("null");
                setMessagesGroup([])
            }

        } catch (err) {

        }
    }

    const handlerDefaultUser = () => {

        console.log("yo")

    }



    return (
        <div className='w-75 ms-5 h-100' >
            <Card className='chatContainer w-100 h-100' style={{}}>
                <Card.Body className='.bg-info'>
                    <Card.Title onClick={handlerDefaultUser} onChange={handlerGroup(data.user?.displayName)}>{data.user?.displayName}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush overflow-auto">


                    {messages.map((m) => (
                        <Mensaje message={m} key={m.id} />
                    ))}

                    {messagesGroup.map((m) => (
                        <MessageGroup message={m} key={m.id} />
                    ))}



                </ListGroup>
                <Card.Body>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Control className="me-auto" placeholder="Escribe tu mensaje aqui..." onChange={e => setText(e.target.value)} />

                        <div className="vr" />
                        <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                        <Button variant="secondary" onClick={handleSendMessage}>Enviar</Button>
                    </Stack>
                </Card.Body>
            </Card>
        </div>

    )

}

export default ChatWindow