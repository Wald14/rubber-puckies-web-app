import captializeString from '../utils/stringAdjustments.js';
import { BarChart } from '../components';

import Col from 'react-bootstrap/Col';

export default function GoalieChart({ seasonStats }) {

  const goalsAgainstData = {
    labels: seasonStats.map((season) => `${captializeString(season.seasonStats.seasonInfo.seasonType)} ${new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}`),
    datasets: [
      {
        data: seasonStats.map((season) => `${season.seasonStats.totals.goalie.gp ? (season.seasonStats.totals.goalie.ga / season.seasonStats.totals.goalie.gp.toFixed(2)) : (0.00).toFixed(2)}`),
        backgroundColor: 'goldenrod',
      }
    ]
  }

  const winPercentData = {
    labels: seasonStats.map((season) => `${captializeString(season.seasonStats.seasonInfo.seasonType)} ${new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}`),
    datasets: [
      {
        data: seasonStats.map((season) => `${season.seasonStats.totals.goalie.gp ? (season.seasonStats.totals.goalie.wins / season.seasonStats.totals.goalie.gp.toFixed(2)) : (0.00).toFixed(2)}`),
        backgroundColor: 'goldenrod',
      }
    ]
  }

  if (!seasonStats) return <></>

  return (
    <>
      <Col sm={12} md={6}>
        <BarChart
          chartTitle="Goals Against Average Per Season"
          data={goalsAgainstData}
        />
      </Col>
      <Col sm={12} md={6}>
        <BarChart
          chartTitle="Win% per Season"
          data={winPercentData}
        />
      </Col>
    </>
  )
}