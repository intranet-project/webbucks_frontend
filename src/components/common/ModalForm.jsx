import "../../styles/Modal.css";

const ModalForm = ({ isOpen, children, closeModal }) => {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-back"></div>
      <div className="modal">
        <span className="btn-close" onClick={closeModal}>
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalForm;
