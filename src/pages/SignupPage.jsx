import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    try {
      signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-16">
      <Card>
        <h1 className="text-xl font-semibold mb-4">Daftar Akun Baru</h1>
        {error && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded mb-3">{error}</div>}
        <form onSubmit={handle} className="space-y-2">
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button className="w-full mt-2">Daftar</Button>
        </form>
      </Card>
    </div>
  );
}
