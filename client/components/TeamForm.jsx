import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function TeamForm(props) {

  // Set fields to be disabled based on if the delete modal is opened
  const isDisabled = props.adminController === "deleteTeam" ? true : false

  // useState for forum values
  const [selectedName, setSelectedName] = useState('')
  const [selectedTeamId, setSelectedTeamId] = useState()
  const [selectedSeasonId, setSelectedSeasonId] = useState()
  const [selectedPlayerId, setSelectedPlayerId] = useState()
  const [selectedSeasonPlace, setSelectedSeasonPlace] = useState('')
  const [selectedPlayoffPlace, setSelectedPlayoffPlace] = useState('')
  // Handlers for forum value changes
  const handleNameChange = (e) => { setSelectedName(e.target.value) }
  const handleSeasonChange = (e) => { setSelectedSeasonId(e.target.value) }
  const handlePlayerChange = (e) => { setSelectedPlayerId(e.target.value) }
  const handleSeasonPlaceChange = (e) => { setSelectedSeasonPlace(e.target.value) }
  const handlePlayoffPlaceChange = (e) => { setSelectedPlayoffPlace(e.target.value) }


  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value)
    const curTeam = teamOptions.find(team => team.teamId === e.target.value)
    setSelectedName(curTeam.teamName)
    setSelectedSeasonId(curTeam.seasonId)
    setSelectedPlayerId(curTeam.captain ? curTeam.captain : '')
    setSelectedSeasonPlace(curTeam.seasonPlace ? curTeam.seasonPlace : '')
    setSelectedPlayoffPlace(curTeam.playoffPlace ? curTeam.playoffPlace : '')
  }


  // useState for handling fetched seasons and players for selecting
  const [teamOptions, setTeamOptions] = useState(null)
  const [seasonsOptions, setSeasonsOptions] = useState(null)
  const [playerOptions, setPlayerOptions] = useState(null)


  // Handles form submit
  async function handleFormSubmit(e) {
    e.preventDefault()
    // console.log({
    //   name: selectedName,
    //   season: selectedSeasonId,
    //   captain: selectedPlayerId,
    //   seasonPlace: selectedSeasonPlace,
    //   playoffPlace: selectedPlayoffPlace
    // })
    switch (props.adminController) {
      case "updateTeam":
        await updateTeam(selectedTeamId)
        break;
      case "createTeam":
        await createTeam()
        break;
      case "deleteTeam":
        console.log("Team Deleteing is not operational at this time")
        break;
    }
    props.handleClose(false)
  }






  // Fetches All Teams for updating and deleting
  async function getTeamOptions() {
    const query = await fetch('/api/team')
    const result = await query.json()

    const teams = []
    await result.payload.forEach((team) => {
      const date = new Date(team.season.startDate)
      const year = date.getFullYear()
      const seasonName = `${team.season.seasonType.charAt(0).toUpperCase() + team.season.seasonType.slice(1)} ${year}`
      const teamName = `${team.name} - (${seasonName})`
      teams.push({
        ...teams,
        teamId: team._id,
        selectorTeamName: teamName,
        teamName: team.name,
        seasonId: team.season._id,
        captain: team.captain,
        seasonPlace: team.seasonPlace,
        playoffPlace: team.playoffPlace
      })
    })
    setTeamOptions(teams)
  }

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

  // Fetches All Players for selecting team captain
  async function getPlayerOptions() {
    const query = await fetch('/api/player')
    const result = await query.json()

    const players = []
    await result.payload.forEach((player) => {
      players.push({
        ...players,
        playerId: player._id,
        playerName: `${player.firstName} ${player.lastName}`
      })
    })
    players.sort(function (a, b) {
      let x = a.playerName.toLowerCase();
      let y = b.playerName.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })
    setPlayerOptions(players)
  }

  // Handles Creating a New Team
  async function createTeam() {
    try {
      const query = await fetch('/api/team', {
        method: "POST",
        body: JSON.stringify({
          name: selectedName,
          season: selectedSeasonId,
          captain: selectedPlayerId,
          seasonPlace: selectedSeasonPlace,
          playoffPlace: selectedPlayoffPlace
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

  // Handles Updating a Team
  async function updateTeam(teamId) {
    try {
      const query = await fetch(`/api/team/${teamId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: selectedName,
          season: selectedSeasonId,
          captain: selectedPlayerId !== "" ? selectedPlayerId : null,
          seasonPlace: selectedSeasonPlace !== "" ? selectedSeasonPlace : null,
          playoffPlace: selectedPlayoffPlace !== "" ? selectedPlayoffPlace : null,
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


  // useEffect for initiating the fetch for getting all seasons
  useEffect(() => {
    if (props.adminController !== "createTeam") {
      getTeamOptions()
    }
  }, [])

  // useEffect for initiating the fetch for getting all players
  useEffect(() => {
    getSeasonsOptions()
    getPlayerOptions()
  }, [])

  // useEffect for setting values to the first fetched team for Update and Delete Modals
  useEffect(() => {
    if (teamOptions !== null) {
      setSelectedTeamId(teamOptions[0].teamId)
      setSelectedName(teamOptions[0].teamName)
      setSelectedSeasonId(teamOptions[0].seasonId)
      setSelectedPlayerId(teamOptions[0].captain ? teamOptions[0].captain : '')
      setSelectedSeasonPlace(teamOptions[0].seasonPlace ? teamOptions[0].seasonPlace : '')
      setSelectedPlayoffPlace(teamOptions[0].PlayoffPlace ? teamOptions[0].PlayoffPlace : '')
    }
  }, [teamOptions])


  return (
    <Form>

      {props.adminController !== "createTeam" &&
        <Form.Group className="mb-3">
          <Form.Label>Select Team</Form.Label>
          <Form.Select value={selectedTeamId} onChange={handleTeamChange}>
            {teamOptions &&
              teamOptions.map((team, key) => {
                return (
                  <option key={key} value={team.teamId}>{team.selectorTeamName}</option>
                )
              })
            }
          </Form.Select>
        </Form.Group>
      }

      <Form.Group className="mb-3">
        <Form.Label>Team Name</Form.Label>
        <Form.Control type="name" value={selectedName} onChange={handleNameChange} disabled={isDisabled} />
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
        <Form.Label>Select Captain</Form.Label>
        <Form.Select value={selectedPlayerId} onChange={handlePlayerChange} disabled={isDisabled}>
          <option value={null}></option>
          {playerOptions &&
            playerOptions.map((player, key) => {
              return (
                <option key={key} value={player.playerId}>{player.playerName}</option>
              )
            })
          }
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Set Season Place (Number)</Form.Label>
        <Form.Control type="name" value={selectedSeasonPlace} onChange={handleSeasonPlaceChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Set Playoff Place (Number)</Form.Label>
        <Form.Control type="name" value={selectedPlayoffPlace} onChange={handlePlayoffPlaceChange} disabled={isDisabled} />
      </Form.Group>


      {props.adminController === "updateTeam" &&
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Update Team
        </Button>
      }
      {props.adminController === "createTeam" &&
        <Button variant="success" type="submit" onClick={handleFormSubmit}>
          Create Team
        </Button>
      }
      {props.adminController === "deleteTeam" &&
        <Button variant="danger" type="submit" onClick={handleFormSubmit}>
          Delete Team
        </Button>
      }

    </Form>
  );
}