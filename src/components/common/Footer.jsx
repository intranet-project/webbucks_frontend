import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__section">
          <h4>회사 정보</h4>
          <p>회사 소개</p>
          <p>채용 정보</p>
          <p>보도 자료</p>
          <p>
            <a href="/admin" className="footer__link">
              관리자 페이지
            </a>
          </p>
        </div>
        <div className="footer__section">
          <h4>고객 지원</h4>
          <p>FAQ</p>
          <p>연락처</p>
          <p>사이트 맵</p>
        </div>
        <div className="footer__section">
          <h4>정책</h4>
          <p>이용 약관</p>
          <p>개인정보 처리방침</p>
          <p>쿠키 정책</p>
        </div>
        <div className="footer__section">
          <h4>팔로우하기</h4>
          <div className="footer__social">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
