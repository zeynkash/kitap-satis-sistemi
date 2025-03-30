import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Giriş yapılıyor:', email);
    } else {
      setError('Lütfen tüm alanları doldurun');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Kitap Dünyası'na Hoş Geldiniz</h1>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" />
          <button type="submit">Giriş Yap</button>
        </form>
        <Link to="/register">Kayıt Ol</Link>
      </div>
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    if (formData.name && formData.email && formData.password) {
      console.log('Kayıt işlemi:', formData);
    } else {
      setError('Lütfen tüm alanları doldurun');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Kitap Dünyası'na Kayıt Olun</h1>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ad Soyad" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-posta" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Şifre" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Şifre Tekrar" />
          <button type="submit">Kayıt Ol</button>
        </form>
        <Link to="/login">Giriş Yap</Link>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
