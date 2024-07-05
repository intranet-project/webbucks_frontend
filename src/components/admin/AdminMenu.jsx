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
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>순번</th>
            <th>메뉴이미지</th>
            <th>메뉴명</th>
            <th>가격</th>
            <th>카테고리</th>
            <th>품절여부</th>
          </tr>
          {apiData.map((apiData, index) => (
            <tr key={index} onClick={() => openModal(apiData)}>
              <td>{index + 1}</td>
              <td>
                <span>{apiData.menuImg}</span>
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
        <span>{`메뉴명: ${selectedData.menuName}, `}</span>
        <br />
        <span>{`메뉴이미지 : ${selectedData.menuImg}`}</span>
        <br />
        <span>{`메뉴설명 : ${selectedData.menuDetail}`}</span>
        <br />
        <span>{`가격 : ${selectedData.menuPrice}`}</span>
        <br />
        <span>{`카테고리 : ${selectedData.categoryname}`}</span>
        <br />
        <span>{`품절여부 : ${selectedData.soldoutState}, `}</span>
        <button onClick={() => updateApi(selectedData.menuId, "Y")}>
          품절
        </button>
        <button onClick={() => updateApi(selectedData.menuId, "N")}>
          품절취소
        </button>
        <br />
      </ModalForm>
    </div>
  );
};

export default AdminMenu;
