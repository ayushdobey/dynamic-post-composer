import { useEffect, useState } from 'react';
import { api } from './api';

const emptyForm = { name: '', email: '', password: '' };

export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { api('/auth/me').then(({ user }) => setUser(user)).catch(() => {}); }, []);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('');
    try {
      const payload = mode === 'register' ? form : { email: form.email, password: form.password };
      const result = await api(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(payload) });
      setUser(result.user); setMessage(result.message); setForm(emptyForm);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };
  const openResource = async (path) => {
    setError(''); setMessage('');
    try { setMessage((await api(path)).message); } catch (e) { setError(e.message); }
  };
  const logout = async () => {
    try { setMessage((await api('/auth/logout', { method: 'POST' })).message); setUser(null); }
    catch (e) { setError(e.message); }
  };

  return <main className="page"><section className="card">
    <div className="heading"><span className="badge">FSD Experiment</span><h1>JWT + RBAC Lab</h1><p>Secure authentication and role-based route protection.</p></div>
    {user ? <section className="dashboard">
      <div className="user-row"><div><h2>Hello, {user.name}</h2><p>{user.email} · <strong>{user.role.toUpperCase()}</strong></p></div><button className="secondary" onClick={logout}>Logout</button></div>
      <div className="access"><h3>Try protected routes</h3><button onClick={() => openResource('/user/dashboard')}>Open User Dashboard</button><button onClick={() => openResource('/admin/dashboard')}>Open Admin Dashboard</button></div>
      <div className="role-note">User route: User + Admin &nbsp; | &nbsp; Admin route: Admin only</div>
    </section> : <>
      <div className="tabs"><button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError(''); }}>Login</button><button className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setError(''); }}>Register</button></div>
      <form onSubmit={submit}>
        {mode === 'register' && <label>Name<input name="name" value={form.name} onChange={change} minLength="2" required /></label>}
        <label>Email<input name="email" type="email" value={form.email} onChange={change} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={change} minLength="8" required /></label>
        <button className="submit" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Login securely' : 'Create account'}</button>
      </form>
      <p className="hint">Admin demo: <code>admin@example.com</code> / <code>Admin@123</code></p>
    </>}
    {message && <p className="notice success">{message}</p>}{error && <p className="notice error">{error}</p>}
  </section></main>;
}
