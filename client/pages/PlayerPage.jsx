import {useParams} from "react-router-dom"
import { useEffect, useState } from "react"

import {getPlayer} from '../utils/queries.js';

export default function PlayerPage(){

  const params = useParams()

  const [player, setPlayer] = useState()


  async function getPlayerFromQuery() {
    const playerInfo = await getPlayer(params.playerid)
    console.log(playerInfo)
  }


  useEffect(() => {
    getPlayerFromQuery()
  }, [])

  if (player === null) return <></>

  return (
    <>
      <h2>This Page is Currently Being Built</h2>
      <p>This will show the stats for the player with the database id of: {params.playerid}</p>
    </>
  )
}