import React from 'react'

const Canvas = ({
  title = 'Canvas test',
  id = 'canvasDefault',
  children,
  buttonText = 'toggle canvas',
  buttonClass = 'btn btn-primary',
  icon = null
}) => {
  return (
    <div>
      <button
        className={buttonClass}
        type="button"
        style={{ textWrap: 'nowrap' }}
        data-bs-toggle="offcanvas"
        data-bs-target={`#${id}`}
        aria-controls={`id`}
      >
        {buttonText} {icon}
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id={id}
        aria-labelledby={`${id}Label`}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${id}Label`}>
            {title}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">{children}</div>
      </div>
    </div>
  )
}

export default Canvas
