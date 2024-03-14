import { useEffect, useState, useRef } from "react"
import { GamesAccord } from '../components';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import capitalizeString from '../utils/stringAdjustments.js';
import '../assets/css/accordion.css'

export default function SeasonAccord() {
  const [seasonArr, setSeasonArr] = useState(null)
  // const [activeSeason, setActiveSeason] = useState(null);
  // const [accordionTransitionEnded, setAccordionTransitionEnded] = useState(false);
  // const accordionBodyRef = useRef(null);

  let defaultActiveSeason

  async function getSeasonLogs() {
    const query = await fetch("/api/team/name/Rubber Puckies");
    const result = await query.json();
    const payload = result.payload;
    payload.sort(function (a, b) {
      return new Date(b.season.startDate) - new Date(a.season.startDate)
    })
    // Set active season accord if there is a window hash
    if (window.location.hash) {
      const index = payload.findIndex(season =>
        (season.season.seasonType.toLowerCase() + new Date(season.season.startDate).getFullYear()) === (window.location.hash.substring(1)))
      if (index !== -1) {
        // setActiveSeason(String(index))
        defaultActiveSeason = String(index)
      }
    }
    setSeasonArr(payload)
  }

 function determineDefaultSeason() {
  if (window.location.hash) {
    const index = seasonArr.findIndex(season =>
      (season.season.seasonType.toLowerCase() + new Date(season.season.startDate).getFullYear()) === (window.location.hash.substring(1)))
    if (index !== -1) {
      return String(index)
    }
  }
 }

  // const handleAccordionClick = (index) => {
  //   setActiveSeason(activeSeason === index ? null : index);
  // };

  const scrollToHash = async () => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      const element = document.getElementById(hash)
      if (element) {
        // setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // }, 1000)
      }
    }
  }

  // Load Season Log Info
  useEffect(() => {
    getSeasonLogs()
  }, [])

  // 
  useEffect(() => {
    if (seasonArr) {
      setTimeout(() => {
        scrollToHash()
        // setAccordionTransitionEnded(true)
      }, 500)
    }
  }, [seasonArr])

  // When transition has ended, scroll to active
  // useEffect(() => {
  //   if (accordionTransitionEnded) {
  //     scrollToHash()
  //   }
  // }, [accordionTransitionEnded])

  // useEffect(() => {
  //   scrollToHash()
  // }, [seasonArr])

  // useEffect(() => {
  //   console.log(accordionBodyRef.current)
  //   setAccordionTransitionEnded(true)
  //   if (accordionBodyRef.current) {
  //     console.log("here")
  //     scrollToHash()
  //   }
  // }, [accordionBodyRef.current])

  //   useEffect(() => {
  //   console.log(accordionBodyRef.current)
  //   setAccordionTransitionEnded(true)
  //   if (accordionBodyRef.current) {
  //     console.log("here")
  //     scrollToHash()
  //   }
  // }, [accordionBodyRef.current])

  // useEffect(() => {
  //   if (seasonArr) {
  //     const index = seasonArr.findIndex( season => 
  //       (season.season.seasonType.toLowerCase() +  new Date(season.season.startDate).getFullYear()) === (window.location.hash.substring(1)))
  //     if (index !== -1) {
  //       setActiveSeason(String(index))
  //     }
  //   }
  //   scrollToHash()
  // }, [seasonArr])

  if (!seasonArr) return <></>

  return (
    <>
      <Accordion 
      id="seasonAccord" 
      // activeKey={activeSeason} 
      defaultActiveKey={window.location.hash ? determineDefaultSeason : "0"}
      >
        {seasonArr &&
          seasonArr.map((season, key) => {
            return (
              <Accordion.Item
                id={`${season.season.seasonType.toLowerCase()}${new Date(season.season.startDate).getFullYear()}`}
                // onClick={() => handleAccordionClick(String(key))}
                eventKey={String(key)}
                key={key}
                style={{
                  backgroundColor: "#141414",
                  maxWidth: "800px"
                }}
              >
                <Accordion.Header>{capitalizeString(season.season.seasonType)} {new Date(season.season.startDate).getFullYear()} - {season.season.rink}</Accordion.Header>
                <Accordion.Body 
                // ref={accordionBodyRef}
                >

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