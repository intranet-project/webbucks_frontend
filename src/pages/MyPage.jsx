import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * MyPage 컴포넌트는 사용자의 BlackBucks 카드 정보를 보여줍니다.
 * @author 최유빈
 * @since 2024-07-06
 */
const MyPage = () => {
  const [custId, setCustId] = useState("1"); // custId 상태 초기화
  const [points, setPoints] = useState(0); // 포인트 상태 초기화
  const [recentOrder, setRecentOrder] = useState(""); // 최근 주문 상태 초기화

  useEffect(() => {
    const storedCustId = localStorage.getItem("custId"); // 로컬 스토리지에서 custId 가져오기
    if (storedCustId) {
      setCustId(storedCustId); // 가져온 custId 설정
    }
  }, []);

  useEffect(() => {
    if (custId) {
      const fetchPoints = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/points/${custId}`
          );
          setPoints(response.data.points); // 포인트 정보 설정
          // 여기서 최근 주문 내역을 가져오는 API 호출을 추가할 수 있습니다.
          // 예: const orderResponse = await axios.get(`http://localhost:8000/api/v1/customer/${custId}/orders`);
          // setRecentOrder(orderResponse.data.recentOrder);
          const orderResponse = await axios.get(
            `http://localhost:8000/api/v1/customer/${custId}/orders`
          );
          console.log("엥?", orderResponse);
          setRecentOrder(orderResponse.data);
        } catch (error) {
          console.error("포인트 정보를 불러오는 중 오류 발생:", error);
        }
      };

      fetchPoints(); // 포인트 정보 가져오기 함수 호출
    }
  }, [custId]); // custId가 변경될 때마다 호출

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          padding: "10px",
          margin: "10px",
          width: "500px",
          textAlign: "center", // 가운데 정렬
        }}
      >
        <h1 style={{ width: "100%" }}>My BlackBucks Card</h1>
        <img
          src={process.env.PUBLIC_URL + "/card.PNG"}
          alt="BlackBucks Card"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <p style={{ width: "100%" }}>
          포인트: <span style={{ fontWeight: "bold" }}>{points}</span> 점
        </p>
        <p style={{ width: "100%" }}>
          최근 주문 내역 :{" "}
          <span style={{ fontStyle: "italic" }}>
            {recentOrder ? recentOrder.menuName : "주문내역이 없습니다."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyPage;
