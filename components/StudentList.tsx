
import React, { useState } from 'react';
import { StudentData } from '../types';

interface StudentListProps {
  students: StudentData[];
  onViewStudent: (student: StudentData) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onViewStudent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('All Sessions');

  const academicYears = Array.from(new Set(students.map(s => s.academicYear))).sort().reverse();

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'Improving': return 'bg-emerald-100 text-emerald-700';
      case 'At Risk': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === 'All Sessions' || s.academicYear === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
          <p className="text-sm text-slate-500">Performance oversight across academic sessions (Privacy Restricted).</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative">
            <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <select 
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none appearance-none cursor-pointer min-w-[160px] shadow-sm"
            >
              <option>All Sessions</option>
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
          </div>

          <div className="relative group">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm group-focus-within:text-indigo-500 transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search by student name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none w-full md:w-80 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student & Privacy Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Session</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class / Div</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Prev. Grade</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Attendance</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => {
                const isMatch = searchQuery.trim() !== '' && student.name.toLowerCase().includes(searchQuery.toLowerCase());
                
                return (
                  <tr 
                    key={student.id} 
                    className={`transition-all duration-300 group ${
                      isMatch 
                        ? 'bg-indigo-50/80 border-l-4 border-indigo-500' 
                        : 'hover:bg-slate-50/80 border-l-4 border-transparent'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm transition-colors overflow-hidden shrink-0 ${
                          isMatch ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          {student.profileImage ? (
                            <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                          ) : (
                            student.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className={`font-bold transition-colors ${isMatch ? 'text-indigo-900 scale-105 origin-left' : 'text-slate-800'}`}>
                            {student.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                             <i className="fas fa-lock text-[8px] text-emerald-500"></i>
                             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">Identity Protected</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold whitespace-nowrap">
                        {student.academicYear}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-700">{student.className}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Division {student.division}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-slate-800">{student.previousGrade}%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-black text-slate-800">{student.attendanceRate}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${getStatusStyle(student.status)}`}>
                        {student.status || 'Stable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onViewStudent(student)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                          isMatch 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                            : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        VIEW PERFORMANCE
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <i className="fas fa-user-slash text-4xl opacity-20"></i>
                    <p className="text-sm font-medium">No results for current filter/search</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between px-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Privacy Shield: {filteredStudents.length} Profiles Anonymized for Faculty View
        </p>
        <div className="flex gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Identity Security Active</span>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
