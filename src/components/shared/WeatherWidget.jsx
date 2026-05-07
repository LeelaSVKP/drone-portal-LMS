import { Wind, Cloud, Sun, Eye, Activity } from 'lucide-react'
import styles from './SharedComponents.module.css'

export default function WeatherWidget() {
  // Mock weather data
  const weather = {
    temp: 32,
    condition: 'Clear Sky',
    wind: '12 km/h',
    visibility: '10 km',
    kpIndex: 2,
    status: 'Safe to Fly',
    statusColor: 'var(--accent3)' // green
  }

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.weatherMain}>
        <div className={styles.weatherInfo}>
          <div className={styles.temp}>{weather.temp}°C</div>
          <div className={styles.condition}>{weather.condition}</div>
        </div>
        <div className={styles.weatherIcon}>
          <Sun size={48} color="var(--accent)" />
        </div>
      </div>
      
      <div className={styles.weatherGrid}>
        <div className={styles.weatherItem}>
          <Wind size={16} />
          <span>{weather.wind}</span>
          <label>Wind</label>
        </div>
        <div className={styles.weatherItem}>
          <Eye size={16} />
          <span>{weather.visibility}</span>
          <label>Visibility</label>
        </div>
        <div className={styles.weatherItem}>
          <Activity size={16} />
          <span>KP {weather.kpIndex}</span>
          <label>Magnetic</label>
        </div>
      </div>

      <div className={styles.flightStatus} style={{ borderColor: weather.statusColor }}>
        <div className={styles.statusDot} style={{ background: weather.statusColor }}></div>
        <span style={{ color: weather.statusColor }}>{weather.status}</span>
      </div>
    </div>
  )
}
