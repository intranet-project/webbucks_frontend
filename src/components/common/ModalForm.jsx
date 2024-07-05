import "../../styles/Modal.css";

const ModalForm = ({ isOpen, children, closeModal }) => {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal_back"></div>
      <div className="modal">
        <div style={{ textAlign: "right" }}>
          <span className="close_btn" onClick={closeModal}>
            X
          </span>
        </div>
        {children}
        <div style={{ textAlign: "right" }}>
          <button className="close_btn" onClick={closeModal}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
