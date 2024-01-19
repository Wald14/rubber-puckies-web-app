import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import '../assets/css/buttons.css'


export default function PlayerPage() {

  const params = useParams()

  const [player, setPlayer] = useState()
  const [selectedSplit, setSelectedSplit] = useState()

  const handleChange = (e) => {setSelectedSplit(e.target.name)}

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
              <Col>
                <span style={{marginRight: "10px"}}>#{player.playerInfo.jerseyNumber}</span>
                <span style={{marginRight: "10px"}}>{player.playerInfo.positions.join(", ")}</span>
                <span>{captializeString(player.playerInfo.handedness)}y</span>
              </Col>
            </Row>
            <Row>
              <Col>Started: {captializeString(player.statsBySeason[0].seasonStats.seasonInfo.seasonType)} {(new Date(player.statsBySeason[0].seasonStats.seasonInfo.startDate)).getFullYear()}</Col>
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
                  <th>{player.careerStats.gp > 0 ? (player.careerStats.g / player.careerStats.gp).toFixed(2) : (0.00).toFixed(2)}</th>
                  <th>{player.careerStats.hat}</th>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row style={{borderBottom: "solid gold 1px", paddingBottom: "3px"}}>
          <Col xs={3} md={1} ><a name="stats" className={`headerBtnA ${selectedSplit === "stats" ? 'selected' : ''}`} onClick={handleChange} >Stats</a></Col>
          <Col xs={3} md={1} ><a name="splits" className={`headerBtnA ${selectedSplit === "splits" ? 'selected' : ''}`} onClick={handleChange} >Splits</a></Col>
          <Col xs={6} md={2} ><a name="gamelog" className={`headerBtnA ${selectedSplit === "gamelog" ? 'selected' : ''}`} onClick={handleChange} >Game Log</a></Col>
        </Row>
      </Container>
    </>
  )
}