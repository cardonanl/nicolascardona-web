import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { artwork } from '../../data/artwork'
import styles from './VisualArtWindow.module.css'

function Lightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const item = items[index]

  const prev = useCallback(() => setIndex(i => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setIndex(i => (i + 1) % items.length), [items.length])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className="window" style={{ width: 620, maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
        <div className="title-bar">
          <div className="title-bar-text">
            {item.caption} — {index + 1} / {items.length}
          </div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div className="window-body" style={{ padding: 12, textAlign: 'center' }}>
          <img
            src={item.src}
            alt={item.alt}
            style={{ maxWidth: '100%', maxHeight: '65vh', display: 'block', margin: '0 auto', border: '2px inset #808080' }}
          />
          <p style={{ margin: '10px 0 8px', fontSize: 13 }}>{item.caption}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button onClick={prev}>◀ Anterior</button>
            <button onClick={next}>Siguiente ▶</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function VisualArtWindow() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <div style={{ padding: '8px' }}>
      <p style={{ fontSize: 11, margin: '0 0 8px', color: '#444' }}>
        Collection: Handmade Toys &amp; Pop Art — click any image to view
      </p>
      <div className={styles.grid}>
        {artwork.map((item, i) => (
          <figure
            key={item.id}
            className={styles.thumb}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={artwork}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
