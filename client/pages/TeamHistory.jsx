import { useEffect, useState } from "react"

import { TeamHistoryBySeason } from '../components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../assets/css/buttons.css'

export default function TeamHistory() {


  const [selectedSplit, setSelectedSplit] = useState()

  const handleChange = (e) => { setSelectedSplit(e.target.name) }

  useEffect(() => {
    setSelectedSplit("bySeason")
  }, [])

  return (
    <>
      <Container>
        <div style={{
          borderBottom: "solid gold 1px",
          paddingBottom: "2px",
          marginTop: "16px",
          display: 'flex',
          flexDirection: 'row'
        }}
        >
          <div style={{ paddingRight: '16px' }}>
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
        <TeamHistoryBySeason />
      }
    </>
  )
}