import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Chart } from '../components';

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
      <Row style={{ maxWidth: "600px" }}>

        <Chart seasonStats={player.statsBySeason} />

      </Row>
      <Row style={{ marginTop: "16px" }}>
        <Col>
          <Table striped>
            <thead>
              <tr>
                <th colSpan={5} style={{ fontSize: "24px" }}>By Season</th>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <th style={{ textAlign: "left" }}>Season</th>
                <th>GP</th>
                <th>G</th>
                <th>G/GP</th>
                <th>HAT</th>
              </tr>
            </thead>
            <tbody>
              {player &&
                player.statsBySeason.map((season, key) => {
                  return (
                    <tr key={key} style={{ textAlign: "center" }}>
                      <td style={{ textAlign: "left" }}>{captializeString(season.seasonStats.seasonInfo.seasonType)} {new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}</td>
                      <td>{season.seasonStats.totals.gp}</td>
                      <td>{season.seasonStats.totals.g}</td>
                      <td>{season.seasonStats.totals.gp > 0 ? (season.seasonStats.totals.g / season.seasonStats.totals.gp).toFixed(2) : (0.00).toFixed(2)}</td>
                      <td>{season.seasonStats.totals.hat}</td>
                    </tr>
                  )

                })
              }
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table striped>
            <thead>
              <tr >
                <th colSpan={5} style={{ fontSize: "24px" }}>Post Season</th>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <th style={{ textAlign: "left" }}>Season</th>
                <th>GP</th>
                <th>G</th>
                <th>G/GP</th>
                <th>HAT</th>
              </tr>
            </thead>
            <tbody>
              {player &&
                player.statsBySeason.map((season, key) => {
                  if (season.seasonStats.totals.pgp > 0) {
                    return (
                      <tr key={key} style={{ textAlign: "center" }}>
                        <td style={{ textAlign: "left" }}>{captializeString(season.seasonStats.seasonInfo.seasonType)} {new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}</td>
                        <td>{season.seasonStats.totals.pgp}</td>
                        <td>{season.seasonStats.totals.pg}</td>
                        <td>{season.seasonStats.totals.pgp > 0 ? (season.seasonStats.totals.pg / season.seasonStats.totals.pgp).toFixed(2) : (0.00).toFixed(2)}</td>
                        <td>{season.seasonStats.totals.phat}</td>
                      </tr>
                    )
                  }

                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}