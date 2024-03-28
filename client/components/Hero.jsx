import { useState, useEffect } from "react";


import Table from "react-bootstrap/esm/Table";


export default function Hero() {
  const isMobile = window.screen.width < 425

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

      <img 
      src="/assets/images/championship_winter_2024.jpg"
      style={{maxWidth: "80vw"}}
      />

      <div style={{borderBottom: "solid goldenrod 1px"}}>
        <div style={{ maxWidth: "400px" }}>
          <p style={{ textAlign: "center", margin: "16px 0px 4px 0px", fontWeight: "bold", color: "goldenrod" }}>Last Game</p>
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
                <td>{lastGame.homeTeam.name}</td>
                <td style={{ textAlign: "center" }}>{lastGame.homeGoals}</td>
              </tr>
              <tr>
                <td>{lastGame.awayTeam.name}</td>
                <td style={{ textAlign: "center" }}>{lastGame.awayGoals}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

    </>)
}