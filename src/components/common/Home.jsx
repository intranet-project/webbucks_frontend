import React, { useState, useEffect } from "react";
import "../../styles/Home.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: "/event1.PNG",
      label: "여름 시즌 메뉴",
      description: "더위를 이겨낼 2024 여름 한정 시즌 메뉴를 즐겨보세요!",
    },
    {
      img: "/Home1.PNG",
      label: "MEET THE MOMENT",
      description: "25주년 맞이 특별 메뉴 출시!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <h1></h1>
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item ${
              index === currentSlide ? "active" : ""
            }`}
            key={index}
          >
            <img src={slide.img} alt={slide.label} />
            <div className="carousel-caption">
              <h3>{slide.label}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <img
                src="제주 까망 크림 프라푸치노.PNG"
                alt="Product 1"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">제주 까망 크림 프라푸치노</h5>
                <p className="card-text">
                  제주를 느낄 수 있는 고소하고 크리미한 프라푸치노
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <img
                src="송당 자몽 망고 코코 프라푸치노.PNG"
                alt="Product 2"
                className="card-img"
              />
              <div className="card-body">
                <h5 className="card-title">송당 자몽 망고 코코 프라푸치노</h5>
                <p className="card-text">
                  쌉쌀한 자몽과 달콤한 망고의 조합에 부드러운 코코넛을 느낄 수
                  있는 프라푸치노
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
