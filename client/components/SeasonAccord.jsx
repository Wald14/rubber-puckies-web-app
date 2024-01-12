import { useEffect, useState } from "react"
import { GamesAccord } from '../components';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import '../assets/css/accordion.css'


export default function SeasonAccord() {
  const [seasonArr, setSeasonArr] = useState(null)

  async function getSeasonLogs() {
    const query = await fetch("/api/team/name/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    setSeasonArr(payload)
  }


  useEffect(() => {
    getSeasonLogs()
  }, [])

  if (!seasonArr) return <></>


  return (
    <>
      <Accordion id="seasonAccord">
        {seasonArr &&
          seasonArr.map((season, key) => {
            return (
              <Accordion.Item eventKey={key} key={key}>
                <Accordion.Header>{capitalizeString(season.season.seasonType)} {new Date(season.season.startDate).getFullYear()} - {season.season.rink}</Accordion.Header>
                <Accordion.Body>
                  <h3>Games</h3>

                  <GamesAccord teamId={season.season._id} playoffPlace={season.playoffPlace} />

                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </>
  )
}