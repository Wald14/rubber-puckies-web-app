import { useEffect, useState } from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import { convertToUTC, convertUTCtoLocal, convertUTCtoCT, grabDateFromISO, grabTimeFromISO, splitDateApart } from '../utils/time.js';


export default function GamesAccord(props) {
  const isMobile = window.screen.width < 600

  const [games, setGames] = useState(null)
  const [teamStats, setTeamStats] = useState()
  const [rosterStats, setRosterStats] = useState()

  async function getGames() {
    const query = await fetch(`/api/game/season/${props.teamId}`);
    const result = await query.json();
    const payload = result.payload;
    setGames(payload)
    determimeTeamStats(payload)
    // console.log(payload)
  }

  function determineOutcome(endedIn, homeGoals, awayGoals, homeTeamName, gameType) {
    const isHomeTeam = homeTeamName === "Rubber Puckies" ? true : false
    let outcome = ""
    if ((isHomeTeam && homeGoals > awayGoals) || (!isHomeTeam && awayGoals > homeGoals)) {
      outcome = "Win"
    } else if ((!isHomeTeam && homeGoals > awayGoals) || (isHomeTeam && awayGoals > homeGoals)) {
      outcome = "Loss"
    } else if (endedIn === "regulation" && homeGoals === awayGoals) {
      outcome = "Tie"
    } else if (endedIn === "shootout") {
      if (gameType === "semifinal") {
        outcome = props.playoffPlace > 2 ? "Loss" : "Win"
      }
      if (gameType === "championship") {
        outcome = props.playoffPlace === 2 ? "Loss" : "Win"
      }
    }
    return outcome
  }

  function determimeTeamStats(payload) {
    let stats = {
      gp: 0,
      wins: 0,
      loses: 0,
      ties: 0,
      gf: 0,
      ga: 0,
    }
    let rosterCheck = false
    let roster = []
    payload.forEach((game) => {
      if (rosterCheck) {
        game.players.forEach((player) => {
          const plyIdx = roster.findIndex(obj => obj._id === player.player._id)
          if (player.played) {
            roster[plyIdx].gp++
            roster[plyIdx].goals = roster[plyIdx].goals + player.goals
          }
        })
      }
      if (!rosterCheck) {
        game.players.forEach((player) => {
          roster.push({
            _id: player.player._id,
            firstName: player.player.firstName,
            lastName: player.player.lastName,
            goals: player.goals,
            gp: player.played ? 1 : 0
          })
        })
        rosterCheck = true
      }

      if (game.completed) {
        stats.gp++
        switch (determineOutcome(game.endedIn, game.homeGoals, game.awayGoals, game.homeTeam.name, game.gameType)) {
          case "Win":
            stats.wins++
            break;
          case "Loss":
            stats.loses++
            break;
          case "Tie":
            stats.ties++
            break;
        }
        game.homeTeam.name === "Rubber Puckies" ? (stats.gf += game.homeGoals, stats.ga += game.awayGoals) : (stats.gf += game.awayGoals, stats.ga += game.homeGoals)
      }
    })
    setRosterStats(roster)
    setTeamStats(stats)
  }

  useEffect(() => {
    getGames()
  }, [])

  if (!games) return <></>


  return (
    <>
      <p style={{ fontSize: "18px"}}>Season Summary</p>
      <Table style={{ textAlign: "center", maxWidth: "400px" }}>
        <thead>
          <tr>
            <th className="bg-warning" style={{ color: "black", borderRadius: "10px 0px 0px 0px" }}>GP</th>
            <th className="bg-warning" style={{ color: "black" }}>Record</th>
            <th className="bg-warning" style={{ color: "black" }}>GF</th>
            <th className="bg-warning" style={{ color: "black", borderRadius: "0px 10px 0px 0px" }}>GA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ borderRadius: "0px 0px 0px 10px", border: "none" }}>{teamStats.gp}</td>
            <td style={{ border: "none" }}>{teamStats.wins}-{teamStats.loses}-{teamStats.ties}</td>
            <td style={{ border: "none" }}>{teamStats.gf}</td>
            <td style={{ borderRadius: "0px 0px 10px 0px", border: "none" }}>{teamStats.ga}</td>
          </tr>
        </tbody>
      </Table>

      <p style={{ fontSize: "18px", borderTop: "olive 1px solid", paddingTop: "10px" }}>Roster</p>
      <Table responsive style={{textAlign: "center", maxWidth: "400px" }}>
        <thead>
          <tr>
            <th className="bg-warning" style={{ color: "black", borderRadius: "10px 0px 0px 0px" }}>Player</th>
            <th className="bg-warning" style={{ color: "black" }}>GP</th>
            <th className="bg-warning" style={{ color: "black" }}>G</th>
            <th className="bg-warning" style={{ color: "black" }}>Hat</th>
            <th className="bg-warning" style={{ color: "black" }}>G/GP</th>
            <th className="bg-warning" style={{ color: "black", borderRadius: "0px 10px 0px 0px" }}>%TG</th>
          </tr>
        </thead>
        <tbody>
          {rosterStats &&
            rosterStats.map((player, index) => {
              return (
                <tr key={index}>
                  <td className="text-nowrap" style={{textAlign: "left", border: index === rosterStats.length - 1 ? "0px" : "", borderRadius: index === rosterStats.length - 1 ? "0px 0px 0px 10px" : ""}}>{player.firstName} {player.lastName}</td>
                  <td style={{border: index === rosterStats.length - 1 ? "0px" : ""}}>{player.gp}</td>
                  <td style={{border: index === rosterStats.length - 1 ? "0px" : ""}}>{player.goals}</td>
                  <td style={{border: index === rosterStats.length - 1 ? "0px" : ""}}>{player.hat ? player.hat : 0}</td>
                  <td style={{border: index === rosterStats.length - 1 ? "0px" : ""}}>{(player.gp ? player.goals / player.gp : 0).toFixed(2)}</td>
                  <td style={{border: index === rosterStats.length - 1 ? "0px" : "", borderRadius: index === rosterStats.length - 1 ? "0px 0px 10px 0px" : ""}}>{(player.gp ? player.goals / teamStats.gf : 0).toFixed(2)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>



      <p style={{ fontSize: "18px", borderTop: "olive 1px solid", paddingTop: "10px"  }}>Games</p>
      <Accordion id="gamesAccord" alwaysOpen>
        {games &&
          games.map((game, index) => {
            return (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: "80px", marginBlockEnd: "8px" }}>
                      {(new Date(game.startTime).getMonth() + 1)}/{new Date(game.startTime).getDate()}/{new Date(game.startTime).getFullYear()}
                    </div>
                    <div style={{ width: "100px" }}>
                      @ {grabTimeFromISO(game.startTime)}
                    </div>
                    {game.completed &&
                      <div style={{ width: "90px" }}>

                        {determineOutcome(
                          game.endedIn,
                          game.homeGoals,
                          game.awayGoals,
                          game.homeTeam.name,
                          game.gameType
                        )} {game.homeGoals} - {game.awayGoals}

                      </div>
                    }
                    <div>
                      vs. {game.homeTeam.name === "Rubber Puckies" ? game.awayTeam.name : game.homeTeam.name}
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <p><span style={{ fontWeight: "bold" }}>Home Team:</span> {game.homeTeam.name}</p>
                    <p><span style={{ fontWeight: "bold" }}>Away Team:</span> {game.awayTeam.name}</p>
                  </div>
                  {game.completed &&
                    <Table responsive className="text-nowrap">
                      <thead>
                        <tr>
                          <th>Goals By</th>
                          <th>Played</th>
                          {!isMobile &&
                            <th>Gone</th>
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <ul style={{ listStyleType: "none", padding: "0px" }}>
                              {game.players.map((player, index) => {
                                if (player.goals > 0) {
                                  return <li key={index}>{player.player.firstName} {player.player.lastName} ({player.goals})</li>
                                }
                              })
                              }
                            </ul>
                          </td>
                          <td>
                            <ul style={{ listStyleType: "none", padding: "0px" }}>
                              <li style={{ textDecoration: "underline", fontWeight: "bold" }}>Skaters:</li>
                              {game.players.map((player, index) => {
                                if (player.played) {
                                  return <li key={index}>{player.player.firstName} {player.player.lastName}</li>
                                }
                              })}
                              {game.goalie &&
                                <>
                                  <li style={{ paddingTop: "10px", textDecoration: "underline", fontWeight: "bold" }}>Goalie:</li>
                                  <li>{game.goalie.firstName} {game.goalie.lastName}</li>
                                </>
                              }
                            </ul>
                          </td>

                          {!isMobile &&
                            <td>
                              <ul style={{ listStyleType: "none", padding: "0px" }}>
                                {game.players.map((player, index) => {
                                  if (!player.played) {
                                    if (game.goalie && player.player._id !== game.goalie._id) {
                                      return <li key={index}>{player.player.firstName} {player.player.lastName}</li>
                                    } else if (!game.goalie) {
                                      return <li key={index}>{player.player.firstName} {player.player.lastName}</li>
                                    }
                                  }
                                })}
                              </ul>
                            </td>
                          }
                        </tr>
                      </tbody>
                    </Table>
                  }
                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </>
  )
}