import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import convertToUTC from '../utils/time';

export default function GameForm(props) {

  // DEFAULT GOALIE OPTION
  // TOM HAROLDSON
  const defaultGoalie = "6595e312940b2c17539cd008"

  // Set fields to be disabled based on if the delete modal is opened
  const isDisabled = props.adminController === "deleteGame" ? true : false

  // useState for forum values
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedGameType, setSelectedGameType] = useState('regular')
  const [selectedSeasonId, setSelectedSeasonId] = useState()
  const [selectedHomeTeam, setSelectedHomeTeam] = useState()
  const [selectedAwayTeam, setSelectedAwayTeam] = useState()
  const [selectedHomeGoals, setSelectedHomeGoals] = useState(0)
  const [selectedAwayGoals, setSelectedAwayGoals] = useState(0)
  const [selectedEndedIn, setSelectedEndedIn] = useState('regulation')
  const [selectedCompleted, setSelectedCompleted] = useState(false)
  const [selectedGoalie, setSelectedGoalie] = useState()


  // Handlers for forum value changes
  const handleStartTimeChange = (e) => { setSelectedStartTime(e.target.value) }
  const handleGameTypeChange = (e) => { setSelectedGameType(e.target.value) }
  const handleSeasonChange = (e) => {
    if (e.target.value) {
      setSelectedGoalie('')
      setSelectedHomeTeam('')
      setSelectedAwayTeam('')
      setSelectedSeasonId(e.target.value)
      getTeamOptions(e.target.value)
      setSelectedRoster(null)
    } else {
      setSelectedGoalie('')
      setSelectedHomeTeam()
      setSelectedAwayTeam()
      setSelectedSeasonId()
      setTeamOptions()
      setSelectedRoster()
    }
  }





  const handleHomeTeamChange = async (e) => {
    setSelectedHomeTeam(e.target.value)
    if (puckieTeams.find(team => team._id === e.target.value)) {
      //-------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      getTeamRoster(e.target.value)
      //-------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------

    } else if (!puckieTeams.find(team => team._id === selectedAwayTeam)) {
      setSelectedRoster('')
      setSelectedGoalie('')
    }
  }

  const handleAwayTeamChange = async (e) => {
    setSelectedAwayTeam(e.target.value)
    if (puckieTeams.find(team => team._id === e.target.value)) {

      //-------------------------------------------------------------------------------
      //-------------------------------------------------------------------------------
      getTeamRoster(e.target.value)
      //-------------------------------------------------------------------------------
      // const goalies = teamRoster.filter(player => player.positions.includes("G"))
      // setSelectedGoalieOptions(goalies)


    } else if (!puckieTeams.find(team => team._id === selectedHomeTeam)) {
      setSelectedRoster('')
      setSelectedGoalie('')
    }
  }






  const handleHomeGoalsChange = (e) => { setSelectedHomeGoals(e.target.value) }
  const handleAwayGoalsChange = (e) => { setSelectedAwayGoals(e.target.value) }
  const handleEndedInChange = (e) => { setSelectedEndedIn(e.target.value) }
  const handleCompletedChange = (e) => { setSelectedCompleted(selectedCompleted === true ? false : true) }
  const handleGoalieChange = (e) => { setSelectedGoalie(e.target.value) }

  // Handles update of setting player stats (played and goals for each game)
  const handlePlayerPlayedChange = (e) => {
    setSelectedRoster(selectedRoster.map(player => {
      if (player._id === e.target.getAttribute("playerid") && player.played) {
        return { ...player, played: false }
      } else if (player._id === e.target.getAttribute("playerid") && !player.played) {
        return { ...player, played: true }
      }
      return player
    })
    )
  }
  const handlePlayerGoalsChange = (e) => {
    setSelectedRoster(selectedRoster.map(player => {
      if (player._id === e.target.getAttribute("playerid") && !e.target.value) {
        return { ...player, goals: 0 }
      } else if (player._id === e.target.getAttribute("playerid") && e.target.value) {
        return { ...player, goals: e.target.value }
      }
      return player
    })
    )
  }

  // useState for handling fetched seasons and players for selecting
  const [seasonsOptions, setSeasonsOptions] = useState(null)
  const [teamOptions, setTeamOptions] = useState(null)
  const [puckieTeams, setPuckieTeams] = useState()
  const [selectedRosterUnfiltered, setSelectedRosterUnfiltered] = useState()
  const [selectedRoster, setSelectedRoster] = useState()
  const [selectedGoalieOptions, setSelectedGoalieOptions] = useState()


  // Fetches All Seasons for selecting season
  async function getSeasonsOptions() {
    const query = await fetch('/api/season')
    const result = await query.json()

    const seasons = []
    await result.payload.forEach((season) => {
      const date = new Date(season.startDate)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      seasons.push({
        ...season,
        startDate: `${year}-${month}-${day}`,
        seasonName: `${season.seasonType.charAt(0).toUpperCase() + season.seasonType.slice(1)} ${year}`
      })
    })
    setSeasonsOptions(seasons)
  }


  // Fetches All Teams
  async function getTeamOptions(seasonId) {
    const query = await fetch(`/api/team/season/${seasonId}`)
    const result = await query.json()
    const teams = result.payload
    setTeamOptions(teams)
  }

  // Fetches All Rubber Puckie Teams
  async function getPuckieTeams() {
    const query = await fetch('/api/team/name/Rubber Puckies')
    const result = await query.json()
    const teams = result.payload
    setPuckieTeams(teams)
  }

  // Fetches All Goalies
  async function getAllGoalies() {
    const query = await fetch('/api/player/goalies')
    const result = await query.json()
    const goalies = result.payload
    setSelectedGoalieOptions(goalies)
  }

  // Fetches Team Roster by Id
  async function getTeamRoster(teamId) {
    const query = await fetch(`/api/player/team/${teamId}`)
    const result = await query.json()
    const roster = result.payload
    roster.sort(function (a, b) {
      let x = a.firstName.toLowerCase();
      let y = b.firstName.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })
    roster.forEach(player => {
      player.goals = 0,
        player.played = false
    })
    setSelectedRosterUnfiltered(roster)
    setSelectedRoster(roster)
    return roster
  }

  // Handles form submition
  async function handleFormSubmit(e) {
    e.preventDefault()
    switch (props.adminController) {
      case "updateGame":
        console.log("Update Game clicked")
        break;
      case "createGame":
        console.log({
          startTime: convertToUTC(selectedStartTime),
          gameType: selectedGameType,
          season: selectedSeasonId,
          homeTeam: selectedHomeTeam,
          awayTeam: selectedAwayTeam,
          homeGoals: selectedHomeGoals,
          awayGoals: selectedAwayGoals,
          endedIn: selectedEndedIn,
          completed: selectedCompleted,
          goalie: selectedGoalie,
          players: selectedRoster ? await formatRosterForDatabase(selectedRoster) : ''
        })
        createGame()
        break;
      case "deleteGame":
        console.log("Game Deleting Not Functional At This Time")
        break;
    }
    props.handleClose(false)
  }

  async function createGame() {
    try {
      const query = await fetch('/api/game', {
        method: "POST",
        body: JSON.stringify({
          startTime: convertToUTC(selectedStartTime),
          gameType: selectedGameType,
          season: selectedSeasonId,
          homeTeam: selectedHomeTeam,
          awayTeam: selectedAwayTeam,
          homeGoals: selectedHomeGoals,
          awayGoals: selectedAwayGoals,
          endedIn: selectedEndedIn,
          completed: selectedCompleted,
          goalie: selectedGoalie,
          players: selectedRoster ? await formatRosterForDatabase(selectedRoster) : ''
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      return query;
    } catch (err) {
      console.log(err.message)
    }
  }

  async function formatRosterForDatabase(roster) {
    const filteredRoster = roster.filter(player => player._id !== selectedGoalie)
    const outputRoster = filteredRoster.map((player) => {
      return {
        player: player._id,
        played: player.played,
        goals: player.goals
      }
    })
    return outputRoster
  }


  // useEffect for initiating the fetch for getting all seasons, puckie teams, and goalies
  useEffect(() => {
    getSeasonsOptions()
    getPuckieTeams()
    getAllGoalies()
  }, [])

  // Use effect to filter out selected goalie from team roster
  // useEffect(() => {
  //   if (selectedRosterUnfiltered && selectedGoalie) {
  //     const skaters = selectedRosterUnfiltered.filter(player => player._id != selectedGoalie)
  //     setSelectedRoster(skaters)
  //   }
  // }, [selectedGoalie])


  return (
    <Form>

      {/* {props.adminController !== "createGame" &&
        <Form.Group className="mb-3">
          <Form.Label>Select Team</Form.Label>
          <Form.Select value={selectedGameId} onChange={handleGameChange}>
            {gameOptions &&
              gameOptions.map((team, key) => {
                return (
                  <option key={key} value={game.gameId}>{game.selectorGameName}</option>
                )
              })
            }
          </Form.Select>
        </Form.Group>
      } */}


      <Form.Group className="mb-3">
        <Form.Label>Start Time (YYYY-MM-DDTHH:mm)</Form.Label>
        <Form.Control type="startTime" placeholder="YYYY-MM-DDTHH:mm" value={selectedStartTime} onChange={handleStartTimeChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Game Type</Form.Label>
        <Form.Select value={selectedGameType} onChange={handleGameTypeChange} disabled={isDisabled}>
          <option value="regular">Regular</option>
          <option value="semifinal">Semifinal</option>
          <option value="championship">Championship</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Season</Form.Label>
        <Form.Select value={selectedSeasonId} onChange={handleSeasonChange} disabled={isDisabled}>
          <option></option>
          {seasonsOptions &&
            seasonsOptions.map((season, key) => {
              return (
                <option key={key} value={season._id}>{season.seasonName}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Home Team</Form.Label>
        <Form.Select value={selectedHomeTeam} onChange={handleHomeTeamChange} disabled={isDisabled}>
          <option value={null}></option>
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
        <Form.Select value={selectedAwayTeam} onChange={handleAwayTeamChange} disabled={isDisabled}>
          <option value={null}></option>
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
        <Form.Control type="homeGoals" value={selectedHomeGoals} onChange={handleHomeGoalsChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Away Goals</Form.Label>
        <Form.Control type="awayGoals" value={selectedAwayGoals} onChange={handleAwayGoalsChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ended In</Form.Label>
        <Form.Select value={selectedEndedIn} onChange={handleEndedInChange} disabled={isDisabled}>
          <option value="regulation">Regulation</option>
          <option value="overtime">Overtime</option>
          <option value="shootout">Shootout</option>
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label style={{ marginRight: '10px' }}>Completed?</Form.Label>
        <Form.Check
          inline
          name="group1"
          type="checkbox"
          id={`inline-checkbox-1`}
          checked={selectedCompleted}
          onChange={handleCompletedChange}
          disabled={isDisabled}
        />
      </Form.Group>

      {selectedRoster &&
        <>
          <Form.Group className="mb-3">
            <Form.Label>Select Rubber Puckie Goalie</Form.Label>
            <Form.Select value={selectedGoalie} onChange={handleGoalieChange}>
              <option value={''}></option>
              {selectedGoalieOptions &&
                selectedGoalieOptions.map((player, key) => {
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
              {selectedRoster.length > 0 &&
                selectedRoster.map((player, index) => (
                  <li
                    key={index}
                    style={{ padding: "5px", borderBottom: "solid #5E5E5E 1px" }}
                  >
                    <div className="d-flex justify-content-between">
                      {player.firstName} {player.lastName}
                      <div className="d-flex justify-content-between">
                        <Form.Check
                          type="switch"
                          playerid={player._id}
                          onChange={handlePlayerPlayedChange}
                          disabled={isDisabled}
                          defaultValue={player.played}
                        />
                        <Form.Control
                          type="goals"
                          playerid={player._id}
                          onChange={handlePlayerGoalsChange}
                          disabled={isDisabled}
                          style={{ width: "35px" }}
                          defaultValue={player.goals}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ol>
          </Form.Group>

        </>
      }

      {props.adminController === "updateGame" &&
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Update Game
        </Button>
      }
      {props.adminController === "createGame" &&
        <Button variant="success" type="submit" onClick={handleFormSubmit}>
          Create Game
        </Button>
      }
      {props.adminController === "deleteGame" &&
        <Button variant="danger" type="submit" onClick={handleFormSubmit}>
          Delete Game
        </Button>
      }

    </Form>
  );
}


//---------------------------------------
//-----------------------------------------