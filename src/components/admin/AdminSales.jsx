import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSales = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    axios
      .get("http://localhost:8000/api/v1//sales/list")
      .then((sales) => {
        console.log(sales);
        setApiData(sales.data);
      })
      .catch((error) => console.log(error));
  };

  // const updateApi = (menuId, stateData) => {
  //   axios
  //     .put(`http://localhost:8000/api/v1/menu/soldout/${menuId}`, {
  //       ...apiData.find((menu) => menu.menuId === menuId),
  //       soldoutState: stateData,
  //     })
  //     .then((menu) => {
  //       console.log(menu);
  //       getApi();
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      {apiData.map((apiData, index) => (
        <div key={index}>
          <span>{`${index + 1}. 주문번호: ${apiData.orderId}, `}</span>
          <span>{` 주문날짜 : ${apiData.orderCreatedAt}`}</span>
          <span>{` 사용 포인트 : ${apiData.orderPointsUsed}`}</span>
          <span>{` 카테고리 : ${apiData.categoryname}`}</span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AdminSales;
