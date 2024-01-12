import { useEffect, useState } from "react"
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import { convertToUTC, convertUTCtoLocal, convertUTCtoCT, grabDateFromISO, grabTimeFromISO, splitDateApart } from '../utils/time.js';


export default function GamesAccord(props) {
  const [games, setGames] = useState(null)

  async function getGames() {
    const query = await fetch(`/api/game/season/${props.teamId}`);
    const result = await query.json();
    const payload = result.payload;
    setGames(payload)
  }

  function determineOutcome(endedIn, homeGoals, awayGoals, homeTeamName, gameType){
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
        outcome = props.playoffPlace > 2 ? "Loss"  : "Win"
      }
      if (gameType === "championship") {
        outcome = props.playoffPlace === 2 ? "Loss"  : "Win"
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
                  <div style={{ width: "50px" }}>
                    {`#${index + 1}`}
                  </div>
                  <div style={{ width: "100px" }}>
                    {(new Date(game.startTime).getMonth() + 1)}/{new Date(game.startTime).getDate()}/{new Date(game.startTime).getFullYear()}
                  </div>
                  <div>
                    {game.homeTeam.name === "Rubber Puckies" ? game.awayTeam.name : game.homeTeam.name}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table responsive className="text-nowrap">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Result</th>
                        <th>Home Team</th>
                        <th>Score</th>
                        <th>Away Team</th>
                        <th>Goals By</th>
                        <th>Played</th>
                        <th>Gone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{new Date(game.startTime).getMonth()}/{new Date(game.startTime).getDate()}/{new Date(game.startTime).getFullYear()}</td>
                        <td>{grabTimeFromISO(game.startTime)}</td>

                        <td>{determineOutcome(
                          game.endedIn, 
                          game.homeGoals, 
                          game.awayGoals, 
                          game.homeTeam.name, 
                          game.gameType
                          )}</td>

                        <td>{game.homeTeam.name}</td>
                        <td>{game.homeGoals} - {game.awayGoals}</td>
                        <td>{game.awayTeam.name}</td> 
                        <td>
                          <ul style={{listStyleType: "none", padding: "0px"}}>
                          {game.players.map((player, index) => {
                            if (player.goals > 0) {
                              return <li key={index}>{player.player.firstName} {player.player.lastName} ({player.goals})</li>
                            }
                          })
                          }
                          </ul>
                        </td>
                        <td>
                        <ul style={{listStyleType: "none", padding: "0px"}}>
                          {game.players.map((player, index) => {
                            if (player.played) {
                              return <li key={index}>{player.player.firstName} {player.player.lastName}</li>
                            }
                          })
                          }
                          </ul>
                        </td>
                        <td>
                        <ul style={{listStyleType: "none", padding: "0px"}}>
                          {game.players.map((player, index) => {
                            if (!player.played) {
                              return <li key={index}>{player.player.firstName} {player.player.lastName}</li>
                            }
                          })
                          }
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </>
  )
}