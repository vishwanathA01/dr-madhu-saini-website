import React, { useState } from 'react'
import { ArrowLeft, LogOut, RefreshCw, ShieldCheck } from 'lucide-react'
const api = import.meta.env.VITE_API_URL || '' // same domain; dev server proxies /api
export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('doctorAdminToken') || '')
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  async function load(value = token) {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${api}/api/appointments`, { headers: { Authorization: `Bearer ${value}` } })
      if (!res.ok) throw new Error(res.status === 401 ? 'Access denied. Check the admin token.' : 'Could not load enquiries.')
      const data = await res.json(); setItems(data); setLoaded(true); sessionStorage.setItem('doctorAdminToken', value); setToken(value)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  function logout() { sessionStorage.removeItem('doctorAdminToken'); setToken(''); setItems([]); setLoaded(false) }
  return <main className="admin-shell"><div className="admin-top"><a href="/" className="text-link"><ArrowLeft size={16}/> Back to website</a><span><ShieldCheck size={17}/> Private clinic dashboard</span></div>
    <div className="admin-card"><div className="eyebrow">Appointment management</div><h1>Enquiry dashboard</h1><p className="muted">Access is restricted to authorised clinic staff. Keep the admin token private.</p>
    {!loaded && <form onSubmit={e=>{e.preventDefault();load(token)}} className="admin-login"><label>Admin access token<input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Enter server admin token" required/></label><button className="btn primary">Access enquiries</button></form>}
    {error&&<p className="form-status error">{error}</p>}
    {loaded&&<><div className="admin-actions"><b>{items.length} recent {items.length===1?'enquiry':'enquiries'}</b><button className="btn secondary" onClick={()=>load()}><RefreshCw size={15}/> Refresh</button><button className="btn secondary" onClick={logout}><LogOut size={15}/> Sign out</button></div><div className="table-wrap"><table><thead><tr><th>Patient</th><th>Contact</th><th>Interested in</th><th>Preferred date</th><th>Session</th><th>Message</th><th>Status</th></tr></thead><tbody>{items.map(x=><tr key={x._id}><td>{x.name}<small>{new Date(x.createdAt).toLocaleString()}</small></td><td>{x.phone}<small>{x.email}</small></td><td>{x.interest||'—'}</td><td>{x.preferredDate||'—'}</td><td>{x.preferredTime||'—'}</td><td>{x.message||'—'}</td><td><span className="status-pill">{x.status}</span></td></tr>)}</tbody></table></div></>}
    {loading&&<p className="muted">Loading…</p>}
    </div></main>
}
