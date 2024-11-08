import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./index.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

function Total() {
  const [roleCount, setCount] = useState({ customer: 0, staff: 0 });

  const fetchData = async () => {
    try {
      const response = await axios.get("https://6692a166346eeafcf46da14d.mockapi.io/account");

      const count = response.data.reduce(
        (acc, user) => {
          if (user.role === "customer") {
            acc.customer += 1;
          } else if (user.role === "staff") {
            acc.staff += 1;
          }
          return acc;
        },
        { customer: 0, staff: 0 }
      );

      console.log("staff: ", count.staff);
      console.log("cus: ", count.customer);
      setCount(count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: ["Customer", "Staff"],
    datasets: [
      {
        data: [roleCount.customer, roleCount.staff],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allow the chart to resize based on container dimensions
  };

  return (
    <div className="pie">
      <h2>total account</h2>
      <Pie data={data} options={options} className="pie_chart" />
    </div>
  );
}

export default Total;
