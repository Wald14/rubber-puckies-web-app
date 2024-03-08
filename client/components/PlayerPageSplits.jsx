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

    player.statsBySeason.forEach((season) => {
      season.seasonStats.games.forEach((game) => {
        if (game.played) {
          // Home/Away Split
          game.homeOrAway === "home" ? homeAway.home.gp++ : homeAway.away.gp++
          game.homeOrAway === "home" ? homeAway.home.goals += game.playerGoals : homeAway.away.goals += game.playerGoals
          game.homeOrAway === "home" ? homeAway.home.hats += game.playerHat : homeAway.away.hats += game.playerHat
          game.homeOrAway === "home" ? homeAway.home.teamGoals += game.homeGoals : homeAway.away.teamGoals += game.awayGoals
        }
      })
    })
    console.log(homeAway)
    setSplits({
      homeAway: homeAway
    })
  }

  useEffect(() => {
    determineSplits()
  }, [])

  if (!player || !splits) return <></>

  return (
    <>
        <Table style={{marginTop: "25px", textAlign: "center"}}>
          <caption>TG%/GP = Percentage of team goals scored by the player that the player played in / games played by the player. This shows the percentage of goals that come from this player when they play.</caption>
          <thead>
            <tr>
              <th className="bg-info" style={{color: "black", borderRadius: "10px 0px 0px 0px"}}>Home/Away</th>
              <th className="bg-info" style={{color: "black"}}>GP</th>
              <th className="bg-info" style={{color: "black"}}>G</th>
              <th className="bg-info" style={{color: "black"}}>G/GP</th>
              <th className="bg-info" style={{color: "black"}}>HAT</th>
              <th className="bg-info" style={{color: "black", borderRadius: "0px 10px 0px 0px"}}>TG/GP%</th>
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
    </>
  )
}