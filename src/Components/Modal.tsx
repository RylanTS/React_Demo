
function Modal({ children, onClose }) {
    return <>
    <div className={"backdrop"} onClick={onClose} />
    <dialog open className={"modal"}>
        {children}
    </dialog>
    </>
}

export default Modal;
