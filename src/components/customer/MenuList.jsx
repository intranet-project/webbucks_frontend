import React from "react";
import Menu from "./Menu";
import menuData from "./MenuData";

/**
 * 메뉴 목록 컴포넌트를 사용하여 전체 메뉴 목록 보여주는 MenuList
 * @author 최유빈
 * @since 2024-07-01
 */
const MenuList = () => {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {menuData.map((menu) => (
        <Menu
          key={menu.id}
          name={menu.name}
          detail={menu.detail}
          image={menu.image}
        />
      ))}
    </div>
  );
};

export default MenuList;
