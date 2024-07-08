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

const AdminChart = () => {
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
      const category = item.categoryname.includes("커피")
        ? "커피"
        : item.categoryname.includes("디카페인")
        ? "디카페인"
        : item.categoryname.includes("음료")
        ? "음료"
        : item.categoryname.includes("푸드")
        ? "푸드"
        : item.categoryname.includes("이벤트")
        ? "이벤트"
        : null;

      if (!monthMap[month]) {
        monthMap[month] = {
          커피: 0,
          디카페인: 0,
          음료: 0,
          푸드: 0,
          이벤트: 0,
          전체: 0,
        };
      }

      if (category) {
        monthMap[month][category] += item.orderPointsUsed;
        monthMap[month]["전체"] += item.orderPointsUsed;
      }
    });

    // 월별 데이터를 배열로 변환
    const formattedData = [];
    for (let i = 1; i <= 12; i++) {
      formattedData.push({
        name: `${i}월`,
        커피: monthMap[i]?.커피 || 0,
        디카페인: monthMap[i]?.디카페인 || 0,
        음료: monthMap[i]?.음료 || 0,
        푸드: monthMap[i]?.푸드 || 0,
        이벤트: monthMap[i]?.이벤트 || 0,
        전체: monthMap[i]?.전체 || 0,
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

        <LineChart width={550} height={290} data={monthlyData} fontSize={14}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            padding={{ left: 40, right: 40 }}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="커피" stroke="#f19224" />
          <Line type="monotone" dataKey="디카페인" stroke="#a57020" />
          <Line type="monotone" dataKey="음료" stroke="#21e06a" />
          <Line type="monotone" dataKey="푸드" stroke="#3250d6" />
          <Line type="monotone" dataKey="이벤트" stroke="#e44177" />
          <Line
            type="monotone"
            dataKey="전체"
            stroke="#cccf22"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default AdminChart;
