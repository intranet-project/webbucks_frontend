import React from "react";
import { Link } from "react-router-dom";
import "../styles/VoicePage.css";
import VoiceList from "../components/customer/Voice/VoiceList";

/**
 * 고객의소리 페이지
 * @autor 최유빈
 * @since 2024-07-03
 */
function VoicePage() {
  return (
    <div>
      {" "}
      <div className="voice-page">
        <h1>고객의 소리</h1>
        <div className="voice-page-container">
          <Link className="voice-page-link" to="/voiceRegistration">
            고객의 소리 등록하기
          </Link>
        </div>
      </div>
      <VoiceList />
    </div>
  );
}

export default VoicePage;
