import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/VoiceRegistration.css";

const VoiceRegistration = () => {
  const [custId, setCustId] = useState("1");
  const [voiceTitle, setVoiceTitle] = useState("");
  const [voiceContent, setVoiceContent] = useState("");
  const [storeId, setStoreId] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook to get navigation function

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer/voice",
        {
          custId: custId,
          voiceTitle: voiceTitle,
          voiceContent: voiceContent,
          storeId: storeId,
        }
      );

      console.log("고객의 소리가 성공적으로 등록되었습니다:", response.data);

      alert("고객의 소리가 성공적으로 등록되었습니다.");
      navigate("/voiceList");

      // 폼 초기화
      setCustId("1");
      setVoiceTitle("");
      setVoiceContent("");
      setStoreId("");
    } catch (error) {
      console.error("고객의 소리 등록 중 오류 발생:", error);
      alert("고객의 소리 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    navigate("/customerVoice"); // Navigate to /voicePage route
  };

  return (
    <div className="container">
      <h2>고객의 소리 등록</h2>
      <h4>
        고객의 소리를 통해 질문을 해 주시면 빠른 시간 안에 답변을 드리도록
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
        <button
          type="button"
          className="button-cancel"
          onClick={handleCancelClick}
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default VoiceRegistration;
