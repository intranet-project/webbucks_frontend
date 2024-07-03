import "../../styles/Modal.css";

const ModalForm = ({ isOpen, children, closeModal }) => {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal_back"></div>
      <div className="modal">
        {children}
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default ModalForm;
