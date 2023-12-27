import {useEffect, useState} from "react"

import Table from 'react-bootstrap/Table';

export default function TeamHistoryBySeason() {
  const [teamArr, setTeamArr] = useState(null)  


  async function getRegSeaInfo() {
    const query = await fetch("/api/team/name/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    setTeamArr(payload)
    console.log(payload)
  }

  useEffect(() => {
    getRegSeaInfo()
  }, [])


  return (

    <>
      <h3>Regular Season</h3>
      <Table striped hover variant="dark">
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

        </tbody>
      </Table>
    </>
    
  );
}