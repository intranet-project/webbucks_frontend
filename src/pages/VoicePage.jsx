import React from "react";
import VoiceRegistration from "../components/customer/VoiceRegistration";

/**
 * 고객의소리 페이지
 * @author 최유빈
 * @since 2024-07-03
 */
function VoicePage() {
  return (
    <div className="App">
      <h1>고객의 소리</h1>
      <VoiceRegistration />
    </div>
  );
}

export default VoicePage;
