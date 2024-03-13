import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GamesAccord } from '../components';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import '../assets/css/accordion.css'


export default function SeasonAccord() {
  const [seasonArr, setSeasonArr] = useState(null)
  const [activeSeason, setActiveSeason] = useState(null);
  const { seasonname } = useParams()

  async function getSeasonLogs() {
    const query = await fetch("/api/team/name/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    payload.sort(function (a, b) {
      return new Date(b.season.startDate) - new Date(a.season.startDate)
    })
    setSeasonArr(payload)
    // console.log(result)
  }

  const handleAccordionClick = (index) => {
    setActiveSeason(activeSeason === index ? null : index);
  };


  useEffect(() => {
    getSeasonLogs()
  }, [])

  useEffect(() => {
    if (seasonArr) {
      const index = seasonArr.findIndex(season => (season.season.seasonType.toLowerCase() +  new Date(season.season.startDate).getFullYear()) === seasonname)
      if (index !== -1) {
        setActiveSeason(String(index))
      }
      console.log("Index:", index, "seasonId:", seasonname)
    }
  }, [seasonArr, seasonname])

  if (!seasonArr) return <></>

  return (
    <>
      <Accordion id="seasonAccord" activeKey={activeSeason}>
        {seasonArr &&
          seasonArr.map((season, key) => {
            return (
              <Accordion.Item
                id={`${season.season.seasonType.toLowerCase()}${new Date(season.season.startDate).getFullYear()}`}
                onClick={() => handleAccordionClick(String(key))}
                eventKey={String(key)}
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