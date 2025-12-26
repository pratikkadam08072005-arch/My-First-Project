
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (role: 'faculty' | 'student', identifier: string, password: string) => void;
  onRegister: (role: 'faculty' | 'student', data: { name?: string, identifier: string, password: string }) => void;
  error?: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, error }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const validatePassword = (pass: string) => {
    return /[a-zA-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!identifier || !password || (isRegistering && role === 'student' && !name)) {
      setLocalError("All fields are mandatory.");
      return;
    }

    if (!validatePassword(password)) {
      setLocalError("Security key must include both letters and numbers.");
      return;
    }

    if (isRegistering) {
      onRegister(role, { name, identifier, password });
    } else {
      onLogin(role, identifier, password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl text-white shadow-xl mb-6 transition-all transform hover:rotate-3 ${role === 'faculty' ? 'bg-indigo-600' : 'bg-teal-600'}`}>
            <i className={`fas ${role === 'faculty' ? 'fa-user-shield' : 'fa-graduation-cap'} text-3xl`}></i>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Predictive</h1>
          <p className="text-slate-500 font-bold mt-1 tracking-widest uppercase text-[10px]">Secure Gateway</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-8">
            <button 
              onClick={() => { setRole('student'); setLocalError(null); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${role === 'student' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Student
            </button>
            <button 
              onClick={() => { setRole('faculty'); setLocalError(null); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${role === 'faculty' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Faculty
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            {isRegistering ? `Create ${role} Profile` : `Log in to ${role} Portal`}
          </h2>

          {(error || localError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
              <i className="fas fa-circle-exclamation"></i>
              <p className="text-xs font-bold uppercase tracking-tight">{error || localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegistering && role === 'student' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Legal Name</label>
                <input 
                  type="text"
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 text-sm"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {role === 'faculty' ? 'Faculty ID' : 'Mobile Number'}
              </label>
              <input 
                type="text"
                placeholder={role === 'faculty' ? "Enter reference ID" : "0000000000"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Security Key (Password)</label>
              <input 
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700 text-sm"
              />
              <p className="text-[9px] text-slate-400 font-medium italic mt-1">Must include letters and numbers.</p>
            </div>

            <button 
              type="submit"
              className={`w-full py-4 rounded-xl font-black text-white text-sm uppercase tracking-widest shadow-lg transition-all active:scale-[0.98] ${role === 'faculty' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700'}`}
            >
              {isRegistering ? 'Register Profile' : 'Access Dashboard'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setLocalError(null); }}
              className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
            >
              {isRegistering ? "Already registered? Log in" : "Need an account? Register here"}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]">
            Powered by PRATIK
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
