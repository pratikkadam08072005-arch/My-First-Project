
import React, { useState, useEffect } from 'react';
import { StudentData, PredictionResult } from '../types';
import AnalysisDashboard from './AnalysisDashboard';
import StudentForm from './StudentForm';

interface StudentDashboardProps {
  student: StudentData;
  prediction: PredictionResult | null;
  onUpdateProfile: (data: StudentData) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  student, 
  prediction, 
  onUpdateProfile, 
  onRefresh,
  isLoading 
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [localData, setLocalData] = useState<StudentData>(student);

  // Sync local data if the student prop changes (e.g. from parent state update)
  useEffect(() => {
    setLocalData(student);
  }, [student]);

  const handleInputChange = (field: keyof StudentData, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateAndAnalyze = () => {
    onUpdateProfile(localData);
  };

  const OptionButton = ({ field, value, current, label }: { field: keyof StudentData, value: any, current: any, label: string }) => (
    <button
      onClick={() => handleInputChange(field, value)}
      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
        current === value 
          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
          : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Welcome Hero */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-lg ring-4 ring-emerald-50">
            {student.profileImage ? (
              <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-2xl">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Hello, <span className="text-emerald-600">{student.name.split(' ')[0]}</span>
            </h2>
            <p className="text-slate-500 font-medium">Keep your metrics updated for the most accurate AI Roadmap.</p>
          </div>
          <button 
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all flex items-center gap-2"
          >
            <i className={`fas ${isEditingProfile ? 'fa-chart-pie' : 'fa-user-circle'}`}></i>
            {isEditingProfile ? 'View Dashboard' : 'My Profile'}
          </button>
        </div>
      </div>

      {isEditingProfile ? (
        <div className="animate-in slide-in-from-right-4 duration-500">
          <div className="mb-6">
            <h3 className="text-xl font-black text-slate-800">My Identity Profile</h3>
            <p className="text-sm text-slate-500">Update your personal and family details here.</p>
          </div>
          <StudentForm 
            initialData={student} 
            onSubmit={(data) => {
              onUpdateProfile(data as StudentData);
              setIsEditingProfile(false);
            }} 
            isLoading={isLoading} 
          />
        </div>
      ) : (
        <>
          {/* Interactive Metrics - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Col 1: Academic Metrics */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                <i className="fas fa-graduation-cap"></i>
                Academic Metrics
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Study hours (per day)</label>
                  <input 
                    type="number" 
                    value={localData.studyHours} 
                    onChange={(e) => handleInputChange('studyHours', Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Attendance (%)</label>
                  <input 
                    type="number" 
                    value={localData.attendanceRate} 
                    onChange={(e) => handleInputChange('attendanceRate', Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Extracurricular Involvement</label>
                  <div className="flex flex-wrap gap-2">
                    <OptionButton field="extracurricularLevel" value="None" current={localData.extracurricularLevel} label="None" />
                    <OptionButton field="extracurricularLevel" value="Occasional" current={localData.extracurricularLevel} label="Occasional" />
                    <OptionButton field="extracurricularLevel" value="Active" current={localData.extracurricularLevel} label="Active" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Sleep hours (per night)</label>
                  <input 
                    type="number" 
                    value={localData.sleepHours} 
                    onChange={(e) => handleInputChange('sleepHours', Number(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Col 2: Study Habits */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                <i className="fas fa-book-reader"></i>
                Study Habits
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Study Environment</label>
                  <div className="flex flex-wrap gap-2">
                    {['Quiet Room', 'Library', 'Café', 'Home'].map(opt => (
                      <OptionButton key={opt} field="studyEnvironment" value={opt} current={localData.studyEnvironment} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Preferred Study Method</label>
                  <div className="flex flex-wrap gap-2">
                    {['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'].map(opt => (
                      <OptionButton key={opt} field="studyMethod" value={opt} current={localData.studyMethod} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Class Participation</label>
                  <div className="flex flex-wrap gap-2">
                    {['Rarely', 'Sometimes', 'Usually', 'Always'].map(opt => (
                      <OptionButton key={opt} field="participationLevel" value={opt} current={localData.participationLevel} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Group Study Frequency</label>
                  <div className="flex flex-wrap gap-2">
                    {['Never', 'Monthly', 'Weekly', 'Daily'].map(opt => (
                      <OptionButton key={opt} field="groupStudyFrequency" value={opt} current={localData.groupStudyFrequency} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Technology Usage</label>
                  <input 
                    placeholder="e.g. iPad for notes, Laptop" 
                    value={localData.techUsage || ''} 
                    onChange={(e) => handleInputChange('techUsage', e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Col 3: Lifestyle Factors */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-amber-600 font-black text-xs uppercase tracking-widest">
                <i className="fas fa-heartbeat"></i>
                Lifestyle Factors
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Social Media Usage</label>
                  <div className="flex flex-wrap gap-2">
                    {['Minimal', 'Moderate', 'High', 'Excessive'].map(opt => (
                      <OptionButton key={opt} field="socialMediaLevel" value={opt} current={localData.socialMediaLevel} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Stress Level</label>
                  <div className="flex flex-wrap gap-2">
                    {['Low', 'Manageable', 'High', 'Overwhelming'].map(opt => (
                      <OptionButton key={opt} field="stressLevel" value={opt} current={localData.stressLevel} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Physical Activity</label>
                  <div className="flex flex-wrap gap-2">
                    {['Sedentary', 'Light', 'Active', 'Very Active'].map(opt => (
                      <OptionButton key={opt} field="activityLevel" value={opt} current={localData.activityLevel} label={opt} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nutrition Habits</label>
                  <div className="flex flex-wrap gap-2">
                    {['Poor', 'Average', 'Healthy', 'Excellent'].map(opt => (
                      <OptionButton key={opt} field="nutritionHabits" value={opt} current={localData.nutritionHabits} label={opt} />
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={handleUpdateAndAnalyze}
                  disabled={isLoading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-100 mt-4 flex items-center justify-center gap-2"
                >
                  {isLoading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-brain"></i>}
                  Update & Analyze
                </button>
              </div>
            </div>
          </div>

          {/* AI Success Roadmap */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900">My Success Roadmap</h3>
            </div>
            
            {prediction ? (
              <AnalysisDashboard prediction={prediction} student={student} />
            ) : (
              <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm text-center">
                <i className="fas fa-chart-line text-5xl text-slate-200 mb-6"></i>
                <p className="text-slate-400 font-bold">Input your metrics above and click "Update & Analyze" to reveal your roadmap.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
