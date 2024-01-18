import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';



export default function PlayerPage() {

  const params = useParams()

  const [player, setPlayer] = useState()


  async function getPlayerFromQuery() {
    const playerInfo = await getPlayer(params.playerid)
    console.log(playerInfo)
    setPlayer(playerInfo)
  }


  useEffect(() => {
    getPlayerFromQuery()
  }, [])

  if (!player) return <></>

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <Row><h2>{player.playerInfo.firstName} {player.playerInfo.lastName}</h2></Row>
            <Row>
              <Col>#{player.playerInfo.jerseyNumber} {player.playerInfo.positions.join(", ")} {captializeString(player.playerInfo.handedness)}y</Col>
            </Row>
          </Col>
          <Col sm={12} md={6}>
            <Table style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th colSpan={5} style={{ textAlign: "left" }}>Career Stats</th>
                </tr>
                <tr>
                  <th>SP</th>
                  <th>GP</th>
                  <th>Goals</th>
                  <th>G/GP</th>
                  <th>Hat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{player.careerStats.sp.length}</th>
                  <th>{player.careerStats.gp}</th>
                  <th>{player.careerStats.g}</th>
                  <th>{player.careerStats.gp > 0 ? player.careerStats.g / player.careerStats.gp.toFixed(2) : (0.00).toFixed(2)}</th>
                  <th>{player.careerStats.hat}</th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}