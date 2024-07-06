import React, { useState, useEffect } from "react";

const Event = () => {
  const [events, setEvents] = useState([
    {
      image: "/event1.PNG",
      content: "이벤트 내용 1",
    },
    {
      image: "/event2.PNG",
      content: "이벤트 내용 2",
    },
    {
      image: "/event3.PNG",
      content: "이벤트 내용 3",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [events.length]);

  return (
    <div className="event">
      <img
        src={process.env.PUBLIC_URL + events[currentIndex].image}
        alt={`event${currentIndex + 1}`}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
      <p>{events[currentIndex].content}</p>
    </div>
  );
};

export default Event;
