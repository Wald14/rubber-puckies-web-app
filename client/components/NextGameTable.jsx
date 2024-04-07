import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components";
import Table from "react-bootstrap/esm/Table";
import capitalizeString from '../utils/stringAdjustments.js';

export default function NextGameTable() {

  const [lastGame, setLastGame] = useState()
  const [caption, setCaption] = useState("")


  async function getLastGame() {
    const query = await fetch('/api/game/next')
    const result = await query.json()

    setCaption(formatDate(result.payload.startTime))
    setLastGame(result.payload)
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

  if (!lastGame) return (<LoadingSpinner />)


  return (
    <div
      style={{
        width: "400px",
        maxWidth: "90vw",
        margin: "16px 5px 8px 5px",
      }}>
      <p
        style={{
          textAlign: "center",
          margin: "0px 0px 0px 0px",
          fontWeight: "bold",
          fontSize: "18px"
        }}
      >
        Next Game
      </p>
      <p
        style={{
          textAlign: "center",
          margin: "0px 0px 12px 0px",
          color: "goldenrod"
        }}
      >
        {caption}
      </p>
      <Table>
        <caption style={{ fontSize: "12px", paddingLeft: "8px" }}>{capitalizeString(lastGame.gameType) === "Regular" ? "Regular Season Game" : capitalizeString(lastGame.gameType) + " Game"}</caption>
        <thead>
          <tr>
            <th className="bg-warning" style={{ color: "black" }}>TEAM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Home - {lastGame.homeTeam.name}</td>
          </tr>
          <tr>
            <td>Away - {lastGame.awayTeam.name}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}