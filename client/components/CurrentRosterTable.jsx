import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table';

import { LoadingSpinner } from "../components";

import './currentRosterTable.css'

export default function CurrentRosterTable() {
  const isMobile = window.screen.width < 600

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

    // // Find the index of the object with firstName 'Tom' and lastName 'Haroldson'
    // let index = players.findIndex(player => player.firstName === 'Tom' && player.lastName === 'Haroldson');

    // // If the object is found, move it to the front of the array
    // if (index !== -1) {
    //   let tomHaroldson = players.splice(index, 1)[0]; // Remove the object from its current position
    //   players.unshift(tomHaroldson); // Add it to the beginning of the array
    // }

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

  const [showGoalies, setShowGaolies] = useState(false)
  function displayGoalies(firstName, lastName) {
    if (firstName === "Tom" && lastName === "Haroldson") {
      return false
    } else if (showGoalies) {
      return false
    } else {
      return true
    }
  }
  function toggleGoalies() {
    showGoalies ? setShowGaolies(false) : setShowGaolies(true)
  }

  useEffect(() => {
    getCurRosInfo()
  }, [])

  useEffect(() => {}, [showGoalies])

  if (curRosInfo === null) return (<LoadingSpinner />)

  return (

    <>
      <Table responsive striped variant="dark" className="text-nowrap">
        <thead>
          {/* Skaters Table - Main header*/}
          <tr className='cur-roster-center'>
            <th
              colSpan={1}
              className="cur-roster-table-th-first"
              style={{
                borderRight: `solid 1px gray`,
                fontSize: '24px'
              }}
            >
              Skaters
            </th>

            {!isMobile &&
              <th
                colSpan={3}
                style={{
                  borderRight: `solid 1px gray`
                }}>
              </th>
            }

            <th
              colSpan={3}
              style={{ borderRight: `solid 1px gray` }}
            >
              {curRosInfo.seasonInfo.seasonName}
            </th>

            <th
              colSpan={5}
              style={{ borderRight: `solid 1px gray` }}
            >
              Career Regular Season
            </th>

            <th
              colSpan={4}
              style={{ borderRight: `solid 1px gray` }}
            >
              Career Playoffs
            </th>

          </tr>

          {/* Skaters Table - Subheader */}
          <tr
            className='cur-roster-center'
          >
            <th
              className="cur-roster-table-th-first"
              style={{
                borderRight: `solid 1px gray`,
              }}
            >
              <a
                name="firstName"
                defaultsort="ASC"
                onClick={(sortCurRosInfo)}
                style={{
                  color: sortedByColumn === "firstName" ? "gold" : "white",
                }}
                className="cur-roster-a"
              >
                Player
              </a>
            </th>
            {/* Player Info */}
            {!isMobile &&
              <>
                <th>#</th>
                <th>POS</th>
                <th style={{ borderRight: `solid 1px gray` }}>Sh</th>
              </>
            }

            {/* Current Season */}
            <th>
              <a
                name="currentSeasonGP"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "currentSeasonGP" ? "gold" : "white",
                }}
              >
                GP
              </a>
            </th>
            <th>
              <a
                name="currentSeasonGoals"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "currentSeasonGoals" ? "gold" : "white",
                }}
              >
                G
              </a>
            </th>
            <th
              style={{
                borderRight: `solid 1px gray`
              }}>
              <a
                name="currentSeasonHATs"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "currentSeasonHATs" ? "gold" : "white",
                }}
              >
                HAT
              </a>
            </th>

            {/* All Time */}
            <th>
              <a
                name="sp"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "sp" ? "gold" : "white",
                }}
              >
                SP
              </a>
            </th>
            <th>
              <a
                name="gp"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "gp" ? "gold" : "white",
                }}
              >
                GP
              </a>
            </th>
            <th>
              <a
                name="goals"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "goals" ? "gold" : "white",
                }}
              >
                G
              </a>
            </th>
            <th>
              <a
                name="goalsPerGamePlayed"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "goalsPerGamePlayed" ? "gold" : "white",
                }}
              >
                G/GP
              </a>
            </th>
            <th
              style={{
                borderRight: `solid 1px gray`
              }}>
              <a
                name="hat"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "hat" ? "gold" : "white",
                }}
              >
                HAT
              </a>
            </th>
            <th>
              <a
                name="playoffgp"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "playoffgp" ? "gold" : "white",
                }}
              >
                GP
              </a>
            </th>
            <th>
              <a
                name="playoffgoals"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "playoffgoals" ? "gold" : "white",
                }}
              >
                G
              </a>
            </th>
            <th>
              <a
                name="playoffgoalsPerGamePlayed"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "playoffgoalsPerGamePlayed" ? "gold" : "white",
                }}
              >
                G/GP
              </a>
            </th>
            <th
              style={{
                borderRight: `solid 1px gray`
              }}
            >
              <a
                name="playoffhat"
                defaultsort="DEC"
                onClick={(sortCurRosInfo)}
                className="cur-roster-a"
                style={{
                  color: sortedByColumn === "playoffhat" ? "gold" : "white",
                }}
              >
                HAT
              </a>
            </th>
          </tr>
        </thead>

        {/* Skater Table - Stats */}
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => {
              if (player.pos !== "G") {
                return (
                  <tr key={key} className='cur-roster-center'>
                    <td
                      className="cur-roster-table-th-first"
                      style={{ borderRight: `solid 1px gray` }}
                    >
                      <a
                        href={`/player/${player._id}`}
                        className='cur-roster-no-decor'
                      >
                        {player.firstName} {player.lastName}
                      </a>
                    </td>
                    {!isMobile &&
                      <>
                        <td>{player.jerseyNumber}</td>
                        <td>{player.pos}</td>
                        <td style={{ borderRight: `solid 1px gray` }}>
                          {player.handedness}
                        </td>
                      </>
                    }
                    <td>{player.currentSeasonGP}</td>
                    <td>{player.currentSeasonGoals}</td>
                    <td style={{ borderRight: `solid 1px gray` }}>{player.currentSeasonHATs}</td>

                    <td>{player.sp}</td>
                    <td>{player.gp}</td>
                    <td>{player.goals}</td>
                    <td>{player.goalsPerGamePlayed}</td>
                    <td style={{ borderRight: `solid 1px gray` }}>{player.hat}</td>
                    <td>{player.playoffgp}</td>
                    <td>{player.playoffgoals}</td>
                    <td>{player.playoffgoalsPerGamePlayed}</td>
                    <td style={{ borderRight: `solid 1px gray` }}>{player.playoffhat}</td>
                  </tr>
                )
              }
            })}
        </tbody>
      </Table>


      <Table responsive striped variant="dark" className="text-nowrap" style={{ marginTop: "50px" }}>
        <thead>

          <tr className='cur-roster-center'>
            <th
              colSpan={1}
              className="cur-roster-table-th-first"
              style={{ borderRight: `solid 1px gray`, fontSize: "24px" }}
            >
              Goalies
              <span 
              style={{
                marginLeft: "15px",
                padding: "2px 5px",
                fontSize: "12px",
                backgroundColor: "grey",
                color: "black",
                borderRadius: "25%",
                cursor: "pointer"
              }}
              onClick={() => toggleGoalies()}
              >
                  Show All
              </span>
            </th>
            {!isMobile &&
              <th colSpan={2} style={{ borderRight: `solid 1px gray` }}></th>
            }
            <th colSpan={10} style={{ borderRight: `solid 1px gray` }}>Regular Season</th>
          </tr>

          <tr className='cur-roster-center'>
            <th
              className="cur-roster-table-th-first"
              style={{ borderRight: `solid 1px gray` }}
            >
              Player
            </th>
            {!isMobile &&
              <>
                <th>#</th>
                <th style={{ borderRight: `solid 1px gray` }}>Sh</th>
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
            <th style={{ borderRight: `solid 1px gray` }}>SO%</th>
          </tr>

        </thead>
        <tbody>
          {curRosInfo &&
            curRosInfo.playerInfo.map((player, key) => {
              if (
                // player.pos === "G"
                // || 
                // player.pos === "F, G"
                // || 
                // player.pos === "D, G"
                // || 
                // player.pos === "F, D, G"

                player.pos === "G" && player.goaliestats.gp > 0
                ||
                player.pos === "F, G" && player.goaliestats.gp > 0
                ||
                player.pos === "D, G" && player.goaliestats.gp > 0
                ||
                player.pos === "F, D, G" && player.goaliestats.gp > 0
              ) {
                return (
                  <tr key={key} className='cur-roster-center' hidden={displayGoalies(player.firstName, player.lastName)}>
                    <td
                      className="cur-roster-table-th-first"
                      style={{ borderRight: `solid 1px gray` }}
                    >
                      {player.goaliestats.sp > 0 &&
                        <a
                          href={`/player/${player._id}`}
                          className='cur-roster-no-decor'
                        >
                          {player.firstName} {player.lastName}
                        </a>
                      }
                      {player.goaliestats.sp === 0 &&
                        <>
                          {player.firstName} {player.lastName}
                        </>
                      }
                    </td>

                    {!isMobile &&
                      <>
                        <td>{player.jerseyNumber}</td>
                        <td style={{ borderRight: `solid 1px gray` }}>{player.handedness}</td>
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
                    <td style={{ borderRight: `solid 1px gray` }}>{new Number(player.goaliestats.shutoutspercent).toFixed(2)}</td>
                  </tr>
                )
              }
            })}
        </tbody>
      </Table>
    </>

  );
}