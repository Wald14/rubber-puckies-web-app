import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function GameForm(props) {

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

  // Handlers for forum value changes
  const handleStartTimeChange = (e) => { setSelectedStartTime(e.target.value) }
  const handleGameTypeChange = (e) => { setSelectedGameType(e.target.value) }
  const handleSeasonChange = (e) => { 
    setSelectedSeasonId(e.target.value)
    getTeamOptions(e.target.value)
  }
  const handleHomeTeamChange = (e) => { setSelectedHomeTeam(e.target.value) }
  const handleAwayTeamChange = (e) => { setSelectedAwayTeam(e.target.value) }
  const handleHomeGoalsChange = (e) => { setSelectedHomeGoals(e.target.value) }
  const handleAwayGoalsChange = (e) => { setSelectedAwayGoals(e.target.value) }
  const handleEndedInChange = (e) => { setSelectedEndedIn(e.target.value) }
  const handleCompletedChange = (e) => { setSelectedCompleted(selectedCompleted === true ? false : true) }

  // useState for handling fetched seasons and players for selecting
  const [seasonsOptions, setSeasonsOptions] = useState(null)
  const [teamOptions, setTeamOptions] = useState(null)
  const [playerOptions, setPlayerOptions] = useState(null)


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



  // Handles form submition
  async function handleFormSubmit(e) {
    e.preventDefault()
    switch (props.adminController) {
      case "updateGame":
        console.log("Update Game clicked")
        break;
      case "createGame":
        console.log("Create Game clicked")
        console.log({
          startTime: selectedStartTime,
          gameType: selectedGameType,
          season: selectedSeasonId,
          homeTeam: selectedHomeTeam,
          awayTeam: selectedAwayTeam,
          homeGoals: selectedHomeGoals,
          awayGoals: selectedAwayGoals,
          endedIn: selectedEndedIn,
          completed: selectedCompleted
        })
        break;
      case "deleteGame":
        console.log("Game Deleting Not Functional At This Time")
        break;
    }
    props.handleClose(false)
  }



  // useEffect for initiating the fetch for getting all seasons
  useEffect(() => {
    getSeasonsOptions()
  }, [])




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
          <option value={null}></option>
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