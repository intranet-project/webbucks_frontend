import React from "react";

const Event = () => {
  return (
    <div className="event">
      <img src={process.env.PUBLIC_URL + "/event1.PNG"} alt="event1" />
      <p>이벤트 내용</p>
    </div>
  );
};

export default Event;
