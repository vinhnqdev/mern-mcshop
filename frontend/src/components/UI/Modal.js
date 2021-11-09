import ReactDOM from "react-dom";

const Backdrop = ({ onClose, visible, notAllowedClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-75 ${
        !visible && "hidden"
      }`}
      onClick={notAllowedClose ? () => {} : onClose}
    />
  );
};

//transform -translate-x-1/2 -translate-y-1/2

const ModalOverlay = ({ children, visible, unableBgOverlay }) => {
  return (
    <div
      className={`fixed font-mont top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 ${
        !unableBgOverlay && "bg-white shadow-lg animate-slideDown"
      } rounded-lg max-w-md p-4 z-50 ${!visible && "hidden"}`}
    >
      <div>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ onClose, children, visible, unableBgOverlay, notAllowedClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} notAllowedClose={notAllowedClose} visible={visible} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay visible={visible} unableBgOverlay={unableBgOverlay}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
