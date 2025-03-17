import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Env from "../../data/Env";

// Registering necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoldFuturesChart = ({ goldDetails }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldData = async () => {
      try {
        const dateKeys = Object.keys(goldDetails.open_prices["GC=F"]);
        const openPrices = Object.values(goldDetails.open_prices["GC=F"]);

        // Extract last 60 open prices and their corresponding dates
        const last60Prices = openPrices.slice(-60);
        const last60Dates = dateKeys.slice(-60);

        // API call to predict next 30 days of gold prices
        const predictionResponse = await axios.post(
          `${Env.BACKEND}/predict_future_prices`,
          {
            last_prices: last60Prices,
            future_days: 40,
          }
        );

        const futurePrices = predictionResponse.data.predicted_prices;

        // Generate future dates (continuing from last known date)
        const futureDates = [];
        let lastDate = new Date(last60Dates[last60Dates.length - 1]);

        for (let i = 1; i <= 40; i++) {
          lastDate.setDate(lastDate.getDate() + 1);
          futureDates.push(lastDate.toISOString().split("T")[0]);
        }

        // Merge past and future data
        console.log(last60Dates)
        const formattedLast60Dates = last60Dates.map(date => date.split("T")[0]);
        const allDates = [...formattedLast60Dates, ...futureDates];
        const pastPrices = [...last60Prices, ...new Array(30).fill(null)];
        const predictedPrices = [...new Array(60).fill(null), ...futurePrices];

        // Prepare chart data
        setChartData({
          labels: allDates,
          datasets: [
            {
              label: "Past Gold Open Prices (USD)",
              data: pastPrices,
              backgroundColor: "#f2c511",
              borderColor: "#ffe270",
              borderWidth: 1,
            },
            {
              label: "Predicted Gold Open Prices (USD)",
              data: predictedPrices,
              backgroundColor: "#800080",
              borderColor: "#c71585",
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching gold data:", error);
      }
    };

    fetchGoldData();
  }, [goldDetails]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
        },
      },
      title: {
        display: true,
        text: "Gold Price Predictions",
        color: "#333",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
        title: {
          display: true,
          text: "Dates",
          color: "#333",
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
        title: {
          display: true,
          text: "Gold Price (USD)",
          color: "#333",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="chart" style={{width:'100%'}}>
      <div className="cardHeader">
        <h2>Gold Price Predictions</h2>
        <a href="#" className="btn">View All</a>
      </div>
      <div className="chartContainer">
        {loading ?  
        <img 
            src={`${process.env.PUBLIC_URL}/images/loader.gif`} 
            className="blog-image" 
            style={{ 
            width: "250px", 
            height: "250px", 
            objectFit: "contain", 
            display: "block", 
            margin: "auto" 
            }} 
        />
        : <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default GoldFuturesChart;
