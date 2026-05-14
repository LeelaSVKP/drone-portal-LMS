import { useState } from 'react'
import { Card, CardHeader, CardBody, Button, Badge, StatCard } from '../../components/shared/SharedComponents'
import { DollarSign, CreditCard, TrendingUp, Download, Filter, ArrowUpRight, ArrowDownRight, CheckCircle2, RefreshCw, Search } from 'lucide-react'
import styles from '../student/StudentDashboard.module.css'

export default function RevenuePayments() {
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    { id: 'TXN-1001', user: 'Ravi Kumar', plan: 'Pro Pilot', amount: '₹14,999', status: 'Success', date: '2025-05-01' },
    { id: 'TXN-1002', user: 'Amit Singh', plan: 'Starter Pack', amount: '₹4,999', status: 'Success', date: '2025-05-02' },
    { id: 'TXN-1003', user: 'Sonia Ray', plan: 'Enterprise', amount: '₹45,000', status: 'Pending', date: '2025-05-03' },
    { id: 'TXN-1004', user: 'Vikram Mehta', plan: 'Pro Pilot', amount: '₹14,999', status: 'Failed', date: '2025-05-04' },
  ]

  const handleExport = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowToast('Financial report exported successfully!')
      setTimeout(() => setShowToast(null), 3000)
    }, 2000)
  }

  const filteredTxns = transactions.filter(t => 
    t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.plan.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.page + ' fade-in'}>
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--accent3)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 10000,
          animation: 'slide-in 0.3s ease-out'
        }}>
          <CheckCircle2 size={20} />
          <span style={{ fontWeight: '600' }}>{showToast}</span>
        </div>
      )}

      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className={styles.title}>Financial Overview</div>
        </div>
        <Button 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '140px' }}
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? <RefreshCw size={18} className="spin" /> : <Download size={18} />}
          <span>{loading ? 'Exporting...' : 'Export Report'}</span>
        </Button>
      </div>

      <div className={styles.statsGrid} style={{ marginTop: '30px' }}>
        <StatCard 
          label="Total Revenue" 
          value="₹12.45L" 
          sub="+18% growth" 
          color="green" 
          icon={<DollarSign size={16} />}
        />
        <StatCard 
          label="Active Subs" 
          value="842" 
          sub="32 new this week" 
          color="blue" 
          icon={<TrendingUp size={16} />}
        />
        <StatCard 
          label="Pending Payouts" 
          value="₹1.2L" 
          sub="Due to trainers" 
          color="yellow" 
          icon={<CreditCard size={16} />}
        />
      </div>

      <div style={{ marginTop: '30px' }}>
        <Card>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search transactions by user or plan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 38px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <Button variant="ghost" onClick={() => alert('Opening filters...')}><Filter size={16} /></Button>
          </div>
          <CardBody noPad>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>Transaction ID</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>User</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>Plan</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>Amount</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTxns.length > 0 ? filteredTxns.map(txn => (
                    <tr key={txn.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover-row">
                      <td style={{ padding: '16px', fontSize: '14px', color: '#fff', fontWeight: '500' }}>{txn.id}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text)' }}>{txn.user}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>{txn.plan}</td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#fff', fontWeight: '600' }}>{txn.amount}</td>
                      <td style={{ padding: '16px' }}>
                        <Badge variant={txn.status === 'Success' ? 'blue' : txn.status === 'Pending' ? 'yellow' : 'red'}>
                          {txn.status}
                        </Badge>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>{txn.date}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
