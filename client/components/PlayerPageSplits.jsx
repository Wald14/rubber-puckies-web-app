import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';



export default function PlayerPageStats({ player }) {
  console.log(player)

  const [splits, setSplits] = useState()


  function determineSplits() {
    const homeAway = {
      home: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      away: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      }
    }

    const seasonType = {
      winter: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      spring: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      summer: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      fall: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      }
    }

    player.statsBySeason.forEach((season) => {
      season.seasonStats.games.forEach((game) => {
        if (game.played && game.gameType === "regular") {
          // Home/Away Split
          game.homeOrAway === "home" ? homeAway.home.gp++ : homeAway.away.gp++
          game.homeOrAway === "home" ? homeAway.home.goals += game.playerGoals : homeAway.away.goals += game.playerGoals
          game.homeOrAway === "home" ? homeAway.home.hats += game.playerHat : homeAway.away.hats += game.playerHat
          game.homeOrAway === "home" ? homeAway.home.teamGoals += game.homeGoals : homeAway.away.teamGoals += game.awayGoals
          // Season Type
          switch (season.seasonStats.seasonInfo.seasonType) {
            case "winter":
              game.homeOrAway === "home" ? seasonType.winter.gp++ : seasonType.winter.gp++
              game.homeOrAway === "home" ? seasonType.winter.goals += game.playerGoals : seasonType.winter.goals += game.playerGoals
              game.homeOrAway === "home" ? seasonType.winter.hats += game.playerHat : seasonType.winter.hats += game.playerHat
              game.homeOrAway === "home" ? seasonType.winter.teamGoals += game.homeGoals : seasonType.winter.teamGoals += game.awayGoals
              break;
            case "spring":
              game.homeOrAway === "home" ? seasonType.spring.gp++ : seasonType.spring.gp++
              game.homeOrAway === "home" ? seasonType.spring.goals += game.playerGoals : seasonType.spring.goals += game.playerGoals
              game.homeOrAway === "home" ? seasonType.spring.hats += game.playerHat : seasonType.spring.hats += game.playerHat
              game.homeOrAway === "home" ? seasonType.spring.teamGoals += game.homeGoals : seasonType.spring.teamGoals += game.awayGoals
              break;
            case "summer":
              game.homeOrAway === "home" ? seasonType.summer.gp++ : seasonType.summer.gp++
              game.homeOrAway === "home" ? seasonType.summer.goals += game.playerGoals : seasonType.summer.goals += game.playerGoals
              game.homeOrAway === "home" ? seasonType.summer.hats += game.playerHat : seasonType.summer.hats += game.playerHat
              game.homeOrAway === "home" ? seasonType.summer.teamGoals += game.homeGoals : seasonType.summer.teamGoals += game.awayGoals
              break;
            case "fall":
              game.homeOrAway === "home" ? seasonType.fall.gp++ : seasonType.fall.gp++
              game.homeOrAway === "home" ? seasonType.fall.goals += game.playerGoals : seasonType.fall.goals += game.playerGoals
              game.homeOrAway === "home" ? seasonType.fall.hats += game.playerHat : seasonType.fall.hats += game.playerHat
              game.homeOrAway === "home" ? seasonType.fall.teamGoals += game.homeGoals : seasonType.fall.teamGoals += game.awayGoals
              break;
          }
        }
      })
    })
    console.log({
      homeAway: homeAway,
      seasonType: seasonType
    })
    setSplits({
      homeAway: homeAway,
      seasonType: seasonType
    })
  }

  useEffect(() => {
    determineSplits()
  }, [])

  if (!player || !splits) return <></>

  return (
    <>
      {/* HOME VS AWAY */}
      <Table style={{ marginTop: "25px", textAlign: "center" }}>
        <thead>
          <tr>
            <th className="bg-info" style={{ color: "black", borderRadius: "10px 0px 0px 0px" }}>Home/Away</th>
            <th className="bg-info" style={{ color: "black" }}>GP</th>
            <th className="bg-info" style={{ color: "black" }}>G</th>
            <th className="bg-info" style={{ color: "black" }}>G/GP</th>
            <th className="bg-info" style={{ color: "black" }}>HAT</th>
            <th className="bg-info" style={{ color: "black", borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Home</td>
            <td>{splits.homeAway.home.gp}</td>
            <td>{splits.homeAway.home.goals}</td>
            <td>{splits.homeAway.home.gp ? (splits.homeAway.home.goals / splits.homeAway.home.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.homeAway.home.hats}</td>
            <td>{splits.homeAway.home.gp ? (splits.homeAway.home.goals / splits.homeAway.home.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Away</td>
            <td>{splits.homeAway.away.gp}</td>
            <td>{splits.homeAway.away.goals}</td>
            <td>{splits.homeAway.away.gp ? (splits.homeAway.away.goals / splits.homeAway.away.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.homeAway.away.hats}</td>
            <td>{splits.homeAway.away.gp ? (splits.homeAway.away.goals / splits.homeAway.away.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>

      {/* SEASON TYPE */}
      <Table style={{ marginTop: "25px", textAlign: "center" }}>
        <caption>TG%/GP = Percentage of team goals scored by the player when they're in the lineup.</caption>
        <thead>
          <tr>
            <th className="bg-primary" style={{ color: "black", borderRadius: "10px 0px 0px 0px" }}>Season Type</th>
            <th className="bg-primary" style={{ color: "black" }}>GP</th>
            <th className="bg-primary" style={{ color: "black" }}>G</th>
            <th className="bg-primary" style={{ color: "black" }}>G/GP</th>
            <th className="bg-primary" style={{ color: "black" }}>HAT</th>
            <th className="bg-primary" style={{ color: "black", borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{color: "deepskyblue"}}>Winter</td>
            <td>{splits.seasonType.winter.gp}</td>
            <td>{splits.seasonType.winter.goals}</td>
            <td>{splits.seasonType.winter.gp ? (splits.seasonType.winter.goals / splits.seasonType.winter.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.seasonType.winter.hats}</td>
            <td>{splits.seasonType.winter.gp ? (splits.seasonType.winter.goals / splits.seasonType.winter.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{color: "limegreen"}}>Spring</td>
            <td>{splits.seasonType.spring.gp}</td>
            <td>{splits.seasonType.spring.goals}</td>
            <td>{splits.seasonType.spring.gp ? (splits.seasonType.spring.goals / splits.seasonType.spring.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.seasonType.spring.hats}</td>
            <td>{splits.seasonType.spring.gp ? (splits.seasonType.spring.goals / splits.seasonType.spring.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{color: "yellow"}}>Summer</td>
            <td>{splits.seasonType.summer.gp}</td>
            <td>{splits.seasonType.summer.goals}</td>
            <td>{splits.seasonType.summer.gp ? (splits.seasonType.summer.goals / splits.seasonType.summer.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.seasonType.summer.hats}</td>
            <td>{splits.seasonType.summer.gp ? (splits.seasonType.summer.goals / splits.seasonType.summer.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{color: "orange"}}>Fall</td>
            <td>{splits.seasonType.fall.gp}</td>
            <td>{splits.seasonType.fall.goals}</td>
            <td>{splits.seasonType.fall.gp ? (splits.seasonType.fall.goals / splits.seasonType.fall.gp).toFixed(2) : (0).toFixed(2)}</td>
            <td>{splits.seasonType.fall.hats}</td>
            <td>{splits.seasonType.fall.gp ? (splits.seasonType.fall.goals / splits.seasonType.fall.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}