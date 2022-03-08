import React, { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import {Modal, Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {clearToken} from '../../helper/uitility';

function IdleTimerContainer() {
  const idleTimerRef = useRef(null);
  const [ModalOpen, setModalOpen] = useState(false)
  // Time before idle
  let navigate = useNavigate();

  const onIdle = (time) => {
    console.log("User is Idle");
    setModalOpen(true)
    console.log(time)
  };
  const logout = () => {
    setModalOpen(false);
      clearToken();
      navigate("/login");
  }
  const handleClose = () => setModalOpen(false);
  return (
    <div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={1000 * 15 * 60}
        onIdle={onIdle}
      ></IdleTimer>
      <Modal show={ModalOpen} backdrop="static"
        keyboard={false}
        centered={true}
        >
          <Modal.Header className="border-0 pb-0">
          <Modal.Title>Are you still here?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
        Your session has been expired. Do you want to continue your session?
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="btn btn-danger" onClick={logout}>
            Logout
          </Button>
          <Button variant="primary" onClick={handleClose}>Continue Session</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default IdleTimerContainer;
