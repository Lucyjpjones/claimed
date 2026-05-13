import "./Modal.css"

function Modal({ isOpen, onClose, onSubmit, children, submitButton, icon }) {
  if (!isOpen) return null

  return (
    <div className="modalOverlay" onClick={onClose}>

      <div className="modalBox" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="modalHeader">
          <button className="modalCloseBtn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ICON (optional) */}
        {icon && (
          <div className="modalIconWrapper">
            {icon}
          </div>
        )}

        {/* CONTENT */}
        <div className="modalContent">
          {children}
        </div>

        {/* FOOTER */}
        <div className="modalFooter">
          <button className="modalSubmitBtn" onClick={onSubmit}>
            {submitButton}
          </button>
        </div>

      </div>

    </div>
  )
}

export default Modal