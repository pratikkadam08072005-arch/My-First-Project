
import React, { useState, useEffect, useRef } from 'react';
import { StudentData } from '../types';

interface StudentFormProps {
  onSubmit: (data: StudentData | Omit<StudentData, 'id'>) => void;
  isLoading: boolean;
  initialData?: StudentData;
  mode?: 'editor' | 'simulator';
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading, initialData, mode = 'editor' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isSimulator = mode === 'simulator';

  const [formData, setFormData] = useState<StudentData | Omit<StudentData, 'id'>>(initialData || {
    name: isSimulator ? 'Simulation Scenario' : '',
    mobile: '0000000000',
    address: 'N/A',
    motherName: 'N/A',
    fatherName: 'N/A',
    className: '10th',
    division: 'A',
    dob: '2000-01-01',
    subject: 'Mathematics',
    previousGrade: 75,
    attendanceRate: 90,
    studyHours: 10,
    sleepHours: 7,
    extracurriculars: true,
    internetAccess: true,
    parentalInvolvement: 'Medium',
    profileImage: undefined,
    academicYear: '2024-2025',
    extracurricularLevel: 'None',
    studyEnvironment: 'Home',
    studyMethod: 'Visual',
    participationLevel: 'Sometimes',
    groupStudyFrequency: 'Never',
    techUsage: '',
    socialMediaLevel: 'Moderate',
    stressLevel: 'Manageable',
    activityLevel: 'Light',
    nutritionHabits: 'Average'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(val) : val
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={`bg-white p-6 rounded-3xl border ${isSimulator ? 'border-violet-200 shadow-violet-50' : 'border-slate-200'} shadow-sm space-y-8`}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {!isSimulator && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center cursor-pointer overflow-hidden group relative transition-all hover:border-indigo-400"
              >
                {formData.profileImage ? (
                  <>
                    <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-camera text-white text-xl"></i>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <i className="fas fa-user-plus text-slate-300 text-2xl mb-2 group-hover:text-indigo-400"></i>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Photo</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              {formData.profileImage && (
                <button type="button" onClick={() => setFormData(prev => ({...prev, profileImage: undefined}))} className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Remove Photo</button>
              )}
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Mobile Number</label>
                <input required name="mobile" type="tel" value={formData.mobile} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Academic Session</label>
                <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Date of Birth</label>
                <input required name="dob" type="date" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </div>
        )}

        {isSimulator && (
          <div className="p-4 bg-violet-50 rounded-2xl border border-violet-100 flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-violet-600 shadow-sm">
                <i className="fas fa-flask-vial text-xl"></i>
             </div>
             <div>
                <h4 className="font-bold text-violet-900">Anonymous Simulation</h4>
                <p className="text-xs text-violet-600 font-medium">Adjust variables below to predict academic outcomes. No data is stored.</p>
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pillar 1: Academic & Background */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
              <i className="fas fa-graduation-cap text-indigo-500"></i> Academic Data
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Subject of Analysis</label>
                <input required name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Mathematics" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Previous Grade (%)</label>
                <input type="number" name="previousGrade" value={formData.previousGrade} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Study Hours/Day</label>
                <input type="number" name="studyHours" value={formData.studyHours} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Attendance Rate (%)</label>
                <input type="number" name="attendanceRate" value={formData.attendanceRate} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
          </div>

          {/* Pillar 2: Study Habits */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
              <i className="fas fa-book-reader text-blue-500"></i> Study Habits
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Preferred Method</label>
                <select name="studyMethod" value={formData.studyMethod} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Visual">Visual</option>
                  <option value="Auditory">Auditory</option>
                  <option value="Reading/Writing">Reading/Writing</option>
                  <option value="Kinesthetic">Kinesthetic</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Environment</label>
                <select name="studyEnvironment" value={formData.studyEnvironment} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Quiet Room">Quiet Room</option>
                  <option value="Library">Library</option>
                  <option value="Café">Café</option>
                  <option value="Home">Home</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Participation</label>
                <select name="participationLevel" value={formData.participationLevel} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Rarely">Rarely</option>
                  <option value="Sometimes">Sometimes</option>
                  <option value="Usually">Usually</option>
                  <option value="Always">Always</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Extracurricular</label>
                <select name="extracurricularLevel" value={formData.extracurricularLevel} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="None">None</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pillar 3: Lifestyle */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
              <i className="fas fa-heartbeat text-amber-500"></i> Lifestyle
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Social Media</label>
                <select name="socialMediaLevel" value={formData.socialMediaLevel} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Minimal">Minimal</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                  <option value="Excessive">Excessive</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Stress Level</label>
                <select name="stressLevel" value={formData.stressLevel} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Low">Low</option>
                  <option value="Manageable">Manageable</option>
                  <option value="High">High</option>
                  <option value="Overwhelming">Overwhelming</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Activity Level</label>
                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Active">Active</option>
                  <option value="Very Active">Very Active</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Sleep Hours/Night</label>
                <input type="number" name="sleepHours" value={formData.sleepHours} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className={`w-full py-4 ${isSimulator ? 'bg-violet-600 hover:bg-violet-700' : (initialData ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700')} disabled:opacity-50 text-white font-black text-lg rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3`}>
          {isLoading ? (
            <><i className="fas fa-circle-notch animate-spin"></i> Processing...</>
          ) : (
            <>
              <i className={`fas ${isSimulator ? 'fa-bolt' : (initialData ? 'fa-save' : 'fa-brain')}`}></i> 
              {isSimulator ? 'Run AI Simulation' : (initialData ? 'Update Dossier' : 'Analyze & Save Student')}
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
