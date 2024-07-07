import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = [
//   { name: "1월", coffee: 4000, juice: 2400, food: 2400 },
//   { name: "2월", coffee: 3000, juice: 1398, food: 2210 },
//   { name: "3월", coffee: 2000, juice: 9800, food: 2290 },
//   { name: "4월", coffee: 2780, juice: 3908, food: 2000 },
//   { name: "5월", coffee: 1890, juice: 4800, food: 2181 },
//   { name: "6월", coffee: 2390, juice: 3800, food: 2500 },
//   { name: "7월", coffee: 3490, juice: 4300, food: 2100 },
//   { name: "8월", coffee: 4000, juice: 2400, food: 2400 },
//   { name: "9월", coffee: 3000, juice: 1398, food: 2210 },
//   { name: "10월", coffee: 2000, juice: 9800, food: 2290 },
//   { name: "11월", coffee: 2780, juice: 3908, food: 2000 },
//   { name: "12월", coffee: 1890, juice: 4800, food: 2181 },
// ];

const AdminChart = ({ data }) => {
  const [apiData, setApiData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    axios
      .get("http://localhost:8000/api/v1/sales/listOrder")
      .then((order) => {
        console.log(order);
        setApiData(order.data);
        const formattedData = formatDataByMonth(order.data);
        console.log(formattedData);
        setMonthlyData(formattedData);
      })
      .catch((error) => console.log(error));
  };

  const formatDataByMonth = (data) => {
    const monthMap = {};

    data.forEach((item) => {
      const orderDate = new Date(item.orderCreatedAt);
      const month = orderDate.getMonth() + 1; // 월을 1부터 시작하게 설정
      const category = item.categoryname.includes("coffee")
        ? "coffee"
        : item.categoryname.includes("juice")
        ? "juice"
        : item.categoryname.includes("food")
        ? "food"
        : null;

      if (!monthMap[month]) {
        monthMap[month] = { coffee: 0, juice: 0, food: 0, all: 0 };
      }

      if (category) {
        monthMap[month][category] += item.orderPointsUsed;
        monthMap[month]["all"] += item.orderPointsUsed;
      }
    });

    // 월별 데이터를 배열로 변환
    const formattedData = [];
    for (let i = 1; i <= 12; i++) {
      formattedData.push({
        name: `${i}월`,
        coffee: monthMap[i]?.coffee || 0,
        juice: monthMap[i]?.juice || 0,
        food: monthMap[i]?.food || 0,
        all: monthMap[i]?.all || 0,
      });
    }

    return formattedData;
  };

  return (
    <>
      <div className="dashboard-box">
        <div className="dashboard-title">
          <span>월별 매출 그래프</span>
        </div>

        <LineChart width={600} height={300} data={monthlyData} fontSize={14}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            padding={{ left: 40, right: 40 }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="coffee" stroke="#8884d8" />
          <Line type="monotone" dataKey="juice" stroke="#82ca9d" />
          <Line type="monotone" dataKey="food" stroke="#e642af" />
          <Line
            type="monotone"
            dataKey="all"
            stroke="#80961f"
            strokeWidth={2}
          />
        </LineChart>
      </div>
    </>
  );
};

export default AdminChart;
