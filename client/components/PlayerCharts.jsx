import captializeString from '../utils/stringAdjustments.js';
import { BarChart } from '../components';

import Col from 'react-bootstrap/Col';

export default function PlayerCharts({ seasonStats }) {

  const goalsScoredData = {
    labels: seasonStats.map((season) => `${captializeString(season.seasonStats.seasonInfo.seasonType)} ${new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}`),
    datasets: [
      {
        data: seasonStats.map((season) => `${season.seasonStats.totals.g}`),
        backgroundColor: 'goldenrod',
      }
    ]
  }

  const goalsPerGameData = {
    labels: seasonStats.map((season) => `${captializeString(season.seasonStats.seasonInfo.seasonType)} ${new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}`),
    datasets: [
      {
        data: seasonStats.map((season) => `${(season.seasonStats.totals.g / season.seasonStats.totals.gp).toFixed(2)}`),
        backgroundColor: 'goldenrod',
      }
    ]
  }

  if (!seasonStats) return <></>

  return (
    <>
      <Col sm={12} md={6}>
        <BarChart
          chartTitle="Goals"
          data={goalsScoredData}
        />
      </Col>
      <Col sm={12} md={6}>
        <BarChart
          chartTitle="Goals Per Game Played"
          data={goalsPerGameData}
          stepSize={0.5}
        />
      </Col>
    </>
  )
}