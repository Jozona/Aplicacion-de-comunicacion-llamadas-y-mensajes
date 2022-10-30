import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";

function Navigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const endSession = (event) => {
    logout();
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
      <Navbar.Brand href="#home">
            <img
              src="https://cdn.discordapp.com/attachments/976686244526436392/1026732235577098320/logo_sin_letras.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="containerFluid me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item>
              <Nav.Link onClick={() => { navigate("/Test", { replace: true }); }} className='text-light'>
                Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => { navigate("/Chats", { replace: true }); }} className='text-light'>
                Mensajes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='text-light'>
                Tareas
              </Nav.Link>
            </Nav.Item>

          </Nav>
          <Nav>
            <NavDropdown title={<span className="text-light">Tu perfil</span>} id="navbarScrollingDropdown" >
              <NavDropdown.Item href="#action3">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>signOut(auth)}>
              Salir de sesion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;