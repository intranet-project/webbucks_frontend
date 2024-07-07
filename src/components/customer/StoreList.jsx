import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreItem from "./StoreItem";
import "../../styles/StoreList.css";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stores");
        setStores(response.data);
      } catch (error) {
        console.error("매장 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchStores();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStores = stores.filter(
    (store) =>
      store.storeName.includes(searchTerm) ||
      store.storeAddress.includes(searchTerm)
  );

  return (
    <div className="store-list-container">
      <input
        type="text"
        placeholder="매장명 또는 주소 검색"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="store-list">
        {filteredStores.map((store) => (
          <StoreItem key={store.storeId} store={store} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
