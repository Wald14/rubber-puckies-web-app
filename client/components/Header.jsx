import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppCtx } from "../utils/AppProvider"

import '../assets/css/navbar.css'

export default function Header() {
  const { user } = useAppCtx()

  const [curPlayers, setCurPlayers] = useState()

  async function getCurPlayers() {
    const query = await fetch("/api/currentroster/Rubber Puckies");
    const result = await query.json();
    const players = result.playerInfo
    players.sort(function (a, b) {
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })
    setCurPlayers(result)
  }

  useEffect(() => {
    getCurPlayers()
  }, [])

  if (curPlayers === null) return <></>

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" style={{ padding: "8px 0px 8px 0px" }}>
        <Container>
          <Navbar.Brand
            href="/"
            className="brandSize">

            <img
              alt="Rubber Puckie Logo "
              src="/assets/images/rubber_puckie_logo.png"
              className="d-inline-block align-top"
            />

            {' '}RUBBER PUCKIES

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link href="/roster" className="text-warning">Current Roster</Nav.Link>
              <Nav.Link href="/teamhistory" className="text-warning">Team History</Nav.Link>
              <NavDropdown title={<span className="text-warning">Players</span>} id="navbarScrollingDropdown">
                <Dropdown.Header style={{ color: "goldenrod" }}>Current Players</Dropdown.Header>
                {curPlayers &&
                  curPlayers.playerInfo.map((player, key) => {
                    return (
                      <NavDropdown.Item key={key} href={`/player/${player._id}`}>{player.firstName} {player.lastName}</NavDropdown.Item>
                    )
                  })
                }
                <NavDropdown.Divider />
                <NavDropdown.Item style={{ color: "darkorange" }} href={`/player/allplayers`}>All Players</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/seasonlog" className="text-warning">Season Log</Nav.Link>

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
