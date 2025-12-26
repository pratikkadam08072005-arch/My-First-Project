
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { PredictionResult, StudentData } from '../types';

interface AnalysisDashboardProps {
  prediction: PredictionResult;
  student: StudentData;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ prediction, student }) => {
  const levelColors = {
    'Exceptional': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Above Average': 'bg-blue-100 text-blue-700 border-blue-200',
    'Average': 'bg-slate-100 text-slate-700 border-slate-200',
    'Below Average': 'bg-orange-100 text-orange-700 border-orange-200',
    'At Risk': 'bg-red-100 text-red-700 border-red-200',
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'High': return 'text-rose-600 bg-rose-50';
      case 'Medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-sky-600 bg-sky-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Predicted Outcome</p>
          <div className="text-5xl font-black text-indigo-600 mb-2">{prediction.predictedGrade}%</div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${levelColors[prediction.performanceLevel]}`}>
            {prediction.performanceLevel}
          </span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Confidence Score</p>
          <div className="text-5xl font-black text-violet-600 mb-2">{prediction.confidenceScore}%</div>
          <div className="w-full max-w-[120px] bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500 rounded-full transition-all duration-1000" 
              style={{ width: `${prediction.confidenceScore}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Risk Profile</p>
          <div className="space-y-2">
            {prediction.riskFactors.map((risk, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                <i className="fas fa-triangle-exclamation text-amber-500 text-xs"></i>
                {risk}
              </div>
            ))}
            {prediction.riskFactors.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <i className="fas fa-check-circle"></i>
                No major risks detected
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Breakdown Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-indigo-500"></i>
            Student Skill Breakdown
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={prediction.skillBreakdown}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Text */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-y-auto max-h-[380px]">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-brain text-violet-500"></i>
            AI Performance Analysis
          </h3>
          <div className="prose prose-slate prose-sm text-slate-600 leading-relaxed">
            <p className="whitespace-pre-line">{prediction.analysis}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <i className="fas fa-lightbulb text-amber-500"></i>
          Strategic Success Roadmap
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prediction.recommendations.map((rec, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">{rec.category}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getImpactColor(rec.impact)}`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                {rec.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
