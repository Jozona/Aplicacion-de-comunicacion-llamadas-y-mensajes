import React from 'react';
import Navigation from '../Components/NavigationLayout';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Chats.css';
import { Container } from 'react-bootstrap';

class Chats extends React.Component {
    constructor(props) {
        super(props);
        console.dir(props);
        this.state = {
            prop: props,
            cantidadBotones: 0
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            
            <section className="vh-100 gradient-custom">
                <div>
                    <Navigation />

                    <br />\
                    <Container>
                    <Stack direction="horizontal" gap={3} >
                        <div >
                            <ListGroup as="ol" >
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={60}
                                        height={60} />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">Subheading</div>
                                        Cras justo odio
                                    </div>
                                    <Badge bg="primary" pill>
                                        14
                                    </Badge>
                                </ListGroup.Item>

                            </ListGroup>
                        </div>
                        <div>
                            <Card style={{ width: '67rem', height: '44rem' }}>
                                <Card.Body className='.bg-info'>
                                    <Card.Title >Chat con Usuario #3321</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <Card.Img variant="left" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="rounded-circle" width={32}
                                                height={30} />
                                            <div className="fw-bold">Subheading</div>
                                        </Stack>
                                        <div className="ms-5 me-auto ml-5">

                                            Cras justo odio
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Stack direction="horizontal" gap={3}>
                                        <Form.Control className="me-auto" placeholder="Escribe tu mensaje aqui..." />

                                        <div className="vr" />
                                        <Button variant="secondary">Enviar</Button>
                                    </Stack>
                                </Card.Body>
                            </Card>
                        </div>
                    </Stack >
                    </Container>
                </div>
            </section>
        )
    }
}

export default Chats;