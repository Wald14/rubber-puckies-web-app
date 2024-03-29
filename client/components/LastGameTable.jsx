import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components";
import Table from "react-bootstrap/esm/Table";
import capitalizeString from '../utils/stringAdjustments.js';

export default function LastGameTable() {

  const [lastGame, setLastGame] = useState()
  const [caption, setCaption] = useState("")


  async function getLastGame() {
    const query = await fetch('/api/game/lastPlayed')
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
        margin: "16px 0px 8px 0px",
      }}>
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
  )
}