import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrder = () => {
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

  const updateApi = (b_orderStatusId, stateData) => {
    axios
      .put(
        `http://localhost:8000/api/v1/b_order/orderState/${b_orderStatusId}`,
        {
          ...apiData.find((order) => order.b_orderStatusId === b_orderStatusId),
          b_orderState: stateData,
        }
      )
      .then((order) => {
        console.log(order);
        getApi();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {apiData.map((apiData, index) => (
        <div key={index}>
          <span>{`${index + 1}.주문번호: ${apiData.b_orderId}, `}</span>
          <span>{` 고객ID : ${apiData.custId}`}</span>
          <span>{` 메뉴 : ${apiData.menuName}`}</span>
          <span>{` 주문시간 : ${apiData.b_orderCreatedAt}`}</span>
          <span>{` 완료시간 : ${apiData.b_orderStateUpdateAt}`}</span>
          <br />
          <span>{` 오더상태 : ${apiData.b_orderState}`}</span>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "대기")}>
            1
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "준비중")}>
            2
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "완료")}>
            3
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "취소")}>
            4
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrder;
