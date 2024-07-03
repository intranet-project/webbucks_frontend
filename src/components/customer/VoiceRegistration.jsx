import React, { useState } from "react";
import axios from "axios";
import "../../styles/VoiceRegistration.css";

/**
 * 고객의 소리 등록
 * @author 최유빈
 * @since 2024-07-01
 */
const VoiceRegistration = () => {
  const [custId, setCustId] = useState("1"); // 임시 고객ID를 1로 지정
  const [voiceTitle, setVoiceTitle] = useState("");
  const [voiceContent, setVoiceContent] = useState("");
  const [storeId, setStoreId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 서버에 등록 요청 보내기
      const response = await axios.post(
        "http://localhost:8000/api/customer/voice", // 서버 주소와 경로를 정확히 입력
        {
          custId: custId,
          voiceTitle: voiceTitle,
          voiceContent: voiceContent,
          storeId: storeId,
        }
      );
      console.log(custId, voiceTitle, voiceContent, storeId);

      console.log("고객의 소리가 성공적으로 등록되었습니다:", response.data);

      // 등록 성공 시 사용자에게 알림 혹은 다음 단계로 넘어가는 로직 추가
      // 예: 성공 메시지 출력, 다른 페이지로 이동 등

      // 폼 초기화
      setCustId("1");
      setVoiceTitle("");
      setVoiceContent("");
      setStoreId("");
    } catch (error) {
      console.error("고객의 소리 등록 중 오류 발생:", error);
      // 등록 실패 시 사용자에게 알림을 주는 로직 추가
      // 예: 오류 메시지 출력 등
    }
  };

  return (
    <div className="container">
      <h2>고객의 소리 등록</h2>
      <h4>
        고객의 소리를 통해 질문을 해 주시면 빠른 시간안에 답변을 드리도록
        하겠습니다.
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="storeId" className="label">
            매장ID:
          </label>
          <input
            type="number"
            id="storeId"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="voiceTitle" className="label">
            고객의 소리 제목:
          </label>
          <input
            type="text"
            id="voiceTitle"
            value={voiceTitle}
            onChange={(e) => setVoiceTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="voiceContent" className="label">
            고객의 소리 내용:
          </label>
          <textarea
            id="voiceContent"
            value={voiceContent}
            onChange={(e) => setVoiceContent(e.target.value)}
            className="textarea"
            required
          />
        </div>
        <button type="submit" className="button">
          등록
        </button>
      </form>
    </div>
  );
};

export default VoiceRegistration;
