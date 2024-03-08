import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

// red f25f5c
// blue 53b3cb
// green 16DB65
// yellow ffe066
const tableColors = {
  homeAway: "#f25f5c",
  seasonType: "#53b3cb",
  startTime: "#16DB65",
  opponent: "#ffe066"
}


export default function PlayerPageStats({ player }) {
  // console.log(player)

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

    const startTime = {
      sixPM: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      sevenPM: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      eightPM: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      ninePM: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
      tenPM: {
        gp: 0,
        goals: 0,
        hats: 0,
        teamGoals: 0,
      },
    }

    const opponents = []

    player.statsBySeason.forEach((season) => {
      season.seasonStats.games.forEach((game) => {
        if (game.played && game.gameType === "regular") {
          //-------------------------
          // Home/Away Split
          //-------------------------
          game.homeOrAway === "home" ? homeAway.home.gp++ : homeAway.away.gp++
          game.homeOrAway === "home" ? homeAway.home.goals += game.playerGoals : homeAway.away.goals += game.playerGoals
          game.homeOrAway === "home" ? homeAway.home.hats += game.playerHat : homeAway.away.hats += game.playerHat
          game.homeOrAway === "home" ? homeAway.home.teamGoals += game.homeGoals : homeAway.away.teamGoals += game.awayGoals
          //-------------------------
          // Season Type
          //-------------------------
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
          //-------------------------
          // Start Time
          //-------------------------
          switch (new Date(game.startTime).getHours()) {
            case 18:
              game.homeOrAway === "home" ? startTime.sixPM.gp++ : startTime.sixPM.gp++
              game.homeOrAway === "home" ? startTime.sixPM.goals += game.playerGoals : startTime.sixPM.goals += game.playerGoals
              game.homeOrAway === "home" ? startTime.sixPM.hats += game.playerHat : startTime.sixPM.hats += game.playerHat
              game.homeOrAway === "home" ? startTime.sixPM.teamGoals += game.homeGoals : startTime.sixPM.teamGoals += game.awayGoals
              break;
            case 19:
              game.homeOrAway === "home" ? startTime.sevenPM.gp++ : startTime.sevenPM.gp++
              game.homeOrAway === "home" ? startTime.sevenPM.goals += game.playerGoals : startTime.sevenPM.goals += game.playerGoals
              game.homeOrAway === "home" ? startTime.sevenPM.hats += game.playerHat : startTime.sevenPM.hats += game.playerHat
              game.homeOrAway === "home" ? startTime.sevenPM.teamGoals += game.homeGoals : startTime.sevenPM.teamGoals += game.awayGoals
              break;
            case 20:
              game.homeOrAway === "home" ? startTime.eightPM.gp++ : startTime.eightPM.gp++
              game.homeOrAway === "home" ? startTime.eightPM.goals += game.playerGoals : startTime.eightPM.goals += game.playerGoals
              game.homeOrAway === "home" ? startTime.eightPM.hats += game.playerHat : startTime.eightPM.hats += game.playerHat
              game.homeOrAway === "home" ? startTime.eightPM.teamGoals += game.homeGoals : startTime.eightPM.teamGoals += game.awayGoals
              break;
            case 21:
              game.homeOrAway === "home" ? startTime.ninePM.gp++ : startTime.ninePM.gp++
              game.homeOrAway === "home" ? startTime.ninePM.goals += game.playerGoals : startTime.ninePM.goals += game.playerGoals
              game.homeOrAway === "home" ? startTime.ninePM.hats += game.playerHat : startTime.ninePM.hats += game.playerHat
              game.homeOrAway === "home" ? startTime.ninePM.teamGoals += game.homeGoals : startTime.ninePM.teamGoals += game.awayGoals
              break;
            case 22:
              game.homeOrAway === "home" ? startTime.tenPM.gp++ : startTime.tenPM.gp++
              game.homeOrAway === "home" ? startTime.tenPM.goals += game.playerGoals : startTime.tenPM.goals += game.playerGoals
              game.homeOrAway === "home" ? startTime.tenPM.hats += game.playerHat : startTime.tenPM.hats += game.playerHat
              game.homeOrAway === "home" ? startTime.tenPM.teamGoals += game.homeGoals : startTime.tenPM.teamGoals += game.awayGoals
              break;
          }
          //-------------------------
          // Opponent
          //-------------------------
          const idx = opponents.findIndex(obj => obj.opponent === game.opponent)
          if (idx === -1) {
            opponents.push({
              opponent: game.opponent,
              gp: 1,
              goals: game.playerGoals ? game.playerGoals : 0,
              hats: game.playerHats ? game.playerHats : 0,
              teamGoals: game.homeOrAway === "home" ? game.homeGoals : game.awayGoals,
            })
          } else {
            opponents[idx].gp++
            opponents[idx].goals += game.playerGoals
            game.playerHats ? opponents[idx].hats += game.playerHats : opponents[idx].hats
            opponents[idx].teamGoals += game.homeOrAway === "home" ? game.homeGoals : game.awayGoals
          }
        }
      })
    })
    console.log({
      homeAway: homeAway,
      seasonType: seasonType,
      startTime: startTime,
      opponents: opponents,
    })
    setSplits({
      homeAway: homeAway,
      seasonType: seasonType,
      startTime: startTime,
      opponents: opponents.sort(function (a, b) {
        const x = a.gp
        const y = b.gp
        return y - x;
      })
      ,
    })
  }

  useEffect(() => {
    determineSplits()
  }, [])

  if (!player || !splits) return <></>

  return (
    <Row>
      <Col>
        {/* HOME VS AWAY */}
        <Table style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway, borderRadius: "10px 0px 0px 0px" }}>Home/Away</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>G</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>G/GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway }}>HAT</th>
              <th style={{ color: "black", backgroundColor: tableColors.homeAway, borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
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
        <Table style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType, borderRadius: "10px 0px 0px 0px" }}>Season Type</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>G</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>G/GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType }}>HAT</th>
              <th style={{ color: "black", backgroundColor: tableColors.seasonType, borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "deepskyblue" }}>Winter</td>
              <td>{splits.seasonType.winter.gp}</td>
              <td>{splits.seasonType.winter.goals}</td>
              <td>{splits.seasonType.winter.gp ? (splits.seasonType.winter.goals / splits.seasonType.winter.gp).toFixed(2) : (0).toFixed(2)}</td>
              <td>{splits.seasonType.winter.hats}</td>
              <td>{splits.seasonType.winter.gp ? (splits.seasonType.winter.goals / splits.seasonType.winter.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ color: "limegreen" }}>Spring</td>
              <td>{splits.seasonType.spring.gp}</td>
              <td>{splits.seasonType.spring.goals}</td>
              <td>{splits.seasonType.spring.gp ? (splits.seasonType.spring.goals / splits.seasonType.spring.gp).toFixed(2) : (0).toFixed(2)}</td>
              <td>{splits.seasonType.spring.hats}</td>
              <td>{splits.seasonType.spring.gp ? (splits.seasonType.spring.goals / splits.seasonType.spring.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ color: "yellow" }}>Summer</td>
              <td>{splits.seasonType.summer.gp}</td>
              <td>{splits.seasonType.summer.goals}</td>
              <td>{splits.seasonType.summer.gp ? (splits.seasonType.summer.goals / splits.seasonType.summer.gp).toFixed(2) : (0).toFixed(2)}</td>
              <td>{splits.seasonType.summer.hats}</td>
              <td>{splits.seasonType.summer.gp ? (splits.seasonType.summer.goals / splits.seasonType.summer.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ color: "orange" }}>Fall</td>
              <td>{splits.seasonType.fall.gp}</td>
              <td>{splits.seasonType.fall.goals}</td>
              <td>{splits.seasonType.fall.gp ? (splits.seasonType.fall.goals / splits.seasonType.fall.gp).toFixed(2) : (0).toFixed(2)}</td>
              <td>{splits.seasonType.fall.hats}</td>
              <td>{splits.seasonType.fall.gp ? (splits.seasonType.fall.goals / splits.seasonType.fall.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>

        {/* Start Time */}
        <Table style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <caption>TG%/GP = Percentage of team goals scored by the player when they're in the lineup.</caption>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.startTime, borderRadius: "10px 0px 0px 0px" }}>Start Hour</th>
              <th style={{ color: "black", backgroundColor: tableColors.startTime }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.startTime }}>G</th>
              <th style={{ color: "black", backgroundColor: tableColors.startTime }}>G/GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.startTime }}>HAT</th>
              <th style={{ color: "black", backgroundColor: tableColors.startTime, borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
            </tr>
          </thead>
          <tbody>

            {splits.startTime.sixPM.gp > 0 &&
              <tr>
                <td>6pm</td>
                <td>{splits.startTime.sixPM.gp}</td>
                <td>{splits.startTime.sixPM.goals}</td>
                <td>{splits.startTime.sixPM.gp ? (splits.startTime.sixPM.goals / splits.startTime.sixPM.gp).toFixed(2) : (0).toFixed(2)}</td>
                <td>{splits.startTime.sixPM.hats}</td>
                <td>{splits.startTime.sixPM.gp ? (splits.startTime.sixPM.goals / splits.startTime.sixPM.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
              </tr>
            }

            {splits.startTime.sevenPM.gp > 0 &&
              <tr>
                <td>7pm</td>
                <td>{splits.startTime.sevenPM.gp}</td>
                <td>{splits.startTime.sevenPM.goals}</td>
                <td>{splits.startTime.sevenPM.gp ? (splits.startTime.sevenPM.goals / splits.startTime.sevenPM.gp).toFixed(2) : (0).toFixed(2)}</td>
                <td>{splits.startTime.sevenPM.hats}</td>
                <td>{splits.startTime.sevenPM.gp ? (splits.startTime.sevenPM.goals / splits.startTime.sevenPM.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
              </tr>
            }

            {splits.startTime.eightPM.gp > 0 &&
              <tr>
                <td>8pm</td>
                <td>{splits.startTime.eightPM.gp}</td>
                <td>{splits.startTime.eightPM.goals}</td>
                <td>{splits.startTime.eightPM.gp ? (splits.startTime.eightPM.goals / splits.startTime.eightPM.gp).toFixed(2) : (0).toFixed(2)}</td>
                <td>{splits.startTime.eightPM.hats}</td>
                <td>{splits.startTime.eightPM.gp ? (splits.startTime.eightPM.goals / splits.startTime.eightPM.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
              </tr>
            }
            {splits.startTime.ninePM.gp > 0 &&
              <tr>
                <td>9pm</td>
                <td>{splits.startTime.ninePM.gp}</td>
                <td>{splits.startTime.ninePM.goals}</td>
                <td>{splits.startTime.ninePM.gp ? (splits.startTime.ninePM.goals / splits.startTime.ninePM.gp).toFixed(2) : (0).toFixed(2)}</td>
                <td>{splits.startTime.ninePM.hats}</td>
                <td>{splits.startTime.ninePM.gp ? (splits.startTime.ninePM.goals / splits.startTime.ninePM.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
              </tr>
            }
            {splits.startTime.tenPM.gp > 0 &&
              <tr>
                <td>10pm</td>
                <td>{splits.startTime.tenPM.gp}</td>
                <td>{splits.startTime.tenPM.goals}</td>
                <td>{splits.startTime.tenPM.gp ? (splits.startTime.tenPM.goals / splits.startTime.tenPM.gp).toFixed(2) : (0).toFixed(2)}</td>
                <td>{splits.startTime.tenPM.hats}</td>
                <td>{splits.startTime.tenPM.gp ? (splits.startTime.tenPM.goals / splits.startTime.tenPM.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
              </tr>
            }
          </tbody>
        </Table>
      </Col>
      <Col>
        {/* Opponent */}
        <Table style={{ marginTop: "25px", textAlign: "center", maxWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ color: "black", backgroundColor: tableColors.opponent, borderRadius: "10px 0px 0px 0px" }}>Opponent</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>G</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>G/GP</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent }}>HAT</th>
              <th style={{ color: "black", backgroundColor: tableColors.opponent, borderRadius: "0px 10px 0px 0px" }}>TG/GP%</th>
            </tr>
          </thead>
          <tbody>
            {splits.opponents.map((opponent, index) => {
              return (
                <tr key={index}>
                  <td>{opponent.opponent}</td>
                  <td>{opponent.gp}</td>
                  <td>{opponent.goals}</td>
                  <td>{opponent.gp ? (opponent.goals / opponent.gp).toFixed(2) : (0).toFixed(2)}</td>
                  <td>{opponent.hats}</td>
                  <td>{opponent.gp ? (opponent.goals / opponent.teamGoals).toFixed(2) : (0).toFixed(2)}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Col>
    </Row>
  )
}