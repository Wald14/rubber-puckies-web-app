import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import { LoadingSpinner } from "../components";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


const tableColors = {
  homeAway: "#f25f5c",
  seasonType: "#53b3cb",
  startHour: "#16DB65",
  opponent: "#ffe066"
}


export default function TeamHistorSplits({ splits }) {
  console.log(splits)

  splits.startHour.sort( function (a,b) {
    let x = a.startHour.toLowerCase();
    let y = b.startHour.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })

  splits.opponent.sort( function (a,b) {
    let x = a.teamName.toLowerCase();
    let y = b.teamName.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })

  splits.opponent.sort( function (a,b){
    let x = a.gp;
    let y = b.gp;
    if (x < y) { return 1; }
    if (x > y) { return -1; }
    return 0;
  })

  console.log(splits)
  if (!splits) return (<LoadingSpinner />)

  return (
    <Row>
      <Col>
        {/* HOME VS AWAY */}
        <Table responsive style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway, borderRadius: "10px 0px 0px 0px" }}>Home/Away</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>Record</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>GA</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway, borderRadius: "0px 10px 0px 0px" }}>GF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>{splits.homeAway.home.gp}</td>
              <td className="text-nowrap">{splits.homeAway.home.wins} - {splits.homeAway.home.loses} - {splits.homeAway.home.ties}</td>
              <td>{splits.homeAway.home.gf}</td>
              <td>{splits.homeAway.home.ga}</td>
            </tr>
            <tr>
              <td>Away</td>
              <td>{splits.homeAway.away.gp}</td>
              <td className="text-nowrap">{splits.homeAway.away.wins} - {splits.homeAway.away.loses} - {splits.homeAway.away.ties}</td>
              <td>{splits.homeAway.away.gf}</td>
              <td>{splits.homeAway.away.ga}</td>
            </tr>
          </tbody>
        </Table>

        {/* SEASON TYPE */}
        <Table responsive style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType, borderRadius: "10px 0px 0px 0px" }}>Season Type</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>SP</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>Record</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>GF</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType, borderRadius: "0px 10px 0px 0px" }}>GA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "deepskyblue" }}>Winter</td>
              <td>{splits.seasonType.winter.sp}</td>
              <td>{splits.seasonType.winter.gp}</td>
              <td className="text-nowrap">{splits.seasonType.winter.wins} - {splits.seasonType.winter.loses} - {splits.seasonType.winter.ties}</td>
              <td>{splits.seasonType.winter.gf}</td>
              <td>{splits.seasonType.winter.ga}</td>
            </tr>
            <tr>
              <td style={{ color: "limegreen" }}>Spring</td>
              <td>{splits.seasonType.spring.sp}</td>
              <td>{splits.seasonType.spring.gp}</td>
              <td className="text-nowrap">{splits.seasonType.spring.wins} - {splits.seasonType.spring.loses} - {splits.seasonType.spring.ties}</td>
              <td>{splits.seasonType.spring.gf}</td>
              <td>{splits.seasonType.spring.ga}</td>
            </tr>
            <tr>
              <td style={{ color: "yellow" }}>Summer</td>
              <td>{splits.seasonType.summer.sp}</td>
              <td>{splits.seasonType.summer.gp}</td>
              <td className="text-nowrap">{splits.seasonType.summer.wins} - {splits.seasonType.summer.loses} - {splits.seasonType.summer.ties}</td>
              <td>{splits.seasonType.summer.gf}</td>
              <td>{splits.seasonType.summer.ga}</td>
            </tr>
            <tr>
              <td style={{ color: "orange" }}>Fall</td>
              <td>{splits.seasonType.fall.sp}</td>
              <td>{splits.seasonType.fall.gp}</td>
              <td className="text-nowrap">{splits.seasonType.fall.wins} - {splits.seasonType.fall.loses} - {splits.seasonType.fall.ties}</td>
              <td>{splits.seasonType.fall.gf}</td>
              <td>{splits.seasonType.fall.ga}</td>
            </tr>
          </tbody>
        </Table>

        {/* Start Time */}
        <Table responsive style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.startHour, borderRadius: "10px 0px 0px 0px" }}>Start Hour</th>
              <th style={{ color: "black", backgroundColor: tableColors.startHour }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.startHour }}>Record</th>
              <th style={{ color: "black", backgroundColor: tableColors.startHour }}>GF</th>
              <th style={{ color: "black", backgroundColor: tableColors.startHour, borderRadius: "0px 10px 0px 0px" }}>GA</th>
            </tr>
          </thead>
          <tbody>
            {splits.startHour &&
              splits.startHour.map((startHour) => {
                return (
                  <tr key={startHour.startHour}>
                    <td>{startHour.startHour}</td>
                    <td>{startHour.gp}</td>
                    <td className="text-nowrap">{startHour.wins} - {startHour.loses} - {startHour.ties}</td>
                    <td>{startHour.gf}</td>
                    <td>{startHour.ga}</td>
                  </tr>
              )
            })
            }
          </tbody>
        </Table>
      </Col>
      <Col>
        {/* Opponent */}
        <Table responsive style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.opponent, borderRadius: "10px 0px 0px 0px" }}>Opponent</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>SP</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent}}>Record</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>GF</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent, borderRadius: "0px 10px 0px 0px" }}>GA</th>
            </tr>
          </thead>
          <tbody>
            {splits.opponent.map((opponent) => {
              return (
                <tr key={opponent.teamName}>
                  <td className="text-nowrap">{opponent.teamName}</td>
                  <td>{opponent.sp.length}</td>
                  <td>{opponent.gp}</td>
                  <td className="text-nowrap">{opponent.wins} - {opponent.loses}  - {opponent.ties}</td>
                  <td>{opponent.gf}</td>
                  <td>{opponent.ga}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}