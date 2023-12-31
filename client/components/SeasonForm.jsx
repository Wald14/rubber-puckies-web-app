import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function SeasonForm(props) {

  // Set fields to be disabled based on if the delete modal is opened
  const isDisabled = props.adminController === "deleteSeason" ? true : false

  // Set Default values 
  const defaultValues = {
    seasonId: '',
    rink: '',
    seasonType: '',
    startDate: '',
    playoffRounds: 1
  }

  // useState for forum values
  const [selectedSeasonId, setSelectedSeasonId] = useState(defaultValues.seasonId)
  const [selectedRink, setSelectedRink] = useState(defaultValues.rink)
  const [selectedSeasonType, setSelectedSeasonType] = useState(defaultValues.seasonType)
  const [selectedStartDate, setSelectedStartDate] = useState(defaultValues.startDate)
  const [selectedPlayoffRounds, setSelectedPlayoffRounds] = useState(defaultValues.playoffRounds)
  // Handlers for forum value changes
  const handleRinkChange = (e) => { setSelectedRink(e.target.value) }
  const handleSeasonTypeChange = (e) => { setSelectedSeasonType(e.target.value) }
  const handleStartDateChange = (e) => { setSelectedStartDate(e.target.value) }
  const handlePlayoffRoundsChange = (e) => { setSelectedPlayoffRounds(e.target.value) }
  // Handler for selectedSeason change
  const handleSeasonChange = (e) => {
    setSelectedSeasonId(e.target.value)
    const curSeason = seasonsOptions.find(season => season._id === e.target.value)
    setSelectedRink(curSeason.rink)
    setSelectedSeasonType(curSeason.seasonType)
    setSelectedStartDate(curSeason.startDate)
    setSelectedPlayoffRounds(curSeason.playoffRounds)
  }

  // useState for handling fetched seasons for Update or Delete Season modals
  const [seasonsOptions, setSeasonsOptions] = useState(null)


  // Handles form submition
  async function handleFormSubmit(e) {
    e.preventDefault()
    switch (props.adminController) {
      case "updateSeason":
        await updateSeason(selectedSeasonId)
        break;
      case "createSeason":
        await createSeason()
        break;
      case "deleteSeason":
        console.log("Season Deleting Not Functional At This Time")
        break;
    }
    props.handleClose(false)
  }


  // Fetches All Seasons for Update and Delete Modals
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


  // Handles updating a season
  async function updateSeason(seasonId) {
    try {
      const query = await fetch(`/api/season/${seasonId}`, {
        method: "PUT",
        body: JSON.stringify({
          rink: selectedRink,
          seasonType: selectedSeasonType,
          startDate: convertToUTC(selectedStartDate),
          playoffRounds: selectedPlayoffRounds
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return query
    } catch (err) {
      console.log(err.message)
    }
  }

  // Handles creating a new season
  async function createSeason() {
    try {
      const query = await fetch('/api/season', {
        method: "POST",
        body: JSON.stringify({
          rink: selectedRink,
          seasonType: selectedSeasonType,
          startDate: convertToUTC(selectedStartDate),
          playoffRounds: selectedPlayoffRounds
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return query
    } catch (err) {
      console.log(err.message)
    }
  }


  // convert data to UTC time
  function convertToUTC(date) {
    const enteredDate = new Date(date)
    const utcDate = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(enteredDate);
    const convertedDate = new Date(utcDate).toISOString()
    return (convertedDate)
  }

  // useEffect for initiating the fecth for getting all seasons
  useEffect(() => {
    if (props.adminController !== "createSeason") {
      getSeasonsOptions()
    }
  }, [])

  // useEffect for setting values to the first fetched season for Update and Delete Modals
  useEffect(() => {
    if (seasonsOptions !== null) {
      setSelectedSeasonId(seasonsOptions[0]._id)
      setSelectedRink(seasonsOptions[0].rink)
      setSelectedSeasonType(seasonsOptions[0].seasonType)
      setSelectedStartDate(seasonsOptions[0].startDate)
      setSelectedPlayoffRounds(seasonsOptions[0].playoffRounds)
    }
  }, [seasonsOptions])


  return (
    <Form>

      {props.adminController !== "createSeason" &&
        <Form.Group className="mb-3">
          <Form.Label>Select Season</Form.Label>
          <Form.Select value={selectedSeasonId} onChange={handleSeasonChange}>
            {seasonsOptions &&
              seasonsOptions.map((season, key) => {
                return (
                  <option key={key} value={season._id}>{season.seasonName}</option>
                )
              })
            }
          </Form.Select>
        </Form.Group>
      }

      <Form.Group className="mb-3">
        <Form.Label>Rink</Form.Label>
        <Form.Select value={selectedRink} onChange={handleRinkChange} disabled={isDisabled}>
          <option>Select Rink</option>
          <option value="Doug Woog">Doug Woog</option>
          <option value="Roseville">Roseville</option>
          <option value="Eden Prairie">Eden Prairie</option>
          <option value="Roseville/Tartan">Roseville/Tartan</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select value={selectedSeasonType} onChange={handleSeasonTypeChange} disabled={isDisabled}>
          <option>Select Season Type</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date (YYYY-MM-DD)</Form.Label>
        <Form.Control type="startDate" placeholder="YYYY-MM-DD" value={selectedStartDate} onChange={handleStartDateChange} disabled={isDisabled} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Playoff Rounds</Form.Label>
        <Form.Control type="startDate" value={selectedPlayoffRounds} onChange={handlePlayoffRoundsChange} disabled={isDisabled} />
      </Form.Group>

      {props.adminController === "updateSeason" &&
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Update Season
        </Button>
      }
      {props.adminController === "createSeason" &&
        <Button variant="success" type="submit" onClick={handleFormSubmit}>
          Create Season
        </Button>
      }
      {props.adminController === "deleteSeason" &&
        <Button variant="danger" type="submit" onClick={handleFormSubmit}>
          Delete Season
        </Button>
      }

    </Form>
  );
}