import { useEffect, useState } from "react"
import { GamesAccord } from '../components';
import Accordion from 'react-bootstrap/Accordion';
import capitalizeString from '../utils/stringAdjustments.js';
import '../assets/css/accordion.css'

// React Loader Spinner Import
import { BallTriangle } from 'react-loader-spinner'

export default function SeasonAccord() {
  const [seasonArr, setSeasonArr] = useState(null)
  
  async function getSeasonLogs() {
    const query = await fetch("/api/team/name/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    payload.sort(function (a, b) {
      return new Date(b.season.startDate) - new Date(a.season.startDate)
    })
    setSeasonArr(payload)
    console.log(result)
  }

  useEffect(() => {
    getSeasonLogs()
  }, [])

  if (!seasonArr) return (
    <div style={{ minHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <BallTriangle
      color="goldenrod"
    />
  </div>
  )

  return (
    <>
      <Accordion id="seasonAccord">
        {seasonArr &&
          seasonArr.map((season, key) => {
            return (
              <Accordion.Item
                id={`${capitalizeString(season.season.seasonType).toLowerCase()}${new Date(season.season.startDate).getFullYear()}`}
                eventKey={key}
                key={key}
                style={{
                  backgroundColor: "#141414",
                  maxWidth: "800px"
                }}
              >
                <Accordion.Header>{capitalizeString(season.season.seasonType)} {new Date(season.season.startDate).getFullYear()} - {season.season.rink}</Accordion.Header>
                <Accordion.Body>

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