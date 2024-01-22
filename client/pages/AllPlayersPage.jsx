import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import '../assets/css/buttons.css'


export default function PlayerPage() {

  const [playerList, setPlayerList] = useState()


  async function getPlayers() {
    const query = await fetch("/api/puckieplayerlist/Rubber Puckies");
    const result = await query.json();
    setPlayerList(result.puckiePlayerList)
  }


  useEffect(() => {
    getPlayers()
  }, [])

  if (!playerList) return <></>

  return (
    <>
      <h3 style={{color: "goldenrod"}}>All Players</h3>
      <p>The following {playerList.length} players have all played at least one game as an offical member of the Rubber Puckies.</p>
      <ListGroup style={{maxWidth: "300px"}}>
        {playerList &&
          playerList.map((player, key) => {
            return (
              <ListGroup.Item key={key}>
                <a href={`/player/${player._id}`} style={{textDecoration: "none"}}>
                  <span style={{color: "white"}}>{key + 1}.</span> {player.firstName} {player.lastName}
              </a>
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>
  )
}