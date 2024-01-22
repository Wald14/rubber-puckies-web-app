import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import '../assets/css/buttons.css'


export default function PlayerPage() {

  const [playerList, setPlayerList] = useState()


  // async function getPlayerFromQuery() {
  //   const players = await getAllPlayers(params.playerid)
  //   setPlayerList(players)
  // }


  useEffect(() => {
    // getPlayerFromQuery()
  }, [])

  if (!player) return <></>

  return (
    <>
      
    </>
  )
}