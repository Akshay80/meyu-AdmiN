import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../../helper/uitility";

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);
  const [ModalOpen, setModalOpen] = useState(false);
  // Time before idle
  let navigate = useNavigate();

  const onIdle = () => {
    let token = getToken();
    if (token === true) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };
  const logout = () => {
    setModalOpen(false);
    setTimeout(() => {
      clearToken();
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={1000 * 5 * 60}
        onIdle={onIdle}
      ></IdleTimer>
      <Modal
        show={ModalOpen}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="border-0 pb-0 ms-2">
          <Modal.Title>Session Ended</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0 ms-2">
          <p>Your session has been expired with us. Please sign-in again.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 p-3">
          <Button variant="btn btn-primary" onClick={logout}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IdleTimerContainer;
