import styles from './Sidebar.module.css'

export default function Sidebar({ items, activePage, onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.scrollArea}>
        {items.map((section) => (
          <div key={section.section}>
            <div className={styles.sectionLabel}>{section.section}</div>
            {section.links.map((link) => (
              <button
                key={link.id}
                className={`${styles.navItem} ${activePage === link.id ? styles.active : ''}`}
                onClick={() => onNavigate(link.id)}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span>{link.label}</span>
                {link.badge && (
                  <span className={styles.navBadge}>{link.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.poweredBy}>Powered by</div>
        <img
          src="/ee38d279dc16a25dbb9bd122fdd16531803e567e.png"
          alt="Powered by"
          className={styles.footerLogo}
        />
      </div>
    </aside>
  )
}
