import styles from './DesktopIcon.module.css'

export default function DesktopIcon({ label, icon, onClick, href, external }) {
  const content = (
    <>
      <img
        src={icon}
        alt=""
        width={48}
        height={48}
        style={{ imageRendering: 'pixelated', display: 'block' }}
      />
      <span className={styles.label}>{label}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={styles.icon}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={styles.icon} onClick={onClick}>
      {content}
    </button>
  )
}
