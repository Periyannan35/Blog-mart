import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-3xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Password" />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded-lg">Register</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">Already have an account? <Link to="/login" className="text-slate-900 font-semibold">Login</Link></p>
    </div>
  );
}
