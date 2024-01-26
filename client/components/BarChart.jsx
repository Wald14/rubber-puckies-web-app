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
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ chartTitle, data, stepSize }) {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
        color: "goldenrod"
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: stepSize ? stepSize : 1
        }
      }
    }
  };

  if (!chartTitle || !data) return <></>

  return (
      <Bar options={options} data={data} style={{height: "300px"}}/>
  )
}