
import React, { useState } from 'react';

interface AdminManagementProps {
  admins: { identifier: string }[];
  onAddAdmin: (identifier: string, password: string) => void;
}

const AdminManagement: React.FC<AdminManagementProps> = ({ admins, onAddAdmin }) => {
  const [newId, setNewId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newPassword) {
      alert("Please provide both ID and Security Key.");
      return;
    }
    onAddAdmin(newId, newPassword);
    setNewId('');
    setNewPassword('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Administrator Management</h2>
        <p className="text-slate-500 mt-2">Authorize and manage faculty access credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-plus-circle text-indigo-600"></i> Register New Admin
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Faculty ID</label>
                <input 
                  type="text" 
                  value={newId} 
                  onChange={(e) => setNewId(e.target.value)}
                  placeholder="e.g. FAC-2025-001"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Security Key</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                <i className="fas fa-shield-alt"></i> Authorize Admin
              </button>
            </form>
          </div>
        </div>

        {/* List Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Authorized Personnel</h3>
              <p className="text-xs text-slate-500 font-medium">Currently active administrative identifiers.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identifier</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Access Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {admins.map((admin, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xs font-black">
                            {admin.identifier[0].toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-800 text-sm">{admin.identifier}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase">
                          Executive Faculty
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="flex items-center justify-end gap-2 text-emerald-600 text-[10px] font-bold uppercase">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
