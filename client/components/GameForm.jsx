import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { convertToUTC, convertUTCtoLocal, convertUTCtoCT, grabDateFromISO, grabTimeFromISO, splitDateApart } from '../utils/time.js';
import { getSeasons, getSeasonGames, getSeasonTeams, getTeamRoster, getAllGoalies, updateGame, getPuckieTeams, createGame } from '../utils/queries.js';
import capitalizeString from '../utils/stringAdjustments.js';

export default function GameForm(props) {

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
  const [selectedGame, setSelectedGame] = useState()
  const [selectedGameUpdateOptions, setSelectedGameUpdateOptions] = useState()
  // Select Season field
  const [seasonOptions, setSeasonOptions] = useState()
  // Home and Away Team fields
  const [teamOptions, setTeamOptions] = useState()
  // Goalie Field
  const [goalieOptions, setGoalieOptions] = useState()

  // Roster Field
  const [roster, setRoster] = useState()
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
    goalie: undefined,
    players: [],
  })

  //------------------------------------------------------------------------------
  // HANDLERS
  //------------------------------------------------------------------------------

  // Master Game Info Handler
  const handleGameInfoChange = (e) => {
    const newValue = e.target.name === "goalie" && e.target.value === "" ? null : e.target.value
    setGameInfo({ ...gameInfo, [e.target.name]: newValue })
  }

  // Update Season Selection Handler
  const handleSelectedSeasonChange = (e) => (
    setSelectedSeasonUpdate(e.target.value),
    gatherGames(e.target.value),
    gatherTeams(e.target.value)
  )

  // Update Season Selection Handler
  const handleSelectedGameChange = (e) => {
    setSelectedGame(e.target.value)
    const game = selectedGameUpdateOptions.find(game => game._id === e.target.value)
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
      goalie: game.goalie ? game.goalie._id : null,
      players: game.players,
    })
  }

  // Update Season Selection Handler
  const handleSeasonChange = (e) => (
    gatherTeams(e.target.value),
    setGameInfo({ ...gameInfo, [e.target.name]: e.target.value })
  )


  // Handle Home and Away Team Change
  const handleHomeTeamChange = async (e) => {
    if (puckieTeams.find(team => team._id === e.target.value)) {
      const roster = await gatherRoster(e.target.value)
      setGameInfo({ ...gameInfo, homeTeam: e.target.value, players: roster })
    } else if (!puckieTeams.find(team => team._id === gameInfo.awayTeam)) {
      setGameInfo({ ...gameInfo, homeTeam: e.target.value, players: [], goalie: "" })
    } else {
      setGameInfo({ ...gameInfo, homeTeam: e.target.value })
    }
  }

  const handleAwayTeamChange = async (e) => {
    setGameInfo({ ...gameInfo, awayTeam: e.target.value })
    if (puckieTeams.find(team => team._id === e.target.value)) {
      const roster = await gatherRoster(e.target.value)
      setGameInfo({ ...gameInfo, awayTeam: e.target.value, players: roster })
    } else if (!puckieTeams.find(team => team._id === gameInfo.homeTeam)) {
      setGameInfo({ ...gameInfo, awayTeam: e.target.value, players: [], goalie: "" })
    } else {
      setGameInfo({ ...gameInfo, awayTeam: e.target.value })
    }
  }



  // Game Completed Handler
  const handleCompletedChange = (e) => { gameInfo.completed ? setGameInfo({ ...gameInfo, [e.target.name]: false }) : setGameInfo({ ...gameInfo, [e.target.name]: true }) }

  // Handle Player Stats Change
  const handlePlayerStatsChange = (e) => {
    const updatedPlayers = gameInfo.players.map(player => {
      if (player.player._id === e.target.getAttribute("playerid")) {
        switch (e.target.name) {
          case "played":
            return { ...player, played: e.target.checked }
          case "goals":
            return { ...player, goals: e.target.value }
        }
      } else {
        return player
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
  }

  // Gathers Team Options based on Selected Season
  async function gatherTeams(seasonId) {
    const teams = await getSeasonTeams(seasonId)
    setTeamOptions(teams)
  }

  // Looks Up Selected Team Roster
  async function gatherRoster(teamId) {
    const roster = await getTeamRoster(teamId)
    const players = []
    await roster.forEach(player => {
      players.push({
        player: {
          _id: player._id,
          firstName: player.firstName,
          lastName: player.lastName
        },
        goals: 0,
        played: false
      })
    })
    return players
  }

  // Gather Goalies
  async function gatherGoalies() {
    const goalies = await getAllGoalies()
    setGoalieOptions(goalies)
  }

  // Gather Puckie Teams
  async function gatherPuckieTeams() {
    const teams = await getPuckieTeams()
    setPuckieTeams(teams)
  }


  //------------------------------------------------------------------------------
  // FORM SUBMITTION
  //------------------------------------------------------------------------------


  async function handleFormSubmit(e) {
    e.preventDefault()
    switch (props.adminController) {
      // UPDATE GAME
      case "updateGame":
        const rosterUpdate = []
        gameInfo.players.forEach(player =>
          rosterUpdate.push({
            goals: player.goals,
            played: player.played,
            player: player.player._id
          })
        )
        const outgoingUpdateGameInfo = ({
          ...gameInfo,
          startTime: convertToUTC(gameInfo.startTime),
          awayTeam: gameInfo.awayTeam._id,
          homeTeam: gameInfo.homeTeam._id,
          players: rosterUpdate,
        })
        // console.log(outgoingGameInfo)
        updateGame(selectedGame, outgoingUpdateGameInfo)
        break;

      // CREATE GAME
      case "createGame":
        const rosterCreate = []
        gameInfo.players.forEach(player =>
          rosterCreate.push({
            goals: player.goals,
            played: player.played,
            player: player.player._id
          })
        )
        const outgoingCreateGameInfo = ({
          ...gameInfo,
          startTime: convertToUTC(gameInfo.startTime),
          players: rosterCreate,
        })
        createGame(outgoingCreateGameInfo)
        break;

      case "deleteGame":
        console.log("Game deleting is not a function yet")
        break;
    }
    props.handleClose(false)
  }



  //------------------------------------------------------------------------------
  // USE EFFECT
  //------------------------------------------------------------------------------

  useEffect(() => {
    gatherSeasons()
    gatherGoalies()
    gatherPuckieTeams()
  }, [])

  return (
    <Form>

      {props.adminController !== "createGame" &&
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
              value={selectedGame}
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

      {(props.adminController === "createGame" || selectedGame) &&
        <>

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
              onChange={handleSeasonChange}
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
              onChange={handleHomeTeamChange}
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
              onChange={handleAwayTeamChange}
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
              checked={gameInfo.completed}
              onChange={handleCompletedChange}
              disabled={isDisabled}
            />
          </Form.Group>

          {gameInfo.players.length > 0 &&
            <>
              <Form.Group className="mb-3">
                <Form.Label>Select Rubber Puckie Goalie</Form.Label>
                <Form.Select
                  name="goalie"
                  value={gameInfo.goalie}
                  onChange={handleGameInfoChange}
                >
                  <option value={undefined}></option>
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
                  {gameInfo.players
                    .filter((player) => player.player)
                    .map((player, index) => (

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
        </>}

      {props.adminController === "updateGame" &&
        <Button
          variant="primary"
          type="submit"
          onClick={handleFormSubmit}
        >
          Update Game
        </Button>
      }
      {props.adminController === "createGame" &&
        <Button
          variant="success"
          type="submit"
          onClick={handleFormSubmit}
        >
          Create Game
        </Button>
      }
      {props.adminController === "deleteGame" &&
        <Button
          variant="danger"
          type="submit"
          onClick={handleFormSubmit}
        >
          Delete Game
        </Button>
      }

    </Form>
  );
}

//---------------------------------------
//-----------------------------------------