import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';



export default function PlayerPageStats({ player }) {


  if (!player) return <></>

  return (
    <>
      <Row style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
        {player.statsBySeason.map((season, key) => {
          return (
            <Col key={key}>
              <Table striped responsive style={{fontSize: "14px"}}>
                <thead>
                  <tr style={{ fontSize: "18px" }}>
                    <th colSpan={4}>{captializeString(season.seasonStats.seasonInfo.seasonType)} {new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}</th>
                  </tr>
                  <tr style={{textAlign: "center"}}>
                    <th style={{textAlign: "left"}}>Date</th>
                    <th style={{textAlign: "left"}}>Opponent</th>
                    <th>Goals</th>
                    <th>Missed</th>
                  </tr>
                </thead>
                <tbody>
                  {season.seasonStats.games.map((game, keytwo) => {
                    return (
                      <tr key={keytwo} style={{textAlign: "center"}}>
                        <td style={{textAlign: "left"}}>{(new Date(game.startTime).getMonth())+1}/{new Date(game.startTime).getDate()}/{new Date(game.startTime).getFullYear()}</td>
                        <td style={{textAlign: "left"}}>{game.opponent}</td>
                        <td>{game.playerGoals > 0 ? game.playerGoals : ''}</td>
                        <td>{game.played === true ? "" : "X"}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Col>
          )
        })

        }
      </Row>
    </>
  )
}