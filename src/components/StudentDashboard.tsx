import React from 'react';
import { User, View, AssessmentType } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Heart, 
  Zap, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Star,
  Award,
  ArrowRight
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onNavigate: (view: View) => void;
}

const assessments = [
  {
    id: 'career-interest' as AssessmentType,
    title: 'Career Interest Assessment',
    description: 'Discover what career fields align with your interests',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    estimatedTime: '10 min'
  },
  {
    id: 'personality' as AssessmentType,
    title: 'Personality Profile',
    description: 'Understand your personality traits and work style',
    icon: Brain,
    color: 'bg-blue-100 text-blue-600',
    estimatedTime: '15 min'
  },
  {
    id: 'skills' as AssessmentType,
    title: 'Skills Evaluation',
    description: 'Assess your current skills and identify areas for growth',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    estimatedTime: '12 min'
  }
];

const mockCareerRecommendations = [
  { title: 'Software Developer', match: 92 },
  { title: 'UX Designer', match: 87 },
  { title: 'Data Analyst', match: 84 }
];

export function StudentDashboard({ user, onNavigate }: StudentDashboardProps) {
  const completionPercentage = (user.completedAssessments.length / assessments.length) * 100;
  const completedCount = user.completedAssessments.length;
  const totalAssessments = assessments.length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1>Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-2">Continue your career discovery journey</p>
      </div>

      {/* Progress Overview */}
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Your Progress</span>
              </CardTitle>
              <CardDescription>
                {completedCount} of {totalAssessments} assessments completed
              </CardDescription>
            </div>
            {completedCount > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {completedCount} <Award className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-500">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
            
            {completionPercentage === 100 && (
              <div className="flex items-center justify-between mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">All assessments completed!</span>
                </div>
                <Button 
                  onClick={() => onNavigate('results')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  View Results
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assessments Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="mb-4">Career Assessments</h2>
            <div className="space-y-4">
              {assessments.map((assessment) => {
                const isCompleted = user.completedAssessments.includes(assessment.id);
                const Icon = assessment.icon;
                
                return (
                  <Card 
                    key={assessment.id} 
                    className={`border-2 transition-all hover:shadow-md ${
                      isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${assessment.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{assessment.title}</h3>
                              {isCompleted && <CheckCircle className="w-5 h-5 text-green-600" />}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{assessment.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{assessment.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {isCompleted ? (
                            <Button 
                              variant="outline" 
                              onClick={() => onNavigate('results')}
                              className="flex items-center space-x-2"
                            >
                              <span>View Results</span>
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => onNavigate('assessment')}
                              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              Start Assessment
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Career Recommendations */}
          {completedCount > 0 && (
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span>Top Career Matches</span>
                </CardTitle>
                <CardDescription>Based on your completed assessments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCareerRecommendations.slice(0, completedCount).map((career, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-sm">{career.title}</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {career.match}%
                    </Badge>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('explorer')}
                  className="w-full mt-4"
                >
                  Explore All Careers
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('explorer')}
                className="w-full justify-start"
              >
                <Heart className="w-4 h-4 mr-2" />
                Browse Careers
              </Button>
              {completedCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate('results')}
                  className="w-full justify-start"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View My Results
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}