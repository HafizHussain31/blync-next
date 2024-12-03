import React from "react";
import "./styles.scss";
import { Modal } from "react-bootstrap";

const ModalComponent = ({
  children,
  customModalClass,
  show,
  setModal,
  header,
  hideIcon,
  widthClass,
  filterModal,
}) => {
  const toggle = () => {
    setModal(!show);
  };

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      size={`${filterModal ? "lg" : ""}`}
      centered
      onHide={toggle}
      className={`normalModal ${customModalClass}${widthClass}`}
    >
      {/* {hideIcon ? (
        <Modal.Header>{header}</Modal.Header>
      ) : (
        <Modal.Header closeButton>{header}</Modal.Header>
      )} */}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
