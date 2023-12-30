import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table';

export default function CurrentRosterTable() {
  const [curRosInfo, setCurRosInfo] = useState(null)


  async function getCurRosInfo() {
    const query = await fetch("/api/currentroster/Rubber Puckies");
    const result = await query.json();
    setCurRosInfo(result)
  }

  useEffect(() => {
    getCurRosInfo()
  }, [])

  if (curRosInfo === null) return <></>

  return (

    <>
      <h2 className="mb-4">Active Roster</h2>
      <h3>Skaters</h3>
      <Table responsive striped hover variant="dark">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left"}}>Player</th>
            <th>#</th>
            <th>POS</th>
            <th>Sh</th>
            <th>SP</th>
            <th>GP</th>
            <th>G</th>
            <th>G/GP</th>
            <th>HAT</th>
            {/* <th>TG%</th>
            <th>TG/GP%</th> */}
          </tr>
        </thead>
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => {
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left"}}>{player.firstName} {player.lastName}</td>
                  <td>{player.jerseyNumber}</td>
                  <td>{player.pos}</td>
                  <td>{player.handedness}</td>
                  <td>{player.sp}</td>
                  <td>{player.gp}</td>
                  <td>{player.goals}</td>
                  <td>{player.goalsPerGamePlayed}</td>
                  <td>{player.hat}</td>
                  {/* <td></td>
                  <td></td> */}
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>

  );
}