import { useEffect, useState } from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import { convertToUTC, convertUTCtoLocal, convertUTCtoCT, grabDateFromISO, grabTimeFromISO, splitDateApart } from '../utils/time.js';


export default function GamesAccord(props) {
  const isMobile = window.screen.width < 600

  const [games, setGames] = useState(null)

  async function getGames() {
    const query = await fetch(`/api/game/season/${props.teamId}`);
    const result = await query.json();
    const payload = result.payload;
    setGames(payload)
    console.log(payload)
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


  useEffect(() => {
    getGames()
  }, [])

  if (!games) return <></>


  return (
    <>
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