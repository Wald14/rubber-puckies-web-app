import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table';

export default function CurrentRosterTable() {
  const isMobile = window.screen.width < 600
  const fColor2 = "gray"

  const [curRosInfo, setCurRosInfo] = useState(null)
  const [sortedByColumn, setSortedByColumn] = useState()
  const [sortOrder, setSortOrder] = useState()

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
    setSortedByColumn("firstName")
    setSortOrder("ASC")
    setCurRosInfo(result)
    console.log(result)
  }

  async function sortCurRosInfo(e) {
    const players = curRosInfo.playerInfo
    if (e.target.name !== sortedByColumn) {
      players.sort(function (a, b) {
        let x = a.firstName.toLowerCase();
        let y = b.firstName.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      })
      players.sort(function (a, b) {
        let x = a[e.target.name];
        let y = b[e.target.name];
        if (x < y) { return (e.target.getAttribute("defaultsort") === "ASC" ? -1 : 1); }
        if (x > y) { return (e.target.getAttribute("defaultsort") === "ASC" ? 1 : -1); }
        return 0;
      })
      setSortOrder(e.target.getAttribute("defaultsort"))
    } else if (e.target.name === sortedByColumn) {
      players.sort(function (a, b) {
        let x = a.firstName.toLowerCase();
        let y = b.firstName.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      })
      players.sort(function (a, b) {
        let x = a[e.target.name];
        let y = b[e.target.name];
        if (x < y) { return (sortOrder === "ASC" ? 1 : -1); }
        if (x > y) { return (sortOrder === "ASC" ? -1 : 1); }
        return 0;
      })
      setSortOrder(sortOrder === "ASC" ? "DEC" : "ASC")
    }

    setSortedByColumn(e.target.name)
    setCurRosInfo({ ...curRosInfo, playerInfo: players })
  }



  useEffect(() => {
    getCurRosInfo()
  }, [])

  if (curRosInfo === null) return <></>

  return (

    <>
      <Table responsive striped variant="dark" className="text-nowrap">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th colSpan={1} style={{ borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1, fontSize: "24px", textAlign: "left" }}>Skaters</th>
            {!isMobile &&
              <th colSpan={3} style={{ borderRight: `solid 1px ${fColor2}` }}></th>
            }
            <th colSpan={5} style={{ borderRight: `solid 1px ${fColor2}` }}>Regular Season</th>
            <th colSpan={4} style={{ borderRight: `solid 1px ${fColor2}` }}>Playoffs</th>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}><a name="firstName" defaultsort="ASC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "firstName" ? "gold" : "white", textDecoration: "underline" }}>Player</a></th>
            {!isMobile &&
              <>
                <th>#</th>
                <th>POS</th>
                <th style={{ borderRight: `solid 1px ${fColor2}` }}>Sh</th>
              </>
            }
            <th><a name="sp" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "sp" ? "gold" : "white", textDecoration: "underline" }}>SP</a></th>
            <th><a name="gp" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "gp" ? "gold" : "white", textDecoration: "underline" }}>GP</a></th>
            <th><a name="goals" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "goals" ? "gold" : "white", textDecoration: "underline" }}>G</a></th>
            <th><a name="goalsPerGamePlayed" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "goalsPerGamePlayed" ? "gold" : "white", textDecoration: "underline" }}>G/GP</a></th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}><a name="hat" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "hat" ? "gold" : "white", textDecoration: "underline" }}>HAT</a></th>
            <th><a name="playoffgp" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "playoffgp" ? "gold" : "white", textDecoration: "underline" }}>GP</a></th>
            <th><a name="playoffgoals" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "playoffgoals" ? "gold" : "white", textDecoration: "underline" }}>G</a></th>
            <th><a name="playoffgoalsPerGamePlayed" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "playoffgoalsPerGamePlayed" ? "gold" : "white", textDecoration: "underline" }}>G/GP</a></th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}><a name="playoffhat" defaultsort="DEC" onClick={(sortCurRosInfo)} style={{ cursor: "pointer", color: sortedByColumn === "playoffhat" ? "gold" : "white", textDecoration: "underline" }}>HAT</a></th>
          </tr>
        </thead>
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => { if (player.pos !== "G" ){
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>{player.firstName} {player.lastName}</td>
                  {!isMobile &&
                    <>
                      <td>{player.jerseyNumber}</td>
                      <td>{player.pos}</td>
                      <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.handedness}</td>
                    </>
                  }
                  <td>{player.sp}</td>
                  <td>{player.gp}</td>
                  <td>{player.goals}</td>
                  <td>{player.goalsPerGamePlayed}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.hat}</td>
                  <td>{player.playoffgp}</td>
                  <td>{player.playoffgoals}</td>
                  <td>{player.playoffgoalsPerGamePlayed}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.playoffhat}</td>
                </tr>
              )}
            })}
        </tbody>
      </Table>


      <Table responsive striped variant="dark" className="text-nowrap" style={{marginTop: "50px"}}>
        <thead>

          <tr style={{ textAlign: "center" }}>
            <th colSpan={1} style={{ borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1, fontSize: "24px", textAlign: "left"}}> Goalies</th>
            {!isMobile &&
              <th colSpan={2} style={{ borderRight: `solid 1px ${fColor2}` }}></th>
            }
            <th colSpan={10} style={{ borderRight: `solid 1px ${fColor2}` }}>Regular Season</th>
          </tr>

          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>Player</th>
            {!isMobile &&
              <>
                <th>#</th>
                <th style={{ borderRight: `solid 1px ${fColor2}` }}>Sh</th>
              </>
            }
            <th>SP</th>
            <th>GP</th>
            <th>W%</th>
            <th>W</th>
            <th>L</th>
            <th>T</th>
            <th>GA</th>
            <th>GAA</th>
            <th>SO</th>
            <th style={{ borderRight: `solid 1px ${fColor2}` }}>SO%</th>
          </tr>

        </thead>
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => { if (player.pos === "G" || player.pos === "F, G" || player.pos === "D, G" || player.pos === "F, D, G"){
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>{player.firstName} {player.lastName}</td>
                  {!isMobile &&
                    <>
                      <td>{player.jerseyNumber}</td>
                      <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.handedness}</td>
                    </>
                  }
                  <td>{player.goaliestats.sp}</td>
                  <td>{player.goaliestats.gp}</td>
                  <td>{player.goaliestats.winpercent}</td>
                  <td>{player.goaliestats.wins}</td>
                  <td>{player.goaliestats.losses}</td>
                  <td>{player.goaliestats.ties}</td>
                  <td>{player.goaliestats.ga}</td>
                  <td>{player.goaliestats.gaa}</td>
                  <td>{player.goaliestats.shutouts}</td>
                  <td style={{ borderRight: `solid 1px ${fColor2}` }}>{player.goaliestats.shutoutpercent}</td>
                </tr>
              )}
            })}
        </tbody>
      </Table>
    </>

  );
}