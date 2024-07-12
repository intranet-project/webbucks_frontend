import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male"); // 기본값으로 "male" 설정
  const [age, setAge] = useState("");
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/webbucks/",
        {
          cust_name: name,
          cust_password: password,
          cust_email: email,
          cust_phone: phone,
          cust_created_at: createdAt,
          cust_gender: gender,
          cust_age: age,
        }
      );

      const token = response.headers["authorization"];
      sessionStorage.setItem("jwt", token);
      alert("회원가입이 완료되었습니다.");
      navigate("/home");
    } catch (error) {
      setError("회원가입에 실패했습니다. 정보를 확인해 주세요.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>회원가입</h2>
        <div className="formGroup">
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>전화번호</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>성별</label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                value="M"
                checked={gender === "M"}
                onChange={() => setGender("M")}
              />
              남성
            </label>
            <label>
              <input
                type="radio"
                value="F"
                checked={gender === "F"}
                onChange={() => setGender("F")}
              />
              여성
            </label>
          </div>
        </div>
        <div className="formGroup">
          <label>나이</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <input
            type="checkbox"
            checked={privacyAgreement}
            onChange={(e) => setPrivacyAgreement(e.target.checked)}
            required
          />
          <label>개인정보 동의</label>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button" disabled={!privacyAgreement}>
          회원가입
        </button>
        <button to="/login" className="button">
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignUp;
