import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/auth';

export default function App() {
  const [page, setPage] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(API + '/me', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user.name);
          setPage('home');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user.name);
      setPage('home');
    } else {
      setMsg(data.message);
    }
  }

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(API + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('Account created! Please login.');
      setPage('login');
    } else {
      setMsg(data.message);
    }
  }

  async function logout() {
    await fetch(API + '/logout', { 
      method: 'POST', 
      credentials: 'include' 
    });
    setUser('');
    setPage('login');
  }

  const center: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  if (loading) {
    return <div style={center}>Loading...</div>;
  }

  if (page === 'home') {
    return (
      <div style={center}>
        <div>
          <h1>Welcome {user}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }

  if (page === 'signup') {
    return (
      <div style={center}>
        <div>
          <h2>Sign Up</h2>
          <p>{msg}</p>
          <form onSubmit={signup}>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <a href="#" onClick={() => setPage('login')}>Login</a></p>
        </div>
      </div>
    );
  }

  return (
    <div style={center}>
      <div>
        <h2>Login</h2>
        <p>{msg}</p>
        <form onSubmit={login}>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
          <button type="submit">Login</button>
        </form>
        <p>No account? <a href="#" onClick={() => setPage('signup')}>Sign Up</a></p>
      </div>
    </div>
  );
}
