import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table';

export default function CurrentRosterTable() {
  const [curRosInfo, setCurRosInfo] = useState(null)

  const fColor2 = "gray"

  async function getCurRosInfo() {
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
    setCurRosInfo(result)
  }

  useEffect(() => {
    getCurRosInfo()
  }, [])

  if (curRosInfo === null) return <></>

  return (

    <>
      <h3>Skaters</h3>
      <Table responsive striped variant="dark" className="text-nowrap">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th colSpan={4} style={{ borderRight: `solid 1px ${fColor2}` }}></th>
            <th colSpan={5} style={{ borderRight: `solid 1px ${fColor2}` }}>Regular Season</th>
            {/* <th>TG%</th>
            <th>TG/GP%</th> */}
            <th colSpan={4} style={{ borderRight: `solid 1px ${fColor2}` }}>Playoffs</th>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}` }}>Player</th>
            <th>#</th>
            <th>POS</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>Sh</th>
            <th>SP</th>
            <th>GP</th>
            <th>G</th>
            <th>G/GP</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>HAT</th>
            {/* <th>TG%</th>
            <th>TG/GP%</th> */}
            <th>GP</th>
            <th>G</th>
            <th>G/GP</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>P-HAT</th>
          </tr>
        </thead>
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => {
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}` }}>{player.firstName} {player.lastName}</td>
                  <td>{player.jerseyNumber}</td>
                  <td>{player.pos}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.handedness}</td>
                  <td>{player.sp}</td>
                  <td>{player.gp}</td>
                  <td>{player.goals}</td>
                  <td>{player.goalsPerGamePlayed}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.hat}</td>
                  {/* <td></td>
                  <td></td> */}
                  <td>{player.playoffgp}</td>
                  <td>{player.playoffgoals}</td>
                  <td>{player.playoffgoalsPerGamePlayed}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.playoffhat}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>

  );
}