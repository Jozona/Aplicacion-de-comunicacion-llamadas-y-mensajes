import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../Hooks/UseAuth";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const endSession = (event) => {
    logout();
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className='text-light'> Teams2 </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="containerFluid me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item>
              <Nav.Link className='text-light'>
                Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='text-light'>
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
                Salir de sesion
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { navigate("/home/perfil", { replace: true }); }}>
                Perfil
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;