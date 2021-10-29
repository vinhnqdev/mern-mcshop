import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-75"
      onClick={props.onClose}
    />
  );
};

//transform -translate-x-1/2 -translate-y-1/2

const ModalOverlay = (props) => {
  return (
    <div className="fixed font-mont top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 rounded-lg animate-slideDown max-w-md bg-white p-4 shadow-lg z-50 ">
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
