import { useEffect, useState } from "react"

import { TeamHistoryBySeason, TeamHistorySplits } from '../components';

import { LoadingSpinner } from "../components";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../assets/css/buttons.css'

export default function TeamHistory() {


  const [selectedSplit, setSelectedSplit] = useState()
  const [teamInfo, setTeamInfo] = useState()

  const handleChange = (e) => { setSelectedSplit(e.target.name) }

  async function getRegSeaInfo() {
    const query = await fetch("/api/teamHistory/Rubber Puckies");
    const result = await query.json();
    setTeamInfo(result);
  }

  useEffect(() => {
    setSelectedSplit("bySeason")
  }, [])

  useEffect(() => {
    getRegSeaInfo()
  }, [])

  
  if (teamInfo === null || teamInfo === undefined) return (<LoadingSpinner />)

  return (
    <>
      <Container style={{marginBottom: '16px', padding: '0px'}}>
        <div style={{
          borderBottom: "solid gold 1px",
          paddingBottom: "2px",
          marginTop: "16px",
          display: 'flex',
          flexDirection: 'row'
        }}
        >
          <div style={{ padding: '0px 16px' }}>
            <a
              name="bySeason"
              className={`headerBtnA ${selectedSplit === "bySeason" ? 'selected' : ''}`}
              onClick={handleChange}
            >
              By Season
            </a>
          </div>
          <div>
            <a
              name="splits"
              className={`headerBtnA ${selectedSplit === "splits" ? 'selected' : ''}`}
              onClick={handleChange}
            >
              Splits
            </a>
          </div>
        </div>
      </Container>
      {selectedSplit === 'bySeason' &&
        <TeamHistoryBySeason payload={teamInfo.payload}/>
      }
      {selectedSplit === 'splits' &&
        <TeamHistorySplits splits={teamInfo.splits}/>
      }
    </>
  )
}