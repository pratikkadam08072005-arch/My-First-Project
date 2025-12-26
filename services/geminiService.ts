
import { GoogleGenAI, Type } from "@google/genai";
import { StudentData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeStudentPerformance = async (data: StudentData): Promise<PredictionResult> => {
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    Analyze student academic performance for: ${data.subject}.
    
    Full Context:
    - Name: ${data.name} (Class ${data.className}-${data.division})
    - Family Involvement: ${data.parentalInvolvement}
    
    Academic Metrics:
    - Previous Grade: ${data.previousGrade}%
    - Attendance: ${data.attendanceRate}%
    - Study Hours/Day: ${data.studyHours}
    - Sleep Hours/Night: ${data.sleepHours}
    - Extracurricular: ${data.extracurricularLevel || (data.extracurriculars ? 'Active' : 'None')}

    Study Habits:
    - Environment: ${data.studyEnvironment || 'Not Specified'}
    - Method: ${data.studyMethod || 'Not Specified'}
    - Class Participation: ${data.participationLevel || 'Not Specified'}
    - Group Study: ${data.groupStudyFrequency || 'Not Specified'}
    - Tech Usage: ${data.techUsage || 'Not Specified'}

    Lifestyle Factors:
    - Social Media: ${data.socialMediaLevel || 'Not Specified'}
    - Stress Level: ${data.stressLevel || 'Not Specified'}
    - Physical Activity: ${data.activityLevel || 'Not Specified'}
    - Nutrition: ${data.nutritionHabits || 'Not Specified'}

    Provide a highly detailed analysis. Consider how study environment, nutrition, and stress levels specifically impact the ${data.subject} outcome.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          predictedGrade: { type: Type.NUMBER },
          performanceLevel: { 
            type: Type.STRING,
            enum: ['Exceptional', 'Above Average', 'Average', 'Below Average', 'At Risk']
          },
          confidenceScore: { type: Type.NUMBER },
          riskFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                action: { type: Type.STRING },
                impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
              },
              required: ['category', 'action', 'impact']
            }
          },
          analysis: { type: Type.STRING },
          skillBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                score: { type: Type.NUMBER }
              },
              required: ['name', 'score']
            }
          }
        },
        required: ['predictedGrade', 'performanceLevel', 'confidenceScore', 'riskFactors', 'recommendations', 'analysis', 'skillBreakdown']
      }
    }
  });

  const jsonStr = response.text;
  if (!jsonStr) throw new Error("Failed to get response from AI");
  return JSON.parse(jsonStr.trim());
};
