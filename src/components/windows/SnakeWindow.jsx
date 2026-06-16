import { useEffect, useRef, useState, useCallback } from 'react'

const COLS = 20, ROWS = 20, CELL = 14
const W = COLS * CELL, H = ROWS * CELL

function randomFood(snake) {
  let pos
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

const INIT_SNAKE = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]

export default function SnakeWindow() {
  const canvasRef = useRef(null)
  const gameRef = useRef({
    snake: INIT_SNAKE.map(s => ({ ...s })),
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    score: 0,
    over: false,
  })
  const [score, setScore] = useState(0)
  const [over, setOver] = useState(false)
  const [started, setStarted] = useState(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const g = gameRef.current

    ctx.fillStyle = '#c0c0c0'
    ctx.fillRect(0, 0, W, H)

    ctx.strokeStyle = '#b0aca4'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); ctx.stroke()
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); ctx.stroke()
    }

    g.snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#004000' : '#008000'
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
    })

    ctx.fillStyle = '#CC0000'
    ctx.fillRect(g.food.x * CELL + 2, g.food.y * CELL + 2, CELL - 4, CELL - 4)
  }, [])

  const reset = useCallback(() => {
    const g = gameRef.current
    g.snake = INIT_SNAKE.map(s => ({ ...s }))
    g.dir = { x: 1, y: 0 }
    g.nextDir = { x: 1, y: 0 }
    g.food = { x: 15, y: 10 }
    g.score = 0
    g.over = false
    setScore(0)
    setOver(false)
    setStarted(false)
    draw()
  }, [draw])

  const tick = useCallback(() => {
    const g = gameRef.current
    if (g.over) return

    g.dir = { ...g.nextDir }
    const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
        g.snake.some(s => s.x === head.x && s.y === head.y)) {
      g.over = true
      setOver(true)
      return
    }

    g.snake.unshift(head)
    if (head.x === g.food.x && head.y === g.food.y) {
      g.score++
      setScore(g.score)
      g.food = randomFood(g.snake)
    } else {
      g.snake.pop()
    }
    draw()
  }, [draw])

  useEffect(() => { draw() }, [draw])

  useEffect(() => {
    if (!started || over) return
    const id = setInterval(tick, 150)
    return () => clearInterval(id)
  }, [started, over, tick])

  useEffect(() => {
    const DIRS = {
      ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
    }
    function onKey(e) {
      const g = gameRef.current
      if (DIRS[e.key]) e.preventDefault()

      if (!started && DIRS[e.key]) { setStarted(true); return }
      if (over && e.key.toLowerCase() === 'r') { reset(); return }

      const next = DIRS[e.key]
      if (next && !(next.x === -g.dir.x && next.y === -g.dir.y)) {
        g.nextDir = next
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [started, over, reset])

  return (
    <div style={{ padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ border: '2px inset #808080', display: 'block' }}
      />
      {!started && !over && (
        <p style={{ fontSize: 11, color: '#444', margin: 0 }}>
          Presiona ↑↓←→ o WASD para iniciar
        </p>
      )}
      {over && (
        <p style={{ fontSize: 11, color: '#800000', margin: 0 }}>
          Game Over — presiona R para reiniciar
        </p>
      )}
      <div className="status-bar" style={{ width: '100%' }}>
        <p className="status-bar-field">Score: {score}</p>
        <p className="status-bar-field">↑↓←→ · WASD</p>
      </div>
    </div>
  )
}
