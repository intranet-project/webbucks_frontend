import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/VoiceList.css";

const VoiceList = () => {
  const [custId, setCustId] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [activeFilter, setActiveFilter] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/webbucks/customer/answer?custId=${custId}`
        );

        if (Array.isArray(response.data)) {
          setAnswers(response.data);
        } else {
          console.warn("응답 데이터가 예상한 형태가 아닙니다:", response.data);
          setAnswers([]);
        }
      } catch (error) {
        console.error("답변 데이터 가져오기 오류:", error);
        setAnswers([]);
      }
    };

    fetchAnswerData();
  }, [custId]);

  const getStatusColor = (answer) => {
    if (answer.voiceState === null || answer.voiceState === undefined) {
      return "red";
    } else {
      return answer.voiceState === "미처리" ? "red" : "blue";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  const filterAnswers = () => {
    let filteredAnswers = answers;

    if (filter === "전체") {
      filteredAnswers = answers;
    } else if (filter === "나의 소리") {
      filteredAnswers = answers.filter((answer) => answer.voiceState === null);
    } else if (filter === "답변 확인") {
      filteredAnswers = answers.filter((answer) => answer.voiceState !== null);
    }

    filteredAnswers.sort(
      (a, b) => new Date(b.voiceDate) - new Date(a.voiceDate)
    );

    return filteredAnswers;
  };

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
    setActiveFilter(filterValue);
  };

  return (
    <div className="container">
      <h2>나의 소리</h2>
      <div className="filter-buttons">
        <button
          className={activeFilter === "전체" ? "active" : ""}
          onClick={() => handleFilterClick("전체")}
        >
          전체
        </button>
        <button
          className={activeFilter === "나의 소리" ? "active" : ""}
          onClick={() => handleFilterClick("나의 소리")}
        >
          등록한 나의 소리
        </button>
        <button
          className={activeFilter === "답변 확인" ? "active" : ""}
          onClick={() => handleFilterClick("답변 확인")}
        >
          처리된 나의 소리
        </button>
      </div>
      {filterAnswers().length === 0 ? (
        <p>등록된 답변이 없습니다.</p>
      ) : (
        filterAnswers().map((answer, index) => (
          <div key={index} className="answer-card">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>접수 번호:</strong> {answer.voiceId}
                  </td>
                  <td>
                    <strong>등록일:</strong> {formatDate(answer.voiceDate)}
                  </td>
                  <td>
                    <span style={{ color: getStatusColor(answer) }}>
                      {answer.voiceState || "미처리"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <div className="content-container">
                      <strong>제목:</strong> {answer.voiceTitle}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">
                    <div className="content-container">
                      <strong>내용:</strong> {answer.voiceContent}
                    </div>
                  </td>
                </tr>
                {answer.voiceState !== "미처리" && answer.answerContent && (
                  <tr>
                    <td colSpan="3">
                      <div className="content-answer">
                        <div className="answer"> ☞ {answer.answerContent}</div>
                        <div />
                      </div>
                    </td>
                  </tr>
                )}
                {filter === "답변 확인" && (
                  <>
                    <tr>
                      <td colSpan="3">
                        <strong>처리일:</strong> {formatDate(answer.answerDate)}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default VoiceList;
