import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/VoiceList.css";

const VoiceList = () => {
  const [custId, setCustId] = useState("1");
  const [answers, setAnswers] = useState([]);
  const [filter, setFilter] = useState("전체"); // 필터 상태 추가
  const [activeFilter, setActiveFilter] = useState("전체"); // 활성 필터 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchAnswerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/customer/answer?custId=${custId}`
        );

        // response.data가 배열인지 확인하고 상태를 업데이트함
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
      return "red"; // 처리 여부가 null이면 빨간색
    } else {
      return answer.voiceState === "미처리" ? "red" : "green";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    //const hours = String(date.getHours()).padStart(2, "0");
    //const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 `;
  };

  const filterAnswers = () => {
    if (filter === "전체") {
      return answers;
    } else if (filter === "나의 소리") {
      return answers;
    } else if (filter === "답변 확인") {
      return answers.filter((answer) => answer.voiceState === "처리완료");
    }
    return answers;
  };

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
    setActiveFilter(filterValue); // Set active filter when a button is clicked
  };

  return (
    <div className="container">
      <h2>고객의 소리 답변 확인</h2>
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
          나의 소리
        </button>
        <button
          className={activeFilter === "답변 확인" ? "active" : ""}
          onClick={() => handleFilterClick("답변 확인")}
        >
          답변 확인
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
                    <strong>번호:</strong> {answer.voiceId}
                  </td>
                  <td>
                    <p>
                      등록일:
                      {formatDate(answer.voiceDate)}
                    </p>
                  </td>
                  <td>
                    <span style={{ color: getStatusColor(answer) }}>
                      {answer.voiceState || "미처리"}
                    </span>
                  </td>
                </tr>
                {filter === "전체" && (
                  <>
                    <tr>
                      <td>
                        <strong>제목:</strong>
                      </td>
                      <td>{answer.voiceTitle}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>내용:</strong>
                      </td>
                      <td>{answer.voiceContent}</td>
                    </tr>
                    {answer.voiceState !== "미처리" && (
                      <tr>
                        <td>
                          <strong>답변</strong>
                        </td>
                        <td>
                          <p>{answer.answerContent}</p>
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {filter === "답변 확인" && (
                  <>
                    <tr>
                      <td>
                        <p>처리일</p>
                      </td>
                      <td>
                        <p>{formatDate(answer.answerDate)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>답변 내용:</p>
                      </td>
                      <td>
                        <p>{answer.answerContent}</p>
                      </td>
                    </tr>
                  </>
                )}
                {filter === "나의 소리" && (
                  <>
                    <tr>
                      <td>
                        <p>고객의 소리 내용:</p>
                      </td>
                      <td>
                        <p>{answer.voiceContent}</p>
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
