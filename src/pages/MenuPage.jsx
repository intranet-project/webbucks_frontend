import React from "react";
import MenuList from "../components/customer/MenuList";

/**
 * 메뉴 페이지
 * @author 최유빈
 * @since 2024-07-01
 */
function MenuPage() {
  return (
    <div className="App">
      <h1>스타벅스 메뉴</h1>
      <MenuList />
    </div>
  );
}

export default MenuPage;
