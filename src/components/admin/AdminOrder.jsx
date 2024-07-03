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
      {apiData.map((apiData, index) => (
        <div key={index}>
          <span
            onClick={() => openModal(apiData)}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
          >{`${index + 1}.주문번호: ${apiData.b_orderId}, `}</span>
          <span>{` 고객ID : ${apiData.custId}`}</span>
          <span>{` 메뉴 : ${apiData.menuName}`}</span>
          <span>{` 주문시간 : ${apiData.b_orderCreatedAt}`}</span>
          <span>{` 완료시간 : ${apiData.b_orderStateUpdateAt}`}</span>
          <span>{` 오더상태 : ${apiData.b_orderState}`}</span>
          <br />
          <button onClick={() => updateApi(apiData.b_orderStatusId, "대기")}>
            대기
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "준비중")}>
            준비중
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "완료")}>
            완료
          </button>
          <button onClick={() => updateApi(apiData.b_orderStatusId, "취소")}>
            취소
          </button>
          <br />
        </div>
      ))}

      <ModalForm isOpen={isModalOpen} closeModal={closeModal}>
        <span>{`주문번호: ${selectedData.b_orderId}, `}</span>
        <br />
        <span>{`고객ID : ${selectedData.custId}`}</span>
        <br />
        <span>{`메뉴 : ${selectedData.menuName}`}</span>
        <br />
        <span>{`주문시간 : ${selectedData.b_orderCreatedAt}`}</span>
        <br />
        <span>{`완료시간 : ${selectedData.b_orderStateUpdateAt}`}</span>
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
        <button onClick={closeModal}>닫기</button>
      </ModalForm>
    </div>
  );
};

export default AdminOrder;
