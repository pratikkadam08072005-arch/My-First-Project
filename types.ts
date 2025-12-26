
export interface StudentData {
  id: string;
  name: string;
  mobile: string;
  password?: string;
  address: string;
  motherName: string;
  fatherName: string;
  className: string;
  division: string;
  dob: string;
  subject: string;
  previousGrade: number;
  attendanceRate: number;
  studyHours: number;
  sleepHours: number;
  extracurriculars: boolean;
  internetAccess: boolean;
  parentalInvolvement: 'Low' | 'Medium' | 'High';
  status?: 'Stable' | 'Improving' | 'At Risk';
  profileImage?: string; // Base64 string
  academicYear: string; // e.g., "2023-2024"
  
  // New specific metrics
  extracurricularLevel?: 'None' | 'Occasional' | 'Active';
  studyEnvironment?: 'Quiet Room' | 'Library' | 'Café' | 'Shared Space' | 'Home';
  studyMethod?: 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';
  participationLevel?: 'Rarely' | 'Sometimes' | 'Usually' | 'Always';
  groupStudyFrequency?: 'Never' | 'Monthly' | 'Weekly' | 'Daily';
  techUsage?: string;
  socialMediaLevel?: 'Minimal' | 'Moderate' | 'High' | 'Excessive';
  stressLevel?: 'Low' | 'Manageable' | 'High' | 'Overwhelming';
  activityLevel?: 'Sedentary' | 'Light' | 'Active' | 'Very Active';
  nutritionHabits?: 'Poor' | 'Average' | 'Healthy' | 'Excellent';
}

export interface PredictionResult {
  predictedGrade: number;
  performanceLevel: 'Exceptional' | 'Above Average' | 'Average' | 'Below Average' | 'At Risk';
  confidenceScore: number;
  riskFactors: string[];
  recommendations: {
    category: string;
    action: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
  analysis: string;
  skillBreakdown: {
    name: string;
    score: number;
  }[];
}
