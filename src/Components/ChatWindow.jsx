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
import { arrayUnion, arrayRemove } from "firebase/firestore";
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

const ChatWindow = () => {

    const { data } = useContext(ChatConext);

    const [messages, setMessages] = useState([]);

    const { currentUser } = useContext(AuthConext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }

    }, [data.chatId]);



    //DIVISION PARA EL ENVIO DE MENSAJES
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSendMessage = async () => {
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

        setText("");
        setImg(null);
    }

    return (
        <div className='w-75 ms-5 h-100' >
            <Card className='chatContainer w-100 h-100' style={{}}>
                <Card.Body className='.bg-info'>
                    <Card.Title >{data.user?.displayName}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush overflow-auto">


                    {messages.map((m) => (
                        <Mensaje message={m} key={m.id} />
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