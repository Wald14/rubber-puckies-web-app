import { useState, useEffect } from "react";

import capitalizeString from '../utils/stringAdjustments.js';


import Table from "react-bootstrap/esm/Table";


export default function Hero() {
  const isMobile = window.screen.width < 425
  const displayLinks = window.screen.width < 450

  const [lastGame, setLastGame] = useState()
  const [caption, setCaption] = useState("")


  async function getLastGame() {
    const query = await fetch('/api/game/lastPlayed')
    const result = await query.json()

    setCaption(formatDate(result.payload.startTime))
    setLastGame(result.payload)

    console.log(result.payload)
  }

  function formatDate(time) {
    const month = new Date(time).toLocaleString("en", { weekday: "short" })
    const date = new Date(time).toLocaleString("en", { month: "short", day: "numeric", })
    const year = new Date(time).toLocaleString("en", { year: "numeric" })
    const timeOfDay = new Date(time).toLocaleString("en", { hour: '2-digit', minute: '2-digit' })
    return `${month} ${date}, ${year} @ ${timeOfDay}`
  }


  useEffect(() => {
    getLastGame()
  }, [])

  if (!lastGame) return <></>

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
      >
        {!isMobile &&
          <img
            src="/assets/images/rubber_puckie_logo.png"
            style={{ width: "50px", height: "50px" }}
          />
        }
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: "0px" }}> Rubber Puckie Hockey </h1>
        </div>
        {!isMobile &&
          <img
            src="/assets/images/rubber_puckie_logo.png"
            style={{ width: "50px", height: "50px" }}
          />
        }
      </div>

      <div style={{ display: "flex", justifyContent: "center", borderBottom: "solid goldenrod 1px" }}>
        <img
          src="/assets/images/championship_winter_2024.jpeg"
          alt="Team photo"
          style={{ width: "90vw", maxWidth: "900px", margin: "16px 0px 32px 0px" }}
        />

      </div>


      {displayLinks &&
        <div style={{ borderBottom: "solid goldenrod 1px", margin: "16px 0px" }}>
          <Table
            borderless
            style={{
              textAlign: "center",
              fontSize: "16px"
            }}
          >
            <tbody>
              <tr>
                <td>
                  <a
                    href='/roster'
                    style={{ color: "goldenrod" }}
                  >
                    Current Roster
                  </a>
                </td>
                <td>
                  <a
                    href='/teamhistory'
                    style={{ color: "goldenrod" }}
                  >
                    Team History
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <a
                    href='/roster'
                    style={{ color: "goldenrod" }}
                  >
                    All Players
                  </a>
                </td>
                <td>
                  <a
                    href='/teamhistory'
                    style={{ color: "goldenrod" }}
                  >
                    Season & Game Logs
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      }




      <div style={{ borderBottom: "solid goldenrod 1px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "400px", maxWidth: "90vw", margin: "16px 0px 8px 0px" }}>
          <p
            style={{
              textAlign: "center",
              margin: "0px 0px 0px 0px",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            Last Game
          </p>
          <p
            style={{
              textAlign: "center",
              margin: "0px 0px 12px 0px",
              color: "goldenrod"
            }}
          >
            {capitalizeString(lastGame.gameType)} Game
          </p>

          <Table>
            <caption style={{ fontSize: "12px", paddingLeft: "8px" }}>{caption}</caption>
            <thead>
              <tr>
                <th className="bg-warning" style={{ color: "black" }}>TEAM</th>
                <th className="bg-warning" style={{ color: "black", textAlign: "center" }}>Goals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Home - {lastGame.homeTeam.name}</td>
                <td style={{ textAlign: "center" }}>{lastGame.homeGoals}</td>
              </tr>
              <tr>
                <td>Away - {lastGame.awayTeam.name}</td>
                <td style={{ textAlign: "center" }}>{lastGame.awayGoals}</td>
              </tr>
            </tbody>
          </Table>

        </div>
      </div>

    </>)
}