import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const name = user ? JSON.parse(user).name : null;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-lg font-semibold">Blog Platform</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-teal-300">Home</Link>
        {token && <Link to="/create" className="hover:text-teal-300">Create</Link>}
        {token ? (
          <button onClick={logout} className="ml-2 hover:text-teal-300">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:text-teal-300">Login</Link>
            <Link to="/register" className="hover:text-teal-300">Register</Link>
          </>
        )}
        {name && <span className="ml-4 italic">{name}</span>}
      </div>
    </nav>
  );
}
