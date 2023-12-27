import {useEffect, useState} from "react"

import Table from 'react-bootstrap/Table';

export default function TeamHistoryBySeason() {
  const [teamArr, setTeamArr] = useState(null)  


  async function getRegSeaInfo() {
    const query = await fetch("/api/teamHistory/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    setTeamArr(payload)
  }

  useEffect(() => {
    getRegSeaInfo()
  }, [])

  if (teamArr === null) return <></>

  return (

    <>
      <h3>Regular Season</h3>
      <Table responsive striped hover variant="dark">
        <thead>
          <tr>
            <th>Season</th>
            <th>GP</th>
            <th>Record</th>
            <th>Pts</th>
            <th>PT%</th>
            <th>GF</th>
            <th>GA</th>
            <th>Diff</th>
            <th>GF/G</th>
            <th>GA/G</th>
            <th>Diff/G</th>
            <th>Finish-S</th>
            <th>Finish-P</th>
            <th>Captain</th>
            <th>Champions</th>
            <th>Rink</th>
          </tr>
        </thead>
        <tbody>
          {teamArr && 
          teamArr.map((season, key) => {
            return (
              <tr key={key}>
                <td>{season.season}</td>
                <td>{season.gamesPlayed}</td>
                <td>{season.record}</td>
                <td>{season.points}</td>
                <td>{season.point_percentage}</td>
                <td>{season.goals_for}</td>
                <td>{season.goals_against}</td>
                <td>{season.diff}</td>
                <td>{season.goals_per_game}</td>
                <td>{season.goals_against_per_game}</td>
                <td>{season.diff_per_game}</td>
                <td>{season.season_finish}</td>
                <td>{season.playoff_finish}</td>
                <td>{season.captain}</td>
                <td>{season.champions}</td>
                <td>{season.rink}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
    
  );
}