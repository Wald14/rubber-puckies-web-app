import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { DropDown } from '../components';

export default function CreateSeasonForm(props) {

  const isDisabled = props.adminController === "deleteSeason" ? true : false

  const [selectedRink, setSelectedRink] = useState(props.rink || '')
  const [selectedSeasonType, setSelectedSeasonType] = useState(props.seasonType || '')
  const [selectedStartDate, setSelectedStartDate] = useState(props.startDate || '')
  const [selectedPlayoffRounds, setSelectedPlayoffRounds] = useState(props.playoffRounds || 1)

  const handleRinkChange = (e) => { setSelectedRink(e.target.value) }
  const handleSeasonTypeChange = (e) => { setSelectedSeasonType(e.target.value) }
  const handleStartDateChange = (e) => { setSelectedStartDate(e.target.value) }
  const handlePlayoffRoundsChange = (e) => { setSelectedPlayoffRounds(e.target.value) }

  const [seasonsOptions, setSeasonsOptions] = useState([])



  async function handleFormSubmit(e) {
    e.preventDefault()
    console.log({
      rink: selectedRink,
      seasonType: selectedSeasonType,
      startDate: selectedStartDate,
      playoffRounds: selectedPlayoffRounds,
      adminController: props.control
    })
    if (props.adminController === "createSeason") {
      await createSeason()
    }
    props.handleClose(false)
  }


  async function getSeasonsOptions() {
    const query = await fetch('/api/season')
    const result = await query.json()
    console.log(result)
    await result.payload.forEach( (season) => {

      const year = new Date(season.startDate).getFullYear()
      setSeasonsOptions(seasonsOptions.concat(`${season.seasonType} ${year}`))
    })
    console.log(seasonsOptions)
  }


  async function createSeason() {
    try {
      const query = await fetch('/api/season', {
        method: "POST",
        body: JSON.stringify({
          rink: selectedRink,
          seasonType: selectedSeasonType,
          startDate: selectedStartDate,
          playoffRounds: selectedPlayoffRounds
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(query)
      return query
    } catch (err) {
      console.log(err.message)
    }
  }


  useEffect(() => {
    if (props.adminController === "updateSeason") {
      getSeasonsOptions()
    }
  }, [])

  return (
    <Form>
      {props.adminController === "updateSeason" &&
        <DropDown label={"Select Season"} options={seasonsOptions}/>
      }

      <Form.Group className="mb-3">
        <Form.Label>Rink</Form.Label>
        <Form.Select value={selectedRink} onChange={handleRinkChange} disabled={isDisabled}>
          <option>Select Rink</option>
          <option value="Doog Wood">Doug Woog</option>
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
        <Form.Label>Start Date</Form.Label>
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