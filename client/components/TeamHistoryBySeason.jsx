import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table';

export default function TeamHistoryBySeason() {
  const [teamArr, setTeamArr] = useState(null)

  const fColor = "#D6D6DE"
  const fColor2 = "gray"

  async function getRegSeaInfo() {
    const query = await fetch("/api/teamHistory/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    setTeamArr(payload)
    console.log(payload)
    console.log(payload[1].season.toLowerCase().replace(' ', ''))
  }

  useEffect(() => {
    getRegSeaInfo()
  }, [])

  if (teamArr === null) return <></>

  return (

    <>
      <h3>Regular Season</h3>
      <Table responsive striped variant="dark" className="text-nowrap">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>Season</th>
            <th>GP</th>
            <th>Record</th>
            <th>Pts</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>PT%</th>
            <th>GF</th>
            <th>GA</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>Diff</th>
            <th>GF/G</th>
            <th>GA/G</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>Diff/G</th>
            <th>Finish-S</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>Finish-P</th>
            <th>Captain</th>
            <th>Champions</th>
            <th>Rink</th>
          </tr>
        </thead>
        <tbody>
          {teamArr &&
            teamArr.map((season, key) => {
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>
                    <a
                      href={`/seasonlog/${season.season.toLowerCase().replace(' ', '')}#${season.season.toLowerCase().replace(' ', '')}`}
                      style={{ textDecoration: "none" }}
                    >
                      {season.season}
                    </a>
                  </td>
                  <td style={{ color: fColor }}>{season.regular.gamesPlayed}</td>
                  <td style={{ color: fColor }}>{season.regular.record}</td>
                  <td style={{ color: fColor }}>{season.regular.points}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.regular.point_percentage}</td>
                  <td style={{ color: fColor }}>{season.regular.goals_for}</td>
                  <td style={{ color: fColor }}>{season.regular.goals_against}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.regular.diff}</td>
                  <td style={{ color: fColor }}>{season.regular.goals_per_game}</td>
                  <td style={{ color: fColor }}>{season.regular.goals_against_per_game}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.regular.diff_per_game}</td>
                  <td style={{ color: fColor }}>{season.regular.finish}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.playoff.finish}</td>
                  <td style={{ color: fColor }}>{season.captain}</td>
                  <td style={{ color: fColor }}>{season.playoff.champion}</td>
                  <td style={{ color: fColor }}>{season.rink}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>


      <h3 className="mt-4">Playoffs</h3>
      <Table responsive striped variant="dark" className="text-nowrap">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>Season</th>
            <th>Rds</th>
            <th>GP</th>
            <th>Record</th>
            <th>SOW</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>SOL</th>
            <th>GF</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>GA</th>
            <th>Semi-Rd Opp</th>
            <th>Champ Opp</th>
            <th>Champ Score</th>
            <th>Champions</th>
          </tr>
        </thead>
        <tbody>
          {teamArr &&
            teamArr.map((season, key) => {
              if (season.playoff.gamesPlayed === 0) return

              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>{season.season}</td>
                  <td style={{ color: fColor }}>{season.playoff.rounds}</td>
                  <td style={{ color: fColor }}>{season.playoff.gamesPlayed}</td>
                  <td style={{ color: fColor }}>{season.playoff.record}</td>
                  <td style={{ color: fColor }}>{season.playoff.sow}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.playoff.sol}</td>
                  <td style={{ color: fColor }}>{season.playoff.gf}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.playoff.ga}</td>
                  <td style={{ color: fColor }}>{season.playoff.semiRoundOpp === null ? "N/A" : season.playoff.semiRoundOpp}</td>
                  <td style={{ color: fColor }}>{season.playoff.championshipOpp === null ? "N/A" : season.playoff.championshipOpp}</td>
                  <td style={{ color: fColor }}>{season.playoff.championshipOpp === null ? "N/A" : season.playoff.championshipScore}</td>
                  <td style={{ color: fColor }}>{season.playoff.champion}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>

  );
}