import styles from './SharedComponents.module.css'

export function Badge({ variant = 'blue', children }) {
  return <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>{children}</span>
}

export function Button({ variant = 'primary', size = 'md', onClick, children, fullWidth, disabled }) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]} ${fullWidth ? styles.fullWidth : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}

export function CardHeader({ title, action }) {
  return (
    <div className={styles.cardHeader}>
      <span className={styles.cardTitle}>{title}</span>
      {action}
    </div>
  )
}

export function CardBody({ children, noPad }) {
  return <div className={`${styles.cardBody} ${noPad ? styles.noPad : ''}`}>{children}</div>
}

export function ProgressBar({ value = 0, color, height = 4 }) {
  const bg = color || 'linear-gradient(90deg, var(--accent3), var(--accent))'
  return (
    <div className={styles.progressTrack} style={{ height }}>
      <div className={styles.progressFill} style={{ width: `${value}%`, background: bg }} />
    </div>
  )
}

export function StatCard({ label, value, sub, color = 'blue', icon }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        {icon && <span className={styles.statIcon}>{icon}</span>}
        <div className={styles.statLabel}>{label}</div>
      </div>
      <div className={`${styles.statVal} ${styles[`stat_${color}`]}`}>{value}</div>
      {sub && <div className={styles.statSub}>{sub}</div>}
    </div>
  )
}

export function Avatar({ initials, color1 = 'var(--accent2)', color2 = 'var(--accent)', size = 36 }) {
  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
      }}
    >
      {initials}
    </div>
  )
}

export function EmptyState({ emoji, title, subtitle }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyEmoji}>{emoji}</div>
      <div className={styles.emptyTitle}>{title}</div>
      {subtitle && <div className={styles.emptySub}>{subtitle}</div>}
    </div>
  )
}

export function Table({ headers, children }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
