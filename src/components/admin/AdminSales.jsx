import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSales = () => {
  const [apiData, setApiData] = useState([]);
  const [totalApiData, setTotalApiData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    getApi();
    getTotalSaleApi();
  }, []);

  const getTotalSaleApi = () => {
    axios
      .get("http://localhost:8000/api/v1/sales/list")
      .then((order) => {
        console.log(order);
        setTotalApiData(order.data);
      })
      .catch((error) => console.log(error));
  };

  const getApi = () => {
    axios
      .get("http://localhost:8000/api/v1/sales/listOrder")
      .then((order) => {
        console.log(order);
        setApiData(order.data);

        const formatMonthData = formatDataByMonth(order.data);
        setMonthData(formatMonthData);

        const formatDayData = formatDataByDay(order.data);
        setDayData(formatDayData);

        const formatYearData = formatDataByYear(order.data);
        setYearData(formatYearData);
      })
      .catch((error) => console.log(error));
  };

  const formatDataByMonth = (data) => {
    const monthMap = {};

    data.forEach((item) => {
      const orderDate = new Date(item.orderCreatedAt);

      const month = orderDate.getMonth() + 1; // 월을 1부터 시작하게 설정
      console.log("mon : ", month);
      if (!monthMap[month]) {
        monthMap[month] = {
          totalSales: 0,
        };
      }
      monthMap[month]["totalSales"] += item.orderPointsUsed;
    });

    // 월별 데이터를 배열로 변환
    const formattedData = [];
    for (let i = 1; i <= 12; i++) {
      formattedData.push({
        date: `${i}월`,
        totalSales: monthMap[i]?.totalSales || 0,
      });
    }

    return formattedData;
  };

  const formatDataByDay = (data) => {
    const dayMap = {};

    data.forEach((item) => {
      const orderDate = new Date(item.orderCreatedAt);
      const month = orderDate.getMonth() + 1; // 월을 1부터 시작하게 설정
      const day = orderDate.getDate(); // 일자를 1부터 31까지 가져오기
      const dayKey = `${month}월 ${day}일`; // 고유 키 생성

      if (!dayMap[dayKey]) {
        dayMap[dayKey] = {
          totalSales: 0,
        };
      }

      dayMap[dayKey]["totalSales"] += item.orderPointsUsed;
    });

    // 일별 데이터를 배열로 변환
    const formattedData = [];
    Object.keys(dayMap).forEach((key) => {
      formattedData.push({
        date: key,
        totalSales: dayMap[key].totalSales,
      });
    });

    return formattedData;
  };

  const formatDataByYear = (data) => {
    const yearMap = {};

    data.forEach((item) => {
      const orderDate = new Date(item.orderCreatedAt);
      const year = orderDate.getFullYear(); // 연도 추출

      if (!yearMap[year]) {
        yearMap[year] = {
          totalSales: 0,
        };
      }

      yearMap[year]["totalSales"] += item.orderPointsUsed;
    });

    // 연도별 데이터를 배열로 변환
    const formattedData = [];
    Object.keys(yearMap).forEach((key) => {
      formattedData.push({
        date: key,
        totalSales: yearMap[key].totalSales,
      });
    });

    return formattedData;
  };

  return (
    <div>
      <p className="text-title">매출 현황</p>

      <div style={{ textAlign: "left" }}>
        <h3>누적 매출</h3>
      </div>
      <table className="table-admin">
        <tbody>
          <tr>
            <th style={{ width: "10%" }}>순번</th>
            <th style={{ width: "90%" }}>사용 포인트</th>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <span>{totalApiData.saleTotalAmount}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div style={{ textAlign: "left" }}>
        <h3>연간 매출</h3>
      </div>
      <table className="table-admin">
        <tbody>
          <tr>
            <th style={{ width: "10%" }}>순번</th>
            <th style={{ width: "30%" }}>날짜</th>
            <th style={{ width: "60%" }}>사용 포인트</th>
          </tr>
          {yearData.map((yearData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <span>{yearData.date}</span>
              </td>
              <td>
                <span>{yearData.totalSales}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div style={{ textAlign: "left" }}>
        <h3>월간 매출</h3>
      </div>
      <table className="table-admin">
        <tbody>
          <tr>
            <th style={{ width: "10%" }}>순번</th>
            <th style={{ width: "30%" }}>날짜</th>
            <th style={{ width: "60%" }}>사용 포인트</th>
          </tr>
          {monthData.map((monthData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <span>{monthData.date}</span>
              </td>
              <td>
                <span>{monthData.totalSales}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <div style={{ textAlign: "left" }}>
        <h3>일간 매출</h3>
      </div>
      <table className="table-admin">
        <tbody>
          <tr>
            <th style={{ width: "10%" }}>순번</th>
            <th style={{ width: "30%" }}>날짜</th>
            <th style={{ width: "60%" }}>사용 포인트</th>
          </tr>
          {dayData.map((dayData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <span>{dayData.date}</span>
              </td>
              <td>
                <span>{dayData.totalSales}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSales;
