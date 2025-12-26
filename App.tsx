
import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import StudentList from './components/StudentList';
import StudentProfile from './components/StudentProfile';
import StudentDashboard from './components/StudentDashboard';
import AdminManagement from './components/AdminManagement';
import Login from './components/Login';
import { analyzeStudentPerformance } from './services/geminiService';
import { StudentData, PredictionResult } from './types';

// Storage Keys
const STUDENTS_KEY = 'sp_students_v2';
const ADMINS_KEY = 'sp_admins_v2';

type UserRole = 'faculty' | 'student' | null;
type AppView = 'home' | 'directory' | 'analysis' | 'student-portal' | 'profile' | 'manage-admins';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [view, setView] = useState<AppView>('home');
  const [students, setStudents] = useState<StudentData[]>([]);
  const [admins, setAdmins] = useState<{ identifier: string, password: string }[]>([]);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    const savedStudents = localStorage.getItem(STUDENTS_KEY);
    const savedAdmins = localStorage.getItem(ADMINS_KEY);
    
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch (e) {
        console.error("Error parsing students", e);
      }
    }
    if (savedAdmins) {
      try {
        setAdmins(JSON.parse(savedAdmins));
      } catch (e) {
        console.error("Error parsing admins", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
  }, [admins]);

  const handleRegister = (role: 'faculty' | 'student', data: { name?: string, identifier: string, password: string }) => {
    setLoginError(null);
    
    if (role === 'faculty') {
      const existing = admins.find(a => a.identifier === data.identifier);
      if (existing) {
        setLoginError("This Faculty ID is already registered.");
        return;
      }
      setAdmins(prev => [...prev, { identifier: data.identifier, password: data.password }]);
      alert("Faculty registration successful! You can now log in.");
    } else {
      const existing = students.find(s => s.mobile === data.identifier);
      if (existing) {
        setLoginError("This mobile number is already registered.");
        return;
      }
      
      const newStudent: StudentData = {
        id: Date.now().toString(),
        name: data.name || 'Anonymous Student',
        mobile: data.identifier,
        password: data.password,
        address: '',
        motherName: '',
        fatherName: '',
        className: '10th',
        division: 'A',
        dob: '',
        subject: 'General Studies',
        previousGrade: 0,
        attendanceRate: 0,
        studyHours: 0,
        sleepHours: 8,
        extracurriculars: false,
        internetAccess: true,
        parentalInvolvement: 'Medium',
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
      };
      
      setStudents(prev => [...prev, newStudent]);
      alert("Student registration successful! You can now log in.");
    }
  };

  const handleLogin = (selectedRole: 'faculty' | 'student', identifier: string, password: string) => {
    setLoginError(null);

    if (selectedRole === 'faculty') {
      const admin = admins.find(a => a.identifier === identifier && a.password === password);
      if (admin) {
        setRole('faculty');
        setView('directory');
      } else {
        setLoginError("Invalid faculty credentials.");
      }
    } else {
      const student = students.find(s => s.mobile === identifier && s.password === password);
      if (student) {
        setRole('student');
        setStudentData(student);
        setView('student-portal');
      } else {
        setLoginError("Invalid student credentials.");
      }
    }
  };

  const handleAddAdmin = (identifier: string, password: string) => {
    const existing = admins.find(a => a.identifier === identifier);
    if (existing) {
      alert("This Faculty ID is already in the registry.");
      return;
    }
    setAdmins(prev => [...prev, { identifier, password }]);
    alert("New administrator added successfully.");
  };

  const handleAnalyze = async (data: StudentData) => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
        }
    }

    setLoading(true);
    setError(null);
    try {
      const result = await analyzeStudentPerformance(data);
      setPrediction(result);
      if (view !== 'profile' && view !== 'student-portal') {
        setView('analysis');
      }
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found")) {
        setError("API key verification failed. Please check your AI Studio billing.");
      } else {
        setError("Predictive analysis failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = (updatedData: StudentData) => {
    setStudents(prev => prev.map(s => s.id === updatedData.id ? updatedData : s));
    setStudentData(updatedData);
    handleAnalyze(updatedData);
  };

  const handleViewStudentProfile = (student: StudentData) => {
    setStudentData(student);
    setPrediction(null);
    setView('profile');
    handleAnalyze(student);
  };

  const navigateTo = (newView: AppView) => {
    if (newView === 'home' && role === 'faculty') {
      setPrediction(null);
      setStudentData(null);
    }
    setView(newView);
    setError(null);
  };

  if (!role) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} error={loginError} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo(role === 'faculty' ? 'directory' : 'student-portal')}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${role === 'faculty' ? 'bg-indigo-600' : 'bg-teal-600'}`}>
              <i className={`fas ${role === 'faculty' ? 'fa-user-shield' : 'fa-graduation-cap'} text-xl`}></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Student Performance
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                {role === 'faculty' ? 'Faculty Admin' : 'Student Access'}
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {role === 'faculty' && (
              <>
                <button onClick={() => navigateTo('directory')} className={`text-sm font-bold transition-all ${view === 'directory' || view === 'profile' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>Directory</button>
                <button onClick={() => navigateTo('home')} className={`text-sm font-bold transition-all ${view === 'home' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>AI Simulator</button>
                <button onClick={() => navigateTo('manage-admins')} className={`text-sm font-bold transition-all ${view === 'manage-admins' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}>Manage Admins</button>
              </>
            )}
            {role === 'student' && (
              <button onClick={() => navigateTo('student-portal')} className={`text-sm font-bold transition-all ${view === 'student-portal' ? 'text-teal-600' : 'text-slate-500 hover:text-teal-600'}`}>My Dashboard</button>
            )}
          </nav>

          <button 
            onClick={() => { setRole(null); setPrediction(null); setStudentData(null); }}
            className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg transition-all"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-pulse">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Processing Analysis</h3>
              <p className="text-sm text-slate-500 mt-1">Consulting Gemini AI Predictive Core...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-md mx-auto p-6 bg-white border border-red-100 rounded-2xl text-center shadow-lg">
            <i className="fas fa-circle-exclamation text-red-500 text-3xl mb-4"></i>
            <p className="text-slate-700 font-bold mb-6">{error}</p>
            <button onClick={() => setError(null)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm">Dismiss</button>
          </div>
        )}

        {role === 'faculty' && view === 'home' && !loading && !error && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Simulation Hub</h2>
              <p className="text-slate-500 mt-2">Test hypothetical student data to explore academic outcomes.</p>
            </div>
            <StudentForm mode="simulator" onSubmit={(data) => handleAnalyze({...data, id: 'SIM-' + Date.now().toString()})} isLoading={loading} />
          </div>
        )}

        {role === 'faculty' && view === 'directory' && !loading && !error && (
          <StudentList students={students} onViewStudent={handleViewStudentProfile} />
        )}

        {role === 'faculty' && view === 'manage-admins' && !loading && !error && (
          <AdminManagement admins={admins} onAddAdmin={handleAddAdmin} />
        )}

        {role === 'faculty' && view === 'profile' && studentData && !loading && !error && (
          <StudentProfile 
            student={studentData} 
            prediction={prediction} 
            onBack={() => navigateTo('directory')}
            onRefreshAnalysis={() => handleAnalyze(studentData)}
            isLoading={loading}
          />
        )}

        {role === 'faculty' && view === 'analysis' && prediction && studentData && !loading && !error && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <i className="fas fa-microscope text-xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Analysis Complete</h2>
                  <p className="text-sm text-slate-500">Simulation for {studentData.subject}</p>
                </div>
              </div>
              <button onClick={() => navigateTo('home')} className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2">
                <i className="fas fa-plus"></i> New Scenario
              </button>
            </div>
            <AnalysisDashboard prediction={prediction} student={studentData} />
          </div>
        )}

        {role === 'student' && view === 'student-portal' && studentData && !loading && !error && (
          <StudentDashboard 
            student={studentData} 
            prediction={prediction} 
            onUpdateProfile={handleUpdateStudent}
            onRefresh={() => handleAnalyze(studentData)}
            isLoading={loading}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Powered by PRATIK</p>
          <p className="text-xs text-slate-500 mt-2">&copy; 2025 Predictive Student Performance Engine</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
