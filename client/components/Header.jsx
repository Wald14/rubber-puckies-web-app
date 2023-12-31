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
          <Navbar.Brand href="/" style={{ color: "white", textDecoration: "none" }} className="fs-1">
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

              <Nav.Link href="/roster" className="text-warning">Current Roster</Nav.Link>
              <Nav.Link href="/teamhistory" className="text-warning">Team History</Nav.Link>
              {/* <NavDropdown title={<span className="text-warning">Players</span>} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#bretta">Brett A</NavDropdown.Item>
                <NavDropdown.Item href="#lukew">Luke W</NavDropdown.Item>
                <NavDropdown.Item href="#zachd">Zach D</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="text-warning">Season Log</Nav.Link>
              <Nav.Link className="text-warning">Records</Nav.Link> */}

              {user?._id !== undefined &&
                <>
                  <Nav.Link href="/admintools" className="text-info">Admin Tools</Nav.Link>
                  <Nav.Link href="/logout" className="text-danger">Logout</Nav.Link>
                </>
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
