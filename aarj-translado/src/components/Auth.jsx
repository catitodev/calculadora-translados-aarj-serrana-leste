import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Verifique seu email para confirmar o cadastro!');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-aarj-cream">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="card p-8 w-full max-w-sm animate-fade-in-up">
          <h2 className="font-heading text-xl font-bold text-aarj-text text-center mb-6">
            {isLogin ? 'Entrar' : 'Criar conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label"><span className="flex items-center gap-2"><Mail className="w-4 h-4 text-aarj-text-light" />Email</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="input-field" required />
            </div>

            <div>
              <label className="label"><span className="flex items-center gap-2"><Lock className="w-4 h-4 text-aarj-text-light" />Senha</span></label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="input-field" required />
            </div>

            {error && (
              <p className="text-sm text-aarj-error flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />{error}
              </p>
            )}

            {message && (
              <p className="text-sm text-aarj-success text-center">{message}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary mt-2">
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <button onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
            className="w-full mt-4 text-sm text-aarj-text-light hover:text-aarj-text transition-colors text-center">
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>
        </div>
      </main>
    </div>
  );
}