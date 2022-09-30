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
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand > Home </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="containerFluid me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Opciones" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Videollamada</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Chat
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{navigate("/home/perfil", { replace: true });}}>
                Perfil
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={endSession}>
                  Sign Out
                </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;