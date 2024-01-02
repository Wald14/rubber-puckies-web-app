import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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

  const [teamRoster, setTeamRoster] = useState([])
  const [selectedPlayerToAdd, setSelectedPlayerToAdd] = useState('')


  // Handlers for forum value changes
  const handleNameChange = (e) => { setSelectedName(e.target.value) }
  const handleSeasonChange = (e) => { setSelectedSeasonId(e.target.value) }
  const handlePlayerChange = (e) => { setSelectedPlayerId(e.target.value) }
  const handleSeasonPlaceChange = (e) => { setSelectedSeasonPlace(e.target.value) }
  const handlePlayoffPlaceChange = (e) => { setSelectedPlayoffPlace(e.target.value) }
  // Handlers to building roster
  const handlePlayerToAddChange = (e) => { setSelectedPlayerToAdd(e.target.value) }
  const handleAddPlayer = (e) => {
    if (!teamRoster.find(player => player.playerId === selectedPlayerToAdd)) {
      const player = playerOptions.find(player => player.playerId === selectedPlayerToAdd)
      const newRoster = [...teamRoster, player]
      setTeamRoster(newRoster);
      setSelectedPlayerToAdd('');
    }
  }
  const handleRemovePlayer = (playerId) => {
    const updatedRoster = teamRoster.filter(player => player.playerId !== playerId)
    setTeamRoster(updatedRoster)
  }

  const handleTeamChange = async (e) => {
    setSelectedTeamId(e.target.value)
    const curTeam = teamOptions.find(team => team.teamId === e.target.value)
    setSelectedName(curTeam.teamName)
    setSelectedSeasonId(curTeam.seasonId)
    setSelectedPlayerId(curTeam.captain ? curTeam.captain : '')
    setSelectedSeasonPlace(curTeam.seasonPlace ? curTeam.seasonPlace : '')
    setSelectedPlayoffPlace(curTeam.playoffPlace ? curTeam.playoffPlace : '')
    try {
      const query = await fetch(`/api/player/team/${e.target.value}`)
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
      setTeamRoster(players)
    } catch (err) {
      console.log(err.message)
    }
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
        playoffPlace: team.playoffPlace,
        createdAt: team.createdAt
      })
    })
    teams.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
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
      const result = await query.json()
      const newTeamId = result.payload._id

      // const newTeamId = await fetch('/api/team/mostrecent')
      teamRoster.forEach(async (player) => {
        await addTeamToPlayer(player.playerId, newTeamId)
      })
      return newTeamId;
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

      const queryCurTeamRoster = await fetch(`/api/player/team/${teamId}`)
      const curRosterPayload = await queryCurTeamRoster.json();
      const curRoster = curRosterPayload.payload

      const removePlayerList = curRoster.filter(
        curPlayer => !teamRoster.some(updatedPlayer => updatedPlayer.playerId === curPlayer._id)
      )
      const addPlayerList = teamRoster.filter(
        updatedPlayer => !curRoster.some(currentPlayer => currentPlayer._id === updatedPlayer.playerId)
      )

      // if onTeam but not on teamRoster, then remove
      removePlayerList.forEach(async (player) => {
        await removeTeamFromPlayer(player._id)
      })
      // if notOnTeam but on teamRoster, then add
      addPlayerList.forEach(async (player) => {
        await addTeamToPlayer(player.playerId)
      })

      return query;
    } catch (err) {
      console.log(err.message)
    }
  }

  // Add Player to Team
  async function addTeamToPlayer(playerId, teamId) {
    const addingTeam = teamId ? teamId : selectedTeamId
    try {
      const queryCurPlayer = await fetch(`/api/player/${playerId}`)
      const curPlayer = await queryCurPlayer.json();
      if (!curPlayer.payload.teams.includes(addingTeam)) {
        const updatedTeams = [...curPlayer.payload.teams, addingTeam]

        const queryUpdate = await fetch(`/api/player/${playerId}`, {
          method: 'PUT',
          body: JSON.stringify({
            teams: updatedTeams
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        return queryUpdate
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  // Remove Player From Team
  async function removeTeamFromPlayer(playerId) {
    try {
      const queryCurPlayer = await fetch(`/api/player/${playerId}`)
      const curPlayer = await queryCurPlayer.json();
      const teamToRemove = curPlayer.payload.teams.find(team => team._id === selectedTeamId)

      if (teamToRemove) {
        const updatedTeams = await curPlayer.payload.teams.filter(team => team._id !== selectedTeamId)
        const queryUpdate = await fetch(`/api/player/${playerId}`, {
          method: 'PUT',
          body: JSON.stringify({
            teams: updatedTeams
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        return queryUpdate
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  async function setInitialRosterOnLoad(teamId) {
    try {
      const query = await fetch(`/api/player/team/${teamId}`)
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
      setTeamRoster(players)
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

  // useEffect for initiating the fetch for getting all seasons and players
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
      setInitialRosterOnLoad(teamOptions[0].teamId)
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
        <Form.Label>Set Season Place (Number)</Form.Label>
        <Form.Control type="name" value={selectedSeasonPlace} onChange={handleSeasonPlaceChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Set Playoff Place (Number)</Form.Label>
        <Form.Control type="name" value={selectedPlayoffPlace} onChange={handlePlayoffPlaceChange} disabled={isDisabled} />
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


      <Form.Label>Add Player</Form.Label>
      <InputGroup className="mb-3">
        <Form.Select value={selectedPlayerToAdd} onChange={handlePlayerToAddChange} disabled={isDisabled}>
          <option value={null}></option>
          {playerOptions &&
            playerOptions.map((player, key) => {
              return (
                <option key={key} value={player.playerId}>{player.playerName}</option>
              )
            })
          }
        </Form.Select>
        <Button variant="outline-success" id="button-addon2" onClick={handleAddPlayer} disabled={isDisabled}>
          Add
        </Button>
      </InputGroup>

      {teamRoster.length > 0 &&
        <>
          <Form.Label>Roster</Form.Label>
          <ol>
            {teamRoster.map(player => (
              <li key={player.playerId} style={{ marginBottom: "10px" }}>
                <div className="d-flex justify-content-between">
                  <span>{player.playerName}</span>

                  {/* <span>({player.playerId}) */}
                  <Button style={{ margin: "0px 16px" }} variant="outline-danger" onClick={() => handleRemovePlayer(player.playerId)} disabled={isDisabled}>
                    X
                  </Button>
                  {/* </span> */}
                </div>
              </li>
            ))}
          </ol>
        </>
      }

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