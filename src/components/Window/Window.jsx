import { useRef, useState, useCallback } from 'react'
import Draggable from 'react-draggable'

// Must match zoom: 1.35 on .window-shell in index.css
const ZOOM = 1.35

export default function Window({ id, title, icon, isOpen, zIndex, initialPosition, onClose, onFocus, onPositionChange, children, width = 480, resizable = true }) {
  const nodeRef = useRef(null)
  const [size, setSize] = useState({ width, height: null })

  const startResize = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.width
    const startH = size.height ?? nodeRef.current?.offsetHeight ?? 400

    function onMove(ev) {
      setSize({
        width:  Math.max(300, Math.round(startW + (ev.clientX - startX) / ZOOM)),
        height: Math.max(180, Math.round(startH + (ev.clientY - startY) / ZOOM)),
      })
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [size])

  if (!isOpen) return null

  const hasFixedHeight = size.height !== null

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
        style={{
          position: 'absolute',
          zIndex,
          width: size.width,
          ...(hasFixedHeight && { height: size.height, display: 'flex', flexDirection: 'column' }),
        }}
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
        <div
          className="window-body"
          style={hasFixedHeight
            ? { flex: 1, overflowY: 'auto', minHeight: 0 }
            : { maxHeight: 560, overflowY: 'auto' }
          }
        >
          {children}
        </div>
        {resizable && (
          <div
            onMouseDown={startResize}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 14,
              height: 14,
              cursor: 'se-resize',
              backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              backgroundPosition: 'bottom right',
            }}
          />
        )}
      </div>
    </Draggable>
  )
}
