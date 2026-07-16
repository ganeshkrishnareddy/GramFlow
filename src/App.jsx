import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Users, Download, ShieldCheck, Zap, ArrowUpRight, ArrowDownRight, Menu, Landmark, Smartphone, X, CheckCircle, Home, User, FileText, Settings, HelpCircle } from 'lucide-react';
import './index.css';

const cashFlowData = [
  { name: 'Jan', inflow: 45000, outflow: 38000, projected: 45000 },
  { name: 'Feb', inflow: 42000, outflow: 39000, projected: 42000 },
  { name: 'Mar', inflow: 51000, outflow: 42000, projected: 51000 },
  { name: 'Apr', inflow: 48000, outflow: 40000, projected: 48000 },
  { name: 'May', inflow: 59000, outflow: 45000, projected: 59000 },
  { name: 'Jun', inflow: null, outflow: null, projected: 62000 },
  { name: 'Jul', inflow: null, outflow: null, projected: 65000 },
];

const allTransactions = [
  { id: 1, name: 'Ramesh Store', time: 'Today, 2:30 PM', amount: '+₹1,250', type: 'in' },
  { id: 2, name: 'Suresh Kirana', time: 'Today, 11:15 AM', amount: '+₹4,500', type: 'in' },
  { id: 3, name: 'Wholesale Market', time: 'Yesterday', amount: '-₹12,000', type: 'out' },
  { id: 4, name: 'Transport Services', time: 'Mon, 4:00 PM', amount: '-₹2,500', type: 'out' },
  { id: 5, name: 'Customer Payment', time: 'Mon, 10:00 AM', amount: '+₹3,000', type: 'in' },
];

const loanPortfolioData = [
  { id: 'LN-001', enterprise: 'Srikanth Kirana Store', owner: 'Ganesh Krishna', amount: '₹15,000', risk: 85, status: 'Active' },
  { id: 'LN-002', enterprise: 'Ramesh Agro Traders', owner: 'Ramesh Patel', amount: '₹45,000', risk: 42, status: 'High Risk' },
  { id: 'LN-003', enterprise: 'Laxmi Textiles', owner: 'Laxmi Devi', amount: '₹20,000', risk: 91, status: 'Paid' },
  { id: 'LN-004', enterprise: 'Balaji Hardware', owner: 'Suresh Sharma', amount: '₹35,000', risk: 78, status: 'Active' },
  { id: 'LN-005', enterprise: 'Venkateswara Dairy', owner: 'V. Rao', amount: '₹50,000', risk: 65, status: 'Pending Review' }
];

// Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      <CheckCircle size={20} color="var(--success)" />
      <span>{message}</span>
      <button onClick={onClose}><X size={16} /></button>
    </div>
  );
};

function App() {
  const [activeView, setActiveView] = useState('banker'); 
  const [toastMessage, setToastMessage] = useState(null);
  
  // Enterprise App States
  const [showAllTxs, setShowAllTxs] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleExport = () => {
    showToast('Financial Report exported successfully as PDF.');
  };

  const handleLoanSubmit = (e) => {
    e.preventDefault();
    if(loanAmount && loanPurpose) {
      setShowLoanModal(false);
      showToast(`Micro-Loan application for ₹${loanAmount} submitted for review.`);
      setLoanAmount('');
      setLoanPurpose('');
    }
  };

  const renderBankerDashboard = () => (
    <>
      <header className="header">
        <div className="logo-section">
          <Activity size={32} className="logo-icon" />
          <h1>GramFlow AI (Banker View)</h1>
        </div>
        <div className="header-actions">
          <button onClick={handleExport}>
            <Download size={18} />
            Export Report
          </button>
        </div>
      </header>

      <div className="grid-layout">
        <div className="card metric-card">
          <div className="metric-header">
            <span>Total Inflow (30d)</span>
            <DollarSign size={18} color="var(--success)" />
          </div>
          <div className="metric-value">₹59,000</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={16} />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>Enterprise Credit Score</span>
            <ShieldCheck size={18} color="var(--accent-color)" />
          </div>
          <div className="metric-value">85/100</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={16} />
            <span>Low Risk Profile</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>Predicted Default Risk</span>
            <AlertTriangle size={18} color="var(--warning)" />
          </div>
          <div className="metric-value">2.4%</div>
          <div className="metric-trend trend-down">
            <TrendingDown size={16} />
            <span>-0.8% from last month</span>
          </div>
        </div>

        <div className="card metric-card">
          <div className="metric-header">
            <span>Active Micro-Loans</span>
            <Users size={18} color="var(--accent-color)" />
          </div>
          <div className="metric-value">1</div>
          <div className="metric-trend">
            <span>Outstanding: ₹15,000</span>
          </div>
        </div>

        <div className="card chart-card">
          <div className="card-title">
            <Activity size={20} color="var(--accent-color)" />
            AI Cash Flow Prediction (Next 60 Days)
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer>
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="inflow" stroke="var(--success)" fillOpacity={1} fill="url(#colorInflow)" name="Actual Inflow" />
                <Area type="monotone" dataKey="projected" stroke="var(--accent-color)" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorProjected)" name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card risk-card">
          <div className="card-title">
            <Zap size={20} color="var(--warning)" />
            Risk Flagging Engine
          </div>
          
          <div className="score-circle">
            <span className="score-value">85</span>
          </div>

          <div className="risk-list">
            <div className="risk-item risk-low">
              <ShieldCheck size={20} color="var(--success)" />
              <div className="risk-content">
                <h4>Consistent UPI Inflows</h4>
                <p>Vendor payments are highly regular.</p>
              </div>
            </div>
            
            <div className="risk-item risk-medium">
              <AlertTriangle size={20} color="var(--warning)" />
              <div className="risk-content">
                <h4>Weather Anomaly Detected</h4>
                <p>Heavy rainfall may impact supply chain next week.</p>
              </div>
            </div>

            <div className="risk-item risk-high">
              <Activity size={20} color="var(--danger)" />
              <div className="risk-content">
                <h4>Outstanding Supplier Dues</h4>
                <p>Late payment identified for 2 local suppliers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card table-card">
          <div className="card-title">
            <FileText size={20} color="var(--accent-color)" />
            Enterprise Loan Portfolio
          </div>
          <div className="table-responsive">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Enterprise Details</th>
                  <th>Loan Amount</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanPortfolioData.map((loan) => (
                  <tr key={loan.id}>
                    <td style={{ fontWeight: '600' }}>{loan.id}</td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{loan.enterprise}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{loan.owner}</div>
                    </td>
                    <td style={{ fontWeight: '600' }}>{loan.amount}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className={`score-badge ${loan.risk >= 80 ? 'score-high' : loan.risk >= 60 ? 'score-med' : 'score-low'}`}>
                          {loan.risk}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${loan.status.toLowerCase().replace(' ', '-')}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn" onClick={() => setSelectedEnterprise(loan)}>
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedEnterprise && (
        <div className="modal-overlay" onClick={() => setSelectedEnterprise(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%' }}>
            <div className="modal-header">
              <h3>Enterprise Profile</h3>
              <button className="close-btn" onClick={() => setSelectedEnterprise(null)}>
                <X size={24} />
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
               <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                 <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--accent-glow)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   <User size={36} color="var(--accent-color)" />
                 </div>
                 <div>
                   <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>{selectedEnterprise.owner}</h2>
                   <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0.5rem 0', fontSize: '1rem' }}>{selectedEnterprise.enterprise}</p>
                   <span className={`status-badge status-${selectedEnterprise.status.toLowerCase().replace(' ', '-')}`}>
                     {selectedEnterprise.status}
                   </span>
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                 <div className="card" style={{ padding: '1rem', border: '1px solid var(--card-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Loan Amount</div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{selectedEnterprise.amount}</div>
                 </div>
                 <div className="card" style={{ padding: '1rem', border: '1px solid var(--card-border)' }}>
                   <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Risk Score</div>
                   <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: selectedEnterprise.risk >= 80 ? 'var(--success)' : selectedEnterprise.risk >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
                     {selectedEnterprise.risk} / 100
                   </div>
                 </div>
               </div>

               <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Recent UPI Activity</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div>
                     <div style={{ fontWeight: '500' }}>Supplier Payment</div>
                     <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Today, 10:30 AM</div>
                   </div>
                   <span style={{ color: 'var(--danger)', fontWeight: '600' }}>-₹{Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div>
                     <div style={{ fontWeight: '500' }}>Customer Sale (UPI)</div>
                     <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Yesterday, 4:15 PM</div>
                   </div>
                   <span style={{ color: 'var(--success)', fontWeight: '600' }}>+₹{Math.floor(Math.random() * 2000 + 500).toLocaleString()}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const displayedTxs = showAllTxs ? allTransactions : allTransactions.slice(0, 3);

  const renderEnterpriseApp = () => (
    <div className="mobile-app-container">
      
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={24} color="var(--accent-color)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Menu</h2>
          </div>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-nav">
          <div className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => {setIsMenuOpen(false); setActiveTab('home');}}>
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => {setIsMenuOpen(false); setActiveTab('profile');}}>
            <User size={20} />
            <span>My Profile</span>
          </div>
          <div className={`sidebar-item ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => {setIsMenuOpen(false); setActiveTab('loans');}}>
            <FileText size={20} />
            <span>My Loans</span>
          </div>
          <div className="sidebar-item" onClick={() => {setIsMenuOpen(false); showToast('Opened Settings');}}>
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="sidebar-item" onClick={() => {setIsMenuOpen(false); showToast('Opened Help');}}>
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={24} className="logo-icon" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>GramFlow App</h2>
        </div>
        <Menu size={24} color="var(--text-secondary)" style={{cursor: 'pointer'}} onClick={() => setIsMenuOpen(true)} />
      </div>

      {activeTab === 'home' && (
        <div className="mobile-body">
          <div className="mobile-balance-card">
            <div className="mobile-balance-title">Estimated Monthly Inflow</div>
            <div className="mobile-balance-amount">₹59,000</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
              <TrendingUp size={16} />
              Looking good! +12% from last month
            </div>
          </div>

          <div className="nudge-card">
            <AlertTriangle size={24} color="var(--warning)" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--warning)' }}>Upcoming Rain Alert</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Heavy rain expected next week. Consider ordering your inventory early to avoid delays.</p>
            </div>
          </div>

          <div className="tx-list-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem' }}>Recent UPI Transactions</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)', cursor: 'pointer' }} onClick={() => setShowAllTxs(!showAllTxs)}>
                {showAllTxs ? 'Show less' : 'See all'}
              </span>
            </div>
            
            {(showAllTxs ? allTransactions : allTransactions.slice(0, 3)).map(tx => (
              <div key={tx.id} className="tx-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className={`tx-icon ${tx.type === 'in' ? 'tx-in' : 'tx-out'}`}>
                    {tx.type === 'in' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{tx.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tx.time}</div>
                  </div>
                </div>
                <div style={{ fontWeight: '600', color: tx.type === 'in' ? 'var(--success)' : 'inherit' }}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="loan-btn"
            onClick={() => setShowLoanModal(true)}
          >
            <Landmark size={20} />
            Apply for Micro-Loan
          </button>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="mobile-body">
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-glow)', margin: '0 auto 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <User size={40} color="var(--accent-color)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Ganesh Krishna</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Srikanth Kirana Store</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
              <ShieldCheck size={16} /> KYC Verified
            </div>
          </div>
          
          <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Business Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GSTIN</span>
                <span style={{ fontWeight: '500' }}>27AADCS1234F1Z9</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Phone</span>
                <span style={{ fontWeight: '500' }}>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Location</span>
                <span style={{ fontWeight: '500' }}>Pune, Maharashtra</span>
              </div>
            </div>
          </div>
          
          <button style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginTop: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
            <Settings size={18} /> Edit Profile
          </button>
        </div>
      )}

      {activeTab === 'loans' && (
        <div className="mobile-body">
           <h3 style={{ marginBottom: '1rem' }}>My Loans</h3>
           <div className="card" style={{ padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(0,0,0,0) 100%)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <div>
                 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Working Capital</span>
                 <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹15,000</div>
               </div>
               <span className="status-badge status-active">ACTIVE</span>
             </div>
             
             <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
               <span>Repaid: ₹5,000</span>
               <span>Remaining: ₹10,000</span>
             </div>
             <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.25rem' }}>
               <div style={{ width: '33%', height: '100%', background: 'var(--success)', borderRadius: '4px' }}></div>
             </div>
             
             <button style={{ width: '100%', padding: '0.75rem', background: 'var(--success)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
               Pay EMI (₹2,500)
             </button>
           </div>
           
           <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Past Loans</h4>
           <div className="card" style={{ padding: '1.25rem', opacity: 0.7 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>₹10,000</div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Closed Jan 2026</div>
               </div>
               <span className="status-badge status-paid" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>PAID</span>
             </div>
           </div>
        </div>
      )}

      {showLoanModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Apply for Micro-Loan</h3>
              <button onClick={() => setShowLoanModal(false)} className="close-btn"><X size={20} /></button>
            </div>
            <form onSubmit={handleLoanSubmit} className="modal-form">
              <div className="form-group">
                <label>Loan Amount (₹)</label>
                <input 
                  type="number" 
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="e.g. 50000" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <select 
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  required
                >
                  <option value="">Select purpose...</option>
                  <option value="inventory">Purchase Inventory</option>
                  <option value="equipment">Buy Equipment</option>
                  <option value="expansion">Store Expansion</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard-container" style={{ maxWidth: activeView === 'enterprise' ? '100%' : '1400px' }}>
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <div className="view-toggle">
        <button 
          className={activeView === 'banker' ? 'active' : ''} 
          onClick={() => setActiveView('banker')}
        >
          <Landmark size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
          Banker Dashboard
        </button>
        <button 
          className={activeView === 'enterprise' ? 'active' : ''} 
          onClick={() => setActiveView('enterprise')}
        >
          <Smartphone size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
          Enterprise App
        </button>
      </div>

      {activeView === 'banker' ? renderBankerDashboard() : renderEnterpriseApp()}
      
    </div>
  );
}

export default App;
