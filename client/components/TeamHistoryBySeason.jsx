import { useEffect, useState } from "react"

import { LoadingSpinner } from "../components";

import Table from 'react-bootstrap/Table';

export default function TeamHistoryBySeason() {
  const fColor = "#D6D6DE"
  const fColor2 = "gray"


  const [teamArr, setTeamArr] = useState(null)
  const [totals, setTotals] = useState(null)

  async function getRegSeaInfo() {
    const query = await fetch("/api/teamHistory/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    calcTotals(payload)
    setTeamArr(payload)
  }

  function calcTotals(seasonArr) {
    const total = {
      regular: {
        gp: 0,
        record: {
          wins: 0,
          loses: 0,
          ties: 0,
        },
        pts: 0,
        gf: 0,
        ga: 0,
        finish: {
          first: 0,
          second: 0,
          third: 0,
          fourth: 0,
          fifth: 0,
          sixth: 0,
        }
      },
      playoff: {
        gp: 0,
        record: {
          wins: 0,
          loses: 0,
          ties: 0,
        },
        finish: {
          first: 0,
          second: 0,
          third: 0,
          fourth: 0,
          fifth: 0,
          sixth: 0,
        },
        sow: 0,
        sol: 0,
        gf: 0,
        ga: 0,
      }
    }
    console.log(seasonArr)
    seasonArr.map(season => {
      total.regular.gp += season.regular.gamesPlayed
      total.regular.record.wins += season.regular.wins
      total.regular.record.loses += season.regular.loses
      total.regular.record.ties += season.regular.ties
      total.regular.pts += season.regular.points
      total.regular.gf += season.regular.goals_for
      total.regular.ga += season.regular.goals_against
      switch(season.regular.finish){
        case 1: 
          total.regular.finish.first++ 
          break;
        case 2: 
          total.regular.finish.second++ 
          break;
        case 3: 
          total.regular.finish.third++ 
          break;
        case 4: 
          total.regular.finish.fourth++ 
          break;
        case 5: 
          total.regular.finish.fifth++ 
          break;
        case 6: 
          total.regular.finish.sixth++ 
          break;
      }
      total.playoff.gp += season.playoff.gamesPlayed
      total.playoff.record.wins += season.playoff.wins
      total.playoff.record.loses += season.playoff.loses
      total.playoff.record.ties += season.playoff.ties
      total.playoff.sow += season.playoff.sow
      total.playoff.sol += season.playoff.sol
      total.playoff.gf += season.playoff.gf
      total.playoff.ga += season.playoff.ga
      switch(season.playoff.finish){
        case 1: 
          total.playoff.finish.first++ 
          break;
        case 2: 
          total.playoff.finish.second++ 
          break;
        case 3: 
          total.playoff.finish.third++ 
          break;
        case 4: 
          total.playoff.finish.fourth++ 
          break;
        case 5: 
          total.playoff.finish.fifth++ 
          break;
        case 6: 
          total.playoff.finish.sixth++ 
          break;
      }




    })
    console.log(total)
    setTotals(total)
  }

  function setChampStyle(champName) {
    if (champName === "Rubber Puckies") {
      return "goldenrod"
    } else {
      return fColor
    }
  }

  useEffect(() => {
    getRegSeaInfo()
  }, [])

  if (teamArr === null) return (<LoadingSpinner />)

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
            <th>Champions</th>
            <th>Rink</th>
            <th>Captain</th>
          </tr>
        </thead>
        <tbody>
          {teamArr &&
            teamArr.map((season, key) => {
              return (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>
                    <a
                      href={`/seasonlog#${season.season.toLowerCase().replace(' ', '')}`}
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
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{season.playoff.finish ? season.playoff.finish : (season.season === "Winter 2020" ? "X" : "")}</td>
                  <td style={{ color: setChampStyle(season.playoff.champion) }}>{season.playoff.champion ? season.playoff.champion : (season.season === "Winter 2020" ? "COVID" : "")}</td>
                  <td style={{ color: fColor }}>{season.rink}</td>
                  <td style={{ color: fColor }}>{season.captain}</td>
                </tr>
              )
            })}
                <tr style={{textAlign: 'center' }}>
                  <td style={{ textAlign: "left", borderRight: `solid 1px ${fColor2}`, position: "sticky", left: 0, zIndex: 1 }}>Totals</td>
                  <td style={{ color: fColor }}>{totals.regular.gp}</td>
                  <td style={{ color: fColor }}>{totals.regular.record.wins} - {totals.regular.record.loses} - {totals.regular.record.ties}</td>
                  <td style={{ color: fColor }}>{totals.regular.pts}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{(totals.regular.pts / totals.regular.gp).toFixed(3)}</td>
                  <td style={{ color: fColor }}>{totals.regular.gf}</td>
                  <td style={{ color: fColor }}>{totals.regular.ga}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{totals.regular.gf - totals.regular.ga}</td>
                  <td style={{ color: fColor }}>{(totals.regular.gf / totals.regular.gp).toFixed(1)}</td>
                  <td style={{ color: fColor }}>{(totals.regular.ga / totals.regular.gp).toFixed(1)}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{((totals.regular.gf - totals.regular.ga) / totals.regular.gp).toFixed(1)}</td>
                  <td style={{ color: fColor }}>{totals.regular.finish.first}-{totals.regular.finish.second}-{totals.regular.finish.third}-{totals.regular.finish.fourth}-{totals.regular.finish.fifth}-{totals.regular.finish.sixth}</td>
                  <td style={{ color: fColor, borderRight: `solid 1px ${fColor2}` }}>{totals.playoff.finish.first}-{totals.playoff.finish.second}-{totals.playoff.finish.third}-{totals.playoff.finish.fourth}-{totals.playoff.finish.fifth}-{totals.playoff.finish.sixth}</td>
                </tr>
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
                  <td style={{ color: setChampStyle(season.playoff.champion) }}>{season.playoff.champion}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>

  );
}