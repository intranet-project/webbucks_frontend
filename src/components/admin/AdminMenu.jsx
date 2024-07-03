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
      {apiData.map((apiData, index) => (
        <div key={index}>
          <span
            onClick={() => openModal(apiData)}
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
          >{`${index + 1}. 메뉴명: ${apiData.menuName}, `}</span>
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
        <button onClick={closeModal}>닫기</button>
      </ModalForm>
    </div>
  );
};

export default AdminMenu;
