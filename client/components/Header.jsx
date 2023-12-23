import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: "8px 0px 0px 0px" }}>
        <Container>
          <Navbar.Brand href="/" style={{ color: "white", fontSize: "42px", textDecoration: "none" }}>
            <img
              alt="Rubber Puckie Logo "
              src="/assets/images/rubber_puckie_logo.png"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{' '}
            RUBBER PUCKIES
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: "0px 0px 8px 0px" }}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link>Roster</Nav.Link>
              <Nav.Link>Team History</Nav.Link>
              <NavDropdown title="Players" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#bretta">Brett A</NavDropdown.Item>
                <NavDropdown.Item href="#lukew">Luke W</NavDropdown.Item>
                <NavDropdown.Item href="#zachd">Zach D</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link>Season Log</Nav.Link>
              <Nav.Link>Records</Nav.Link>
              <Nav.Link href="/private">Admin Controls</Nav.Link>

              {/* {user?._id !== undefined && (
                <Nav.Link href="/private">Admin Controls</Nav.Link>
              )} */}

              {/* {user?._id !== undefined ? (
                <Nav.Link href="/logout">Logout</Nav.Link>
              ) : (
                <Nav.Link href="/auth">Login</Nav.Link>
              )} */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
