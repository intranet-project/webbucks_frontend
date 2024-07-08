import React from "react";
import "../../styles/StoreItem.css";

const StoreItem = ({ store }) => {
  return (
    <div className="store-item">
      <div className="store-item-icon">
        <img src={process.env.PUBLIC_URL + "/store.PNG"} alt="Store Icon" />
      </div>
      <div className="store-item-content">
        <h2>{store.store_name}</h2>
        <p>{store.store_address}</p>
      </div>
    </div>
  );
};

export default StoreItem;
