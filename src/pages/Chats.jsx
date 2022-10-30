
import Navigation from '../Components/NavigationLayout';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Chats.css';
import { Container } from 'react-bootstrap';
import { collection, query, where, getDocs } from "firebase/firestore";
import Search from '../Components/Search';
import ChatWindow from '../Components/ChatWindow';


//Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';


class Chats extends React.Component {

    constructor(props) {
        super(props);
        console.dir(props);
        this.state = {
            prop: props,
            cantidadBotones: 0
        };
        document.body.classList.add('bodyBack');
        
    }
    componentDidMount() {
    }



    render() {



        return (

            <section className="vh-100 gradient-custom2">
                <div className='h-100'>
                    <Navigation />

                    <br />
                    <Container >

                        <div className='separar'>
                            <div>
                                <Search />
                            </div>  
                            <ChatWindow />
                        </div>
                    </Container>
                </div>
            </section>
        )
    }
}

export default Chats;