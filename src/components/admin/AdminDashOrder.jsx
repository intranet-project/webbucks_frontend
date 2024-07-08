import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashOrder = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    axios
      .get("http://localhost:8000/api/v1/b_order/list")
      .then((order) => {
        console.log(order);
        setApiData(order.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="dashboard-box">
        <div className="dashboard-title">
          <span>오더상태 현황</span>
        </div>

        <div
          style={{
            maxHeight: "275px",
            overflowY: "auto",
          }}
        >
          <table className="table-admin">
            <tbody>
              <tr>
                <th style={{ width: "10%" }}>순번</th>
                <th style={{ width: "15%" }}>주문번호</th>
                <th style={{ width: "35%" }}>메뉴명</th>
                <th style={{ width: "25%" }}>주문시간</th>
                <th style={{ width: "15%" }}>오더상태</th>
              </tr>
              {apiData.map((apiData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span>{apiData.b_orderId}</span>
                  </td>
                  <td>
                    <span>{apiData.menuName}</span>
                  </td>
                  <td>
                    <span>{apiData.b_orderCreatedAt}</span>
                  </td>
                  <td>
                    <span>{apiData.b_orderState}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashOrder;
