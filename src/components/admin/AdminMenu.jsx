import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "../common/ModalForm";

const AdminMenu = () => {
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
      .get("http://localhost:8000/api/v1/menu/list")
      .then((menu) => {
        console.log(menu);
        setApiData(menu.data);
      })
      .catch((error) => console.log(error));
  };

  const updateApi = (menuId, stateData) => {
    axios
      .put(`http://localhost:8000/api/v1/menu/soldout/${menuId}`, {
        ...apiData.find((menu) => menu.menuId === menuId),
        soldoutState: stateData,
      })
      .then((menu) => {
        console.log(menu);
        setSelectedData(menu.data);
        getApi();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <p className="text-title">메뉴 관리</p>
      <table className="table-admin sel">
        <tbody>
          <tr>
            <th style={{ width: "10%" }}>순번</th>
            <th style={{ width: "15%" }}>메뉴이미지</th>
            <th style={{ width: "30%" }}>메뉴명</th>
            <th style={{ width: "15%" }}>가격</th>
            <th style={{ width: "15%" }}>카테고리</th>
            <th style={{ width: "15%" }}>품절여부</th>
          </tr>
          {apiData.map((apiData, index) => (
            <tr key={index} onClick={() => openModal(apiData)}>
              <td>{index + 1}</td>
              <td className="menu-img">
                <img
                  src={process.env.PUBLIC_URL + apiData.menuImg}
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>
                <span>{apiData.menuName}</span>
              </td>
              <td>
                <span>{apiData.menuPrice}</span>
              </td>
              <td>
                <span>{apiData.categoryname}</span>
              </td>
              <td>
                <span>{apiData.soldoutState}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalForm isOpen={isModalOpen} closeModal={closeModal}>
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-title">메뉴 상세</p>
          </div>
          <div className="modal-body menu">
            <table>
              <tbody>
                <tr>
                  <td className="menu-img" rowSpan={5} style={{ width: "35%" }}>
                    <img
                      src={process.env.PUBLIC_URL + selectedData.menuImg}
                      alt={selectedData.menuName}
                    />
                  </td>
                  <th style={{ width: "15%", height: "15%" }}>
                    <span>메뉴명</span>
                  </th>
                  <td style={{ width: "50%" }}>
                    <span>{selectedData.menuName}</span>
                  </td>
                </tr>
                <tr>
                  <th style={{ height: "40%" }}>메뉴설명</th>
                  <td style={{ textAlign: "left" }}>
                    <span>{selectedData.menuDetail}</span>
                  </td>
                </tr>
                <tr>
                  <th style={{ height: "15%" }}>
                    <span>가격</span>
                  </th>
                  <td>
                    <span>{selectedData.menuPrice}</span>
                  </td>
                </tr>
                <tr>
                  <th style={{ height: "15%" }}>
                    <span>카테고리</span>
                  </th>
                  <td>
                    <span>{selectedData.categoryname}</span>
                  </td>
                </tr>
                <tr>
                  <th style={{ height: "15%" }}>
                    <span>품절여부</span>
                  </th>
                  <td>
                    <span>{selectedData.soldoutState}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="btn-admin"
              onClick={() => updateApi(selectedData.menuId, "Y")}
            >
              품절
            </button>
            <button
              className="btn-admin"
              onClick={() => updateApi(selectedData.menuId, "N")}
            >
              품절취소
            </button>
          </div>
        </div>
      </ModalForm>
    </div>
  );
};

export default AdminMenu;
