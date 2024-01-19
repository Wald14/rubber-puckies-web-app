import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';



export default function PlayerPageStats({ player }) {




  // useEffect(() => {

  // }, [])

  if (!player) return <></>

  return (
    <>
      <h4 style={{margin: "20px"}}>Player Splits are under construction. Come back later!</h4>
    </>
  )
}