import { useRef } from 'react'
import Draggable from 'react-draggable'

export default function Window({ id, title, icon, isOpen, zIndex, initialPosition, onClose, onFocus, onPositionChange, children, width = 480 }) {
  const nodeRef = useRef(null)

  if (!isOpen) return null

  return (
    <Draggable
      handle=".title-bar"
      defaultPosition={initialPosition}
      onStop={(e, data) => onPositionChange(id, { x: data.x, y: data.y })}
      nodeRef={nodeRef}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className="window window-shell"
        style={{ position: 'absolute', zIndex, width }}
        onMouseDown={onFocus}
      >
        <div className="title-bar">
          {icon && (
            <img
              src={icon}
              alt=""
              width={16}
              height={16}
              style={{ imageRendering: 'pixelated', marginRight: 4 }}
            />
          )}
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div className="window-body" style={{ maxHeight: 560, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </Draggable>
  )
}
