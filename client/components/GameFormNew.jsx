import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { convertToUTC, convertUTCtoLocal, convertUTCtoCT, grabDateFromISO, grabTimeFromISO, splitDateApart } from '../utils/time';
import { getSeasons, getSeasonGames, getSeasonTeams, getTeamRoster, getAllGoalies } from '../utils/queries';
import capitalizeString from '../utils/stringAdjustments.js';

export default function GameFormNew(props) {

  //------------------------------------------------------------------------------
  // PROPS - ADMIN CONTROLLER
  //------------------------------------------------------------------------------

  // Set fields to be disabled based on if the delete modal is opened
  const isDisabled = props.adminController === "deleteGame" ? true : false

  //------------------------------------------------------------------------------
  // USE STATE
  //------------------------------------------------------------------------------

  // Select Season to Update/Delete Field
  const [seasonUpdateOptions, setSeasonUpdateOptions] = useState()
  const [selectedSeasonUpdate, setSelectedSeasonUpdate] = useState()
  // Selected Game to Update/Delete Field
  const [gameUpdateOptions, setGameUpdateOpt] = useState()
  const [selectedGameUpdateOptions, setSelectedGameUpdateOptions] = useState()
  // Select Season field
  const [seasonOptions, setSeasonOptions] = useState()
  // Home and Away Team fields
  const [teamOptions, setTeamOptions] = useState()
  // Goalie Field
  const [goalieOptions, setGoalieOptions] = useState()

  // Roster Field
  const [roster, setRoster] = useState()

  // OTHER
  const [puckieTeams, setPuckieTeams] = useState()

  // MASTER GAME INFO
  const [gameInfo, setGameInfo] = useState({
    startTime: "",
    completed: false,
    homeTeam: "",
    awayTeam: "",
    homeGoals: 0,
    awayGoals: 0,
    season: "",
    gameType: "regular",
    endedIn: "regulation",
    goalie: "",
    players: [],
  })

  //------------------------------------------------------------------------------
  // HANDLERS
  //------------------------------------------------------------------------------

  // Master Game Info Handler
  const handleGameInfoChange = (e) => setGameInfo({ ...gameInfo, [e.target.name]: e.target.value })

  // Update Season Selection Handler
  const handleSelectedSeasonChange = (e) => (
    setSelectedSeasonUpdate(e.target.value),
    console.log(e.target.value),
    gatherGames(e.target.value),
    gatherTeams(e.target.value)
  )

  // Update Season Selection Handler
  const handleSelectedGameChange = (e) => {
    setGameUpdateOpt(e.target.value)
    console.log(e.target.value)
    const game = selectedGameUpdateOptions.find(game => game._id === e.target.value)
    console.log(game.players)
    setGameInfo({
      startTime: game.startTime,
      completed: game.completed,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      homeGoals: game.homeGoals,
      awayGoals: game.awayGoals,
      season: game.season,
      gameType: game.gameType,
      endedIn: game.endedIn,
      goalie: game.goalie._id,
      players: game.players,
    })
  }

  // Handle Player Stats Change
  const handlePlayerStatsChange = (e) => {
    const updatedPlayers = gameInfo.players.map(player => {
      if (player.player._id === e.target.getAttribute("playerid"))
        switch (e.target.name) {
          case "played":
            return { ...player, played: e.target.checked }
            break;
          case "goals":
            return { ...player, played: e.target.value }
            break;
        }
    })
    setGameInfo({
      ...gameInfo,
      players: updatedPlayers
    })
  }

  //------------------------------------------------------------------------------
  // Functions That Gather Selection Options
  //------------------------------------------------------------------------------

  // Gathers seasons and updates startDate to CT time
  async function gatherSeasons() {
    const seasons = await getSeasons()
    const updatedSeasons = await seasons.map(season => (
      {
        ...season,
        startDate: convertUTCtoCT(season.startDate),
      }))
    setSeasonUpdateOptions(updatedSeasons)
    setSeasonOptions(updatedSeasons)
  }

  // Gathers games based off of selected update/delete season 
  // Updates startDate to CT time
  async function gatherGames(seasonId) {
    const games = await getSeasonGames(seasonId)
    const updatedGames = await games.map(game => (
      {
        ...game,
        startTime: convertUTCtoCT(game.startTime),
      }))
    setSelectedGameUpdateOptions(updatedGames)
    console.log(updatedGames)
  }

  // Gathers Team Options based on Selected Season
  async function gatherTeams(seasonId) {
    const teams = await getSeasonTeams(seasonId)
    setTeamOptions(teams)
  }

  // Looks Up Selected Team Roster
  async function gatherRoster(teamId) {
    const roster = await getTeamRoster(teamId)
    console.log(roster)
  }

  // Gather Goalies
  async function gatherGoalies() {
    const goalies = await getAllGoalies()
    setGoalieOptions(goalies)
  }

  //------------------------------------------------------------------------------
  // USE EFFECT
  //------------------------------------------------------------------------------

  useEffect(() => {
    gatherSeasons()
    gatherGoalies()
  }, [])

  return (
    <Form>

      {props.adminController !== "createGameNew" &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Select Season</Form.Label>
            <Form.Select
              value={selectedSeasonUpdate}
              onChange={handleSelectedSeasonChange}
            >
              <option></option>
              {seasonUpdateOptions &&
                seasonUpdateOptions.map((season, key) => {
                  return (
                    <option key={key} value={season._id}>{capitalizeString(season.seasonType)} {splitDateApart(season.startDate).year}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Game</Form.Label>
            <Form.Select
              value={gameUpdateOptions}
              onChange={handleSelectedGameChange}
            >
              <option></option>
              {selectedGameUpdateOptions &&
                selectedGameUpdateOptions.map((game, key) => {
                  return (
                    <option key={key} value={game._id}>{game.startTime} @ {game.startTime} - {game.homeTeam.name} vs {game.awayTeam.name}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>
        </>
      }

      <Form.Group className="mb-3">
        <Form.Label>Start Time (M/D/YYYY, H:mm:ss PM)</Form.Label>
        <Form.Control
          name="startTime"
          value={gameInfo.startTime}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Game Type</Form.Label>
        <Form.Select
          name="gameType"
          value={gameInfo.gameType}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        >
          <option value="regular">Regular</option>
          <option value="semifinal">Semifinal</option>
          <option value="championship">Championship</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Season</Form.Label>
        <Form.Select
          name="season"
          value={gameInfo.season}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        >
          <option></option>
          {seasonOptions &&
            seasonOptions.map((season, key) => {
              return (
                <option key={key} value={season._id}>{capitalizeString(season.seasonType)} {splitDateApart(season.startDate).year}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Home Team</Form.Label>
        <Form.Select
          name="homeTeam"
          value={gameInfo.homeTeam._id}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        >
          <option></option>
          {teamOptions &&
            teamOptions.map((team, key) => {
              return (
                <option key={key} value={team._id}>{team.name}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Away Team</Form.Label>
        <Form.Select
          name="awayTeam"
          value={gameInfo.awayTeam._id}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        >
          <option></option>
          {teamOptions &&
            teamOptions.map((team, key) => {
              return (
                <option key={key} value={team._id}>{team.name}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Home Goals</Form.Label>
        <Form.Control
          name="homeGoals"
          value={gameInfo.homeGoals}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Away Goals</Form.Label>
        <Form.Control
          name="awayGoals"
          value={gameInfo.awayGoals}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ended In</Form.Label>
        <Form.Select
          name="endedIn"
          value={gameInfo.endedIn}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        >
          <option value="regulation">Regulation</option>
          <option value="overtime">Overtime</option>
          <option value="shootout">Shootout</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ marginRight: '10px' }}>Completed?</Form.Label>
        <Form.Check
          inline
          name="completed"
          type="checkbox"
          id={`inline-checkbox-1`}
          checked={gameInfo.completed}
          onChange={handleGameInfoChange}
          disabled={isDisabled}
        />
      </Form.Group>

      {gameInfo.players &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Select Rubber Puckie Goalie</Form.Label>
            <Form.Select
              name="goalie"
              value={gameInfo.goalie}
              onChange={handleGameInfoChange}
            >
              <option value={''}></option>
              {goalieOptions &&
                goalieOptions.map((player, key) => {
                  return (
                    <option key={key} value={player._id}>{player.firstName} {player.lastName}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rubber Puckies Roster</Form.Label>
            <ol>
              {gameInfo.players.length > 0 &&
                gameInfo.players.map((player, index) => (
                  <li
                    key={index}
                    style={{ padding: "5px", borderBottom: "solid #5E5E5E 1px" }}
                  >
                    <div className="d-flex justify-content-between">
                      {player.player.firstName} {player.player.lastName}
                      <div className="d-flex justify-content-between">
                        <Form.Check
                          name="played"
                          type="switch"
                          playerid={player.player._id}
                          onChange={handlePlayerStatsChange}
                          disabled={isDisabled}
                          checked={player.played}
                        />
                        <Form.Control
                          name="goals"
                          playerid={player.player._id}
                          onChange={handlePlayerStatsChange}
                          disabled={isDisabled}
                          style={{ width: "35px" }}
                          value={player.goals}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </Form.Group>

        </>
      }

      {props.adminController === "updateGameNew" &&
        <Button
          variant="primary"
          type="submit"
        // onClick={handleFormSubmit}
        >
          Update Game
        </Button>
      }
      {props.adminController === "createGameNew" &&
        <Button
          variant="success"
          type="submit"
        // onClick={handleFormSubmit}
        >
          Create Game
        </Button>
      }
      {props.adminController === "deleteGameNew" &&
        <Button
          variant="danger"
          type="submit"
        // onClick={handleFormSubmit}
        >
          Delete Game
        </Button>
      }

    </Form>
  );
}

//---------------------------------------
//-----------------------------------------