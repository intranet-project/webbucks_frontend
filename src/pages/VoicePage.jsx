import React from "react";
import { Link } from "react-router-dom";
import "../styles/VoicePage.css";

/**
 * 고객의소리 페이지
 * @author 최유빈
 * @since 2024-07-03
 */
function VoicePage() {
  return (
    <div className="voice-page-container">
      <h1 className="voice-page-title">고객의 소리</h1>
      <div className="voice-page-links">
        <Link className="voice-page-link" to="/voiceRegistration">
          고객의 소리 등록하기
        </Link>
        <Link className="voice-page-link" to="/voiceList">
          고객의 소리 답변 확인하기
        </Link>
      </div>
    </div>
  );
}

export default VoicePage;
