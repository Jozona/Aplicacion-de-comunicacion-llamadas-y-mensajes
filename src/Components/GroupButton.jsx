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
import { useRef } from 'react';
import {  Firestore, setDoc } from "firebase/firestore";

//Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import { useContext } from 'react';
import { ChatConext } from '../Context/ChatContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuid } from "uuid";
import { AuthConext } from '../Context/AuthContext';
import Image from 'react-bootstrap/Image'
import React from 'react';
import Modal from 'react-bootstrap/Modal';
const GroupButton = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [displayName, setName] = useState("");
    const [img, setImg] = useState(null);
    const [err, setErr] = React.useState(false);

    const sendGroup = async ()=>{
        try {
            
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${name + date}`);
      
      
            await uploadBytesResumable(storageRef, img).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //create user on firestore
                  await setDoc(doc(db, "users", displayName), {
                    uid: uuid(),
                    displayName,
                    photoURL: downloadURL,
                  });
      
                  await setDoc(doc(db, "userChats", displayName), {});
                  await setDoc(doc(db, "chats", displayName), { messages: [] });
                  navigate("/chats");
      
                } catch (err) {
                  console.log(err);
                  setErr(true);
                }
              });
            });
      
          } catch (err) {
            setErr(true);
            console.log(err);
          }
    }

    return (
        <>
            <Button variant="dark" onClick={handleShow}>
                Crear un chat grupal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear un chat grupal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre del grupo</Form.Label>
                            <Form.Control type="text" placeholder="Grupo de..." onChange={e => setName(e.target.value)}/>
                            <Form.Text className="text-muted">
                                El nombre va a tener un identificador agregado para que otras personas puedan entrar
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Foto del grupo</Form.Label>
                            <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                        </Form.Group>
                        <Button variant="primary" onClick={sendGroup}>
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <br></br>
        </>
    );
};

export default GroupButton