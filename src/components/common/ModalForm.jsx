import "../../styles/Modal.css";

const ModalForm = ({ isOpen, children }) => {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal_back"></div>
      <div className="modal">{children}</div>
    </div>
  );
};

export default ModalForm;
