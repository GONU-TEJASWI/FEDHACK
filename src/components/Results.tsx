import React from 'react';
import { User, View } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  Award, 
  Brain, 
  Heart, 
  Zap, 
  ArrowRight,
  Star,
  Target,
  BookOpen,
  Users
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ResultsProps {
  user: User;
  onNavigate: (view: View) => void;
}

// Mock data based on assessment results
const mockPersonalityData = [
  { trait: 'Analytical', value: 85 },
  { trait: 'Creative', value: 70 },
  { trait: 'Social', value: 60 },
  { trait: 'Leadership', value: 75 },
  { trait: 'Detail-Oriented', value: 90 },
  { trait: 'Adaptable', value: 65 }
];

const mockSkillsData = [
  { skill: 'Communication', level: 80 },
  { skill: 'Problem Solving', level: 85 },
  { skill: 'Technical', level: 70 },
  { skill: 'Creativity', level: 75 },
  { skill: 'Leadership', level: 65 }
];

const mockCareerMatches = [
  {
    title: 'Software Developer',
    match: 92,
    description: 'Create innovative software solutions and applications',
    salary: '$75,000 - $120,000',
    growth: 'High',
    requiredSkills: ['Programming', 'Problem Solving', 'Analytical Thinking'],
    personality: ['Detail-Oriented', 'Analytical', 'Creative']
  },
  {
    title: 'UX Designer',
    match: 87,
    description: 'Design user-friendly interfaces and experiences',
    salary: '$65,000 - $100,000',
    growth: 'Very High',
    requiredSkills: ['Design', 'User Research', 'Creativity'],
    personality: ['Creative', 'Social', 'Detail-Oriented']
  },
  {
    title: 'Data Analyst',
    match: 84,
    description: 'Analyze data to provide business insights',
    salary: '$60,000 - $95,000',
    growth: 'High',
    requiredSkills: ['Statistics', 'Data Visualization', 'Critical Thinking'],
    personality: ['Analytical', 'Detail-Oriented', 'Problem Solving']
  }
];

const mockRoadmap = [
  {
    phase: 'Short-term (3-6 months)',
    tasks: [
      'Complete relevant online courses',
      'Build a portfolio project',
      'Connect with professionals in the field'
    ]
  },
  {
    phase: 'Medium-term (6-12 months)',
    tasks: [
      'Apply for internships or entry-level positions',
      'Attend industry events and workshops',
      'Develop advanced technical skills'
    ]
  },
  {
    phase: 'Long-term (1-2 years)',
    tasks: [
      'Gain work experience in your chosen field',
      'Pursue additional certifications',
      'Build a professional network'
    ]
  }
];

export function Results({ user, onNavigate }: ResultsProps) {
  const completedCount = user.completedAssessments.length;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1>Your Career Assessment Results</h1>
        <p className="text-gray-600 mt-2">
          Based on {completedCount} completed assessment{completedCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Top Career Matches */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Your Top 3 Career Matches</span>
          </CardTitle>
          <CardDescription>
            Careers that align best with your interests, personality, and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {mockCareerMatches.map((career, index) => (
              <Card key={index} className={`border-2 ${index === 0 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                <CardContent className="p-6">
                  {index === 0 && (
                    <Badge className="mb-2 bg-yellow-500 hover:bg-yellow-600">
                      Best Match
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{career.title}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {career.match}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{career.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Salary Range:</span>
                      <span className="ml-2 text-gray-600">{career.salary}</span>
                    </div>
                    <div>
                      <span className="font-medium">Growth Outlook:</span>
                      <span className="ml-2 text-green-600">{career.growth}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-medium text-gray-700 mb-2">Key Skills Needed:</div>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personality Profile */}
        {user.completedAssessments.includes('personality') && (
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Personality Profile</span>
              </CardTitle>
              <CardDescription>Your key personality traits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={mockPersonalityData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Personality"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Your Strongest Traits:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockPersonalityData
                    .filter(trait => trait.value >= 80)
                    .map((trait, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-700">
                        {trait.trait}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills Assessment */}
        {user.completedAssessments.includes('skills') && (
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span>Skills Assessment</span>
              </CardTitle>
              <CardDescription>Your current skill levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSkillsData}>
                    <XAxis dataKey="skill" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="level" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Areas for Growth:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockSkillsData
                    .filter(skill => skill.level < 75)
                    .map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                        {skill.skill}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Career Journey Roadmap */}
      <Card className="border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Your Career Journey Roadmap</span>
          </CardTitle>
          <CardDescription>
            AI-powered personalized path to your dream career
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockRoadmap.map((phase, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  {index < mockRoadmap.length - 1 && (
                    <div className="w-0.5 h-16 bg-indigo-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg text-indigo-900">{phase.phase}</h3>
                  <ul className="mt-2 space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-gray-600 flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={() => onNavigate('explorer')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Explore Careers in Detail
        </Button>
        <Button 
          variant="outline"
          onClick={() => onNavigate('dashboard')}
        >
          Back to Dashboard
        </Button>
        {completedCount < 3 && (
          <Button 
            variant="outline"
            onClick={() => onNavigate('assessment')}
          >
            <Award className="w-4 h-4 mr-2" />
            Complete More Assessments
          </Button>
        )}
      </div>
    </div>
  );
}