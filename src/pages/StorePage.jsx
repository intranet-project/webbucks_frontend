import React from "react";
import "../styles/VoicePage.css";
import StoreList from "../components/customer/StoreList";

/**
 * 매장 찾기 페이지
 * @author 최유빈
 * @since 2024-07-07
 */
function StorePage() {
  return (
    <div>
      <h1>매장찾기</h1>
      <div className="store"></div>

      <StoreList />
    </div>
  );
}

export default StorePage;
