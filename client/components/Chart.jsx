import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { getPlayer } from '../utils/queries.js';
import captializeString from '../utils/stringAdjustments.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar} from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ seasonStats }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Goals Per Season',
        color: "goldenrod"
      },
    },
  };


  const fakeData = [{
    season: "Winter 2021",
    goals: '5'
  },{
    season: "Spring 2021",
    goals: '3'
  },{
    season: "Summer 2021",
    goals: '9'
  },{
    season: "Fall 2021",
    goals: '1'
  }]


  // const data = {
  //   labels: fakeData.map((season) => season.season),
  //   datasets: [
  //     {
  //       data: fakeData.map((season) => season.goals),
  //       backgroundColor: 'goldenrod',
  //     },
  //   ],
  // };
  // console.log(seasonStats)

  const data = {
    labels: seasonStats.map((season) => `${captializeString(season.seasonStats.seasonInfo.seasonType)} ${new Date(season.seasonStats.seasonInfo.startDate).getFullYear()}`),
    datasets: [
      {
        data: seasonStats.map((season) => `${season.seasonStats.totals.g}`),
        backgroundColor: 'goldenrod',
      }
    ]
  }
  // console.log("Data: ", data)



  if (!seasonStats) return <></>

  return (
        <Bar
          options={options}
          data={data}
        />
  )
}