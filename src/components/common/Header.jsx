import React, { useState } from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
/**
 * Hedaer 컴포넌트로 네비게이션 메뉴를 포함한 헤더 기능
 * 로그인시 로그아웃, 마이페이지 보임
 * @author 최유빈
 * @version 1.1
 * 2024-07-01
 */

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 초기 로그인 상태는 false로 설정
  const handleLogout = () => {
    // 로그아웃 로직 구현
    setIsLoggedIn(false);
    // 로그아웃 API를 호출하거나 필요한 로컬 스토리지 등의 처리를 수행
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__topLeft">
          <Link to="/" className="header__logo">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Logo"
              className="header__logoImage"
            />
          </Link>
        </div>
        <div className="header__topRight">
          {isLoggedIn ? (
            <>
              <Link
                to="/logout"
                className="header__topLink"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
              <Link to="/mypage" className="header__topLink">
                마이페이지
              </Link>
            </>
          ) : (
            <Link to="/login" className="header__topLink">
              로그인
            </Link>
          )}
          <div className="header__search">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="header__searchInput"
            />
            <button className="header__searchButton">검색</button>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <nav className="header__nav">
          <ul className="header__navList">
            <li className="header__navItem">
              <Link to="/menu">메뉴</Link>
            </li>

            <li className="header__navItem">
              <Link to="/event">이벤트</Link>
            </li>
            <li className="header__navItem">
              <Link to="/customerVoice">고객의 소리</Link>
            </li>
            <li className="header__navItem">
              <Link to="/admin">관리자 페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
