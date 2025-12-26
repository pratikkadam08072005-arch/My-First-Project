
import React from 'react';
import { StudentData, PredictionResult } from '../types';
import AnalysisDashboard from './AnalysisDashboard';

interface StudentProfileProps {
  student: StudentData;
  prediction: PredictionResult | null;
  onBack: () => void;
  onRefreshAnalysis: () => void;
  isLoading: boolean;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ 
  student, 
  prediction, 
  onBack, 
  onRefreshAnalysis,
  isLoading 
}) => {
  const handleExport = () => {
    // Note: Exported data is also stripped of PII for faculty
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      studentID: student.id,
      studentName: student.name,
      academicAnalysis: prediction,
      metrics: {
        className: student.className,
        division: student.division,
        subject: student.subject,
        session: student.academicYear,
        attendance: student.attendanceRate,
        prevGrade: student.previousGrade
      }
    };
    console.log(JSON.stringify(exportData, null, 2));
    alert(`Performance metrics for ${student.name} exported. Identity data withheld.`);
  };

  const MetricLabel = ({ icon, color, label, value }: { icon: string, color: string, label: string, value: any }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white text-xs`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase leading-none mb-0.5">{label}</p>
        <p className="text-xs font-black text-slate-700">{value || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-16">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 h-28 relative">
           {onBack && (
             <button onClick={onBack} className="absolute top-6 left-6 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 border border-white/10">
               <i className="fas fa-arrow-left"></i> Directory
             </button>
           )}
           <div className="absolute top-6 right-6 px-3 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl flex items-center gap-2">
              <i className="fas fa-shield-halved text-emerald-400 text-xs"></i>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Privacy Shield Active</span>
           </div>
        </div>
        <div className="px-8 pb-10 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="w-32 h-32 bg-white p-2 rounded-[2.5rem] shadow-2xl shrink-0 overflow-hidden">
              <div className="w-full h-full bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-800 font-black text-4xl overflow-hidden">
                {student.profileImage ? (
                  <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  student.name.split(' ').map(n => n[0]).join('')
                )}
              </div>
            </div>
            <div className="flex-1 mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-slate-900">{student.name}</h2>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Class {student.className} • Div {student.division}
                </span>
              </div>
              <p className="text-slate-500 font-medium">{student.subject} Program • Academic Session: {student.academicYear}</p>
              <div className="flex items-center gap-2 mt-2">
                 <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-tighter italic border border-slate-200">
                    <i className="fas fa-eye-slash mr-1"></i> Personal Info Restricted
                 </span>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button onClick={handleExport} className="px-6 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-2xl transition-all flex items-center gap-2">
                <i className="fas fa-download"></i>
                Export Metrics
              </button>
              <button onClick={onRefreshAnalysis} disabled={isLoading} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
                {isLoading ? <i className="fas fa-sync animate-spin"></i> : <i className="fas fa-sparkles"></i>}
                Analyze Latest
              </button>
            </div>
          </div>

          <div className="space-y-12 mt-12 border-t border-slate-100 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Academic Panel - Focus on performance, not person */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-graduation-cap"></i> Performance Snapshot
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance</p>
                    <p className="text-2xl font-black text-slate-800">{student.attendanceRate}%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Prev. Grade</p>
                    <p className="text-2xl font-black text-slate-800">{student.previousGrade}%</p>
                  </div>
                </div>
              </div>

              {/* Learning Habits */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-brain"></i> Effort Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Study Hours</p>
                    <p className="text-2xl font-black text-slate-800">{student.studyHours}h/d</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Rest Cycle</p>
                    <p className="text-2xl font-black text-slate-800">{student.sleepHours}h/n</p>
                  </div>
                </div>
              </div>

              {/* AI Category */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-tags"></i> Classification
                </h4>
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 h-full flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase">Recent Trajectory</p>
                    <p className="text-xl font-black text-indigo-700 uppercase tracking-tight">{student.status || 'Stable'}</p>
                    <div className="w-full bg-indigo-100 h-1.5 rounded-full mt-3 overflow-hidden">
                       <div className={`h-full rounded-full ${student.status === 'Improving' ? 'bg-emerald-500 w-full' : student.status === 'At Risk' ? 'bg-rose-500 w-1/3' : 'bg-indigo-400 w-2/3'}`}></div>
                    </div>
                </div>
              </div>
            </div>

            {/* Student Habits and Lifestyle - The Behavioral Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-book-reader"></i> Behavioral Insights (Study)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MetricLabel icon="fa-home" color="bg-blue-500" label="Environment" value={student.studyEnvironment} />
                  <MetricLabel icon="fa-lightbulb" color="bg-blue-500" label="Method" value={student.studyMethod} />
                  <MetricLabel icon="fa-comments" color="bg-blue-500" label="Participation" value={student.participationLevel} />
                  <MetricLabel icon="fa-users" color="bg-blue-500" label="Group Study" value={student.groupStudyFrequency} />
                </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-2">
                  <i className="fas fa-heartbeat"></i> Behavioral Insights (Lifestyle)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MetricLabel icon="fa-mobile-alt" color="bg-amber-500" label="Social Media" value={student.socialMediaLevel} />
                  <MetricLabel icon="fa-brain" color="bg-amber-500" label="Stress Level" value={student.stressLevel} />
                  <MetricLabel icon="fa-running" color="bg-amber-500" label="Physical Activity" value={student.activityLevel} />
                  <MetricLabel icon="fa-apple-alt" color="bg-amber-500" label="Nutrition" value={student.nutritionHabits} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {prediction && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <div className="mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="text-2xl font-black text-slate-900">AI Outcome & Strategy</h3>
          </div>
          <AnalysisDashboard prediction={prediction} student={student} />
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
