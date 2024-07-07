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
      <table className="table-admin sel">
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
        <div className="modal-header">
          <p className="text-title">오더 상세</p>
        </div>

        <div className="modal-body">
          <div className="div-radius">
            <table>
              <tbody>
                <tr>
                  <th style={{ width: "15%" }}>
                    <span>주문번호</span>
                  </th>
                  <th style={{ width: "30%" }}>
                    <span>메뉴</span>
                  </th>
                  <th style={{ width: "25%" }}>
                    <span>주문시간</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span>고객ID</span>
                  </th>
                  <th style={{ width: "15%" }}>
                    <span>오더상태</span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <span>{selectedData.b_orderId}</span>
                  </td>
                  <td>
                    <span>{selectedData.menuName}</span>
                  </td>
                  <td>
                    <span>{selectedData.b_orderCreatedAt}</span>
                  </td>
                  <td>
                    <span>{selectedData.custId}</span>
                  </td>
                  <td>
                    <span>{selectedData.b_orderState}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="btn-admin"
            onClick={() => updateApi(selectedData.b_orderStatusId, "준비중")}
          >
            메뉴 준비
          </button>
          <button
            className="btn-admin"
            onClick={() => updateApi(selectedData.b_orderStatusId, "완료")}
          >
            주문 완료
          </button>
          <button
            className="btn-admin"
            onClick={() => updateApi(selectedData.b_orderStatusId, "취소")}
          >
            오더 취소
          </button>
        </div>
      </ModalForm>
    </div>
  );
};

export default AdminOrder;
