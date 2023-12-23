import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/assets/images/rubber_puckie_logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            RUBBER PUCKIES
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link>Roster</Nav.Link>
              <Nav.Link>Team History</Nav.Link>
              <Nav.Link>Players</Nav.Link>
              <Nav.Link>Season Log</Nav.Link>
              <Nav.Link>Records</Nav.Link>

              {user?._id !== undefined && (
                <Nav.Link href="/private">Admin Controls</Nav.Link>
              )}

              {user?._id !== undefined ? (
                <Nav.Link href="/logout">Logout</Nav.Link>
              ) : (
                <Nav.Link href="/auth">Login</Nav.Link>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
