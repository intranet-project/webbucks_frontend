import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "../common/ModalForm";

const AdminOrder = () => {
  const [apiData, setApiData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const openModal = (menuData) => {
    setSelectedData(menuData);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData({});
  };

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
        setSelectedData(order.data);
        getApi();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>순번</th>
            <th>주문번호</th>
            <th>메뉴명</th>
            <th>고객ID</th>
            <th>주문시간</th>
            <th>상태변경시간</th>
            <th>오더상태</th>
          </tr>
          {apiData.map((apiData, index) => (
            <tr key={index} onClick={() => openModal(apiData)}>
              <td>{index + 1}</td>
              <td>
                <span>{apiData.b_orderId}</span>
              </td>
              <td>
                <span>{apiData.menuName}</span>
              </td>
              <td>
                <span>{apiData.custId}</span>
              </td>
              <td>
                <span>{apiData.b_orderCreatedAt}</span>
              </td>
              <td>
                <span>{apiData.b_orderStateUpdateAt}</span>
              </td>
              <td>
                <span>{apiData.b_orderState}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalForm isOpen={isModalOpen} closeModal={closeModal}>
        <span>{`주문번호: ${selectedData.b_orderId}, `}</span>
        <br />
        <span>{`고객ID : ${selectedData.custId}`}</span>
        <br />
        <span>{`메뉴 : ${selectedData.menuName}`}</span>
        <br />
        <span>{`주문시간 : ${selectedData.b_orderCreatedAt}`}</span>
        <br />
        <span>{` 오더상태 : ${selectedData.b_orderState}`}</span>
        <br />
        <button onClick={() => updateApi(selectedData.b_orderStatusId, "대기")}>
          대기
        </button>
        <button
          onClick={() => updateApi(selectedData.b_orderStatusId, "준비중")}
        >
          준비중
        </button>
        <button onClick={() => updateApi(selectedData.b_orderStatusId, "완료")}>
          완료
        </button>
        <button onClick={() => updateApi(selectedData.b_orderStatusId, "취소")}>
          취소
        </button>
        <br />
      </ModalForm>
    </div>
  );
};

export default AdminOrder;
