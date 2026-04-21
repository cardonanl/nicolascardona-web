import { useState, useEffect } from 'react'

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

const defaultWindows = () => {
  const W = typeof window !== 'undefined' ? window.innerWidth : 1280
  // Each window is zoom-scaled by 1.35 in CSS.
  // about: 520px → ~702px visual; projects: 560px → ~756px visual; gap: 24px
  const visualAbout = Math.round(520 * 1.35)
  const totalVisual = visualAbout + Math.round(560 * 1.35) + 24
  const startX = Math.max(30, Math.round((W - totalVisual) / 2))
  const col2 = startX + visualAbout + 24
  return {
    about:    { isOpen: true,  zIndex: 2, position: { x: startX, y: 30  } },
    articles: { isOpen: false, zIndex: 1, position: { x: col2,   y: 30  } },
    projects: { isOpen: true,  zIndex: 1, position: { x: col2,   y: 30  } },
    art:      { isOpen: false, zIndex: 1, position: { x: 180,    y: 80  } },
    papers:   { isOpen: false, zIndex: 1, position: { x: col2,   y: 400 } },
    blogPost: { isOpen: false, zIndex: 1, position: { x: 120,    y: 60  } },
  }
}

export function useWindowManager(initialBlogSlug = null) {
  const [windows, setWindows] = useState(defaultWindows)
  const [topZ, setTopZ] = useState(10)

  useEffect(() => {
    if (initialBlogSlug) {
      openWindow('blogPost')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function bringToFront(id) {
    setTopZ(z => {
      const newZ = z + 1
      setWindows(prev => ({
        ...prev,
        [id]: { ...prev[id], zIndex: newZ },
      }))
      return newZ
    })
  }

  function openWindow(id) {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true },
    }))
    bringToFront(id)
  }

  function closeWindow(id) {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }))
  }

  function updatePosition(id, position) {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], position },
    }))
  }

  return { windows, openWindow, closeWindow, bringToFront, updatePosition }
}
