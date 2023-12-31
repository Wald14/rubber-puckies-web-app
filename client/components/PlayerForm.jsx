import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function PlayerForm(props) {

  // Set fields to be disabled based on if the delete modal is opened
  const isDisabled = props.adminController === "deletePlayer" ? true : false

  // useState for forum values
  const [selectedPlayerId, setSelectedPlayerId] = useState()
  const [selectedFirstName, setSelectedFirstName] = useState('')
  const [selectedLastName, setSelectedLastName] = useState('')
  const [selectedJerseyNumber, setSelectedJerseyNumber] = useState('')
  const [selectedHandedness, setSelectedHandedness] = useState('')
  const [selectedF, setSelectedF] = useState(false)
  const [selectedD, setSelectedD] = useState(false)
  const [selectedG, setSelectedG] = useState(false)

  // Handlers for forum value changes
  const handleFirstNameChange = (e) => { setSelectedFirstName(e.target.value) }
  const handleLastNameChange = (e) => { setSelectedLastName(e.target.value) }
  const handleJerseyNumberChange = (e) => { setSelectedJerseyNumber(e.target.value) }
  const handleHandednessChange = (e) => { setSelectedHandedness(e.target.value) }
  const handlesetSelectedFChange = (e) => { setSelectedF(selectedF === true ? false : true) }
  const handlesetSelectedDChange = (e) => { setSelectedD(selectedD === true ? false : true) }
  const handlesetSelectedGChange = (e) => { setSelectedG(selectedG === true ? false : true) }



  const handlePlayerChange = (e) => {
    setSelectedPlayerId(e.target.value)
    const curPlayer = playerOptions.find(player => player.playerId === e.target.value)
    setSelectedFirstName(curPlayer.firstName)
    setSelectedLastName(curPlayer.lastName)
    setSelectedJerseyNumber(curPlayer.jerseyNumber ? curPlayer.jerseyNumber : '')
    setSelectedHandedness(curPlayer.handedness ? curPlayer.handedness : '')
    setSelectedF(curPlayer.positions.indexOf("F") === -1 ? false : true)
    setSelectedD(curPlayer.positions.indexOf("D") === -1 ? false : true)
    setSelectedG(curPlayer.positions.indexOf("G") === -1 ? false : true)
  }


  // useState for handling fetched seasons and players for selecting
  const [playerOptions, setPlayerOptions] = useState(null)


  // Handles form submit
  async function handleFormSubmit(e) {
    e.preventDefault()
    switch (props.adminController) {
      case "updatePlayer":
        await updatePlayer(selectedPlayerId)
        break;
      case "createPlayer":
        await createPlayer()
        break;
      case "deletePlayer":
        console.log("Delete Player not operational yet")
        break;
    }
    props.handleClose(false)
  }

  // Fetches All Players for updating and deleting
  async function getPlayerOptions() {
    const query = await fetch('/api/player')
    const result = await query.json()

    const players = []
    await result.payload.forEach((player) => {
      players.push({
        ...players,
        playerId: player._id,
        playerName: `${player.firstName} ${player.lastName}`,
        firstName: player.firstName,
        lastName: player.lastName,
        jerseyNumber: player.jerseyNumber,
        handedness: player.handedness,
        positions: player.positions
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


  // Handles Creating a Player
  async function createPlayer() {

    // Turn positions from boolean into an array
    const positions = []
    if (selectedF) {
      positions.push("F")
    }
    if (selectedD) {
      positions.push("D")
    }
    if (selectedG) {
      positions.push("G")
    }

    // Create Player request
    try {
      const query = await fetch('/api/player', {
        method: "POST",
        body: JSON.stringify({
          firstName: selectedFirstName,
          lastName: selectedLastName,
          jerseyNumber: selectedJerseyNumber,
          handedness: selectedHandedness,
          positions: positions
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

  // Handles Updating a Player
  async function updatePlayer(playerId) {

    // Turn positions from boolean into an array
    const positions = []
    if (selectedF) {
      positions.push("F")
    }
    if (selectedD) {
      positions.push("D")
    }
    if (selectedG) {
      positions.push("G")
    }
    try {
      const query = await fetch(`/api/player/${playerId}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: selectedFirstName,
          lastName: selectedLastName,
          jerseyNumber: selectedJerseyNumber !== "" ? selectedJerseyNumber : null,
          handedness: selectedHandedness !== "" ? selectedHandedness : null,
          positions: positions !== "" ? positions : null
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
    if (props.adminController !== "createPlayer") {
      getPlayerOptions()
    }
  }, [])

  // useEffect for setting values to the first fetched team for Update and Delete Modals
  useEffect(() => {
    if (playerOptions !== null) {
      // console.log(playerOptions)
      setSelectedPlayerId(playerOptions[0].playerId)
      setSelectedFirstName(playerOptions[0].firstName)
      setSelectedLastName(playerOptions[0].lastName)
      setSelectedJerseyNumber(playerOptions[0].jerseyNumber ? playerOptions[0].jerseyNumber : '')
      setSelectedHandedness(playerOptions[0].handedness ? playerOptions[0].handedness : '')
      setSelectedF(playerOptions[0].positions.indexOf("F") === -1 ? false : true)
      setSelectedD(playerOptions[0].positions.indexOf("D") === -1 ? false : true)
      setSelectedG(playerOptions[0].positions.indexOf("G") === -1 ? false : true)
    }
  }, [playerOptions])


  return (
    <Form>

      {props.adminController !== "createPlayer" &&
        <Form.Group className="mb-3">
          <Form.Label>Select Player</Form.Label>
          <Form.Select value={selectedPlayerId} onChange={handlePlayerChange}>
            {playerOptions &&
              playerOptions.map((player, key) => {
                return (
                  <option key={key} value={player.playerId}>{player.playerName}</option>
                )
              })
            }
          </Form.Select>
        </Form.Group>
      }

      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstName" value={selectedFirstName} onChange={handleFirstNameChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastName" value={selectedLastName} onChange={handleLastNameChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Jersey Number</Form.Label>
        <Form.Control type="jerseyNumber" value={selectedJerseyNumber} onChange={handleJerseyNumberChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Handedness</Form.Label>
        <Form.Select value={selectedHandedness} onChange={handleHandednessChange} disabled={isDisabled}>
          <option></option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={{ marginRight: '10px' }}>Positions:</Form.Label>
        <Form.Check
          inline
          label="Forward"
          name="group1"
          type="checkbox"
          id={`inline-checkbox-1`}
          checked={selectedF}
          onChange={handlesetSelectedFChange}
          disabled={isDisabled}
        />
        <Form.Check
          inline
          label="Defense"
          name="group1"
          type="checkbox"
          id={`inline-checkbox-2`}
          checked={selectedD}
          onChange={handlesetSelectedDChange}
          disabled={isDisabled}
        />
        <Form.Check
          inline
          label="Goalie"
          name="group1"
          type="checkbox"
          id={`inline-checkbox-3`}
          checked={selectedG}
          onChange={handlesetSelectedGChange}
          disabled={isDisabled}
        />
      </Form.Group>


      {props.adminController === "updatePlayer" &&
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Update Player
        </Button>
      }
      {props.adminController === "createPlayer" &&
        <Button variant="success" type="submit" onClick={handleFormSubmit}>
          Create Player
        </Button>
      }
      {props.adminController === "deletePlayer" &&
        <Button variant="danger" type="submit" onClick={handleFormSubmit}>
          Delete Player
        </Button>
      }

    </Form>
  );
}