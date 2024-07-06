import React from "react";

/**
 * 임시 메뉴 컴포넌트
 * @author 최유빈
 * @since 2024-07-01
 */
const Menu = ({ name, detail, image }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "300px",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + image}
        alt={name}
        style={{ width: "100%", height: "250px", objectFit: "cover" }}
      />
      <h3>{name}</h3>
      <p>{detail}</p>
    </div>
  );
};

export default Menu;
