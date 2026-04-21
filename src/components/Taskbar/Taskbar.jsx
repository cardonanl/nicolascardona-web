import Clock from './Clock'
import styles from './Taskbar.module.css'

export default function Taskbar() {
  return (
    <div className={styles.taskbar}>
      <button
        className={styles.startButton}
        onClick={() => window.open('https://github.com/cardonanl', '_blank')}
      >
        <img
          src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
          alt=""
          width={16}
          height={16}
          style={{ imageRendering: 'pixelated' }}
        />
        <span className={styles.startLabel}>Start</span>
      </button>
      <div className={styles.divider} />
      <div style={{ marginLeft: 'auto' }}>
        <Clock />
      </div>
    </div>
  )
}
