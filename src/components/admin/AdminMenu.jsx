import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "../common/ModalForm";

const AdminMenu = () => {
  const [apiData, setApiData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        getApi();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {apiData.map((apiData, index) => (
        <div key={index}>
          <span>{`${index + 1}. 메뉴명: ${apiData.menuName}, `}</span>
          <span>{` 메뉴이미지 : ${apiData.menuImg}`}</span>
          <span>{` 가격 : ${apiData.menuPrice}`}</span>
          <span>{` 카테고리 : ${apiData.categoryname}`}</span>
          <br />
          <span>{`품절여부 : ${apiData.soldoutState}, `}</span>
          <button onClick={() => updateApi(apiData.menuId, "Y")}>품절</button>
          <button onClick={() => updateApi(apiData.menuId, "N")}>
            품절취소
          </button>
        </div>
      ))}

      <button onClick={openModal}>모달</button>
      <ModalForm isOpen={isModalOpen} closeModal={closeModal}>
        <h2>hi</h2>
        <p>it's me</p>
      </ModalForm>
    </div>
  );
};

export default AdminMenu;
