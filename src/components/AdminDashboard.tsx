import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Settings,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

const mockStudentData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@email.com', assessments: 3, lastActive: '2 hours ago', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@email.com', assessments: 2, lastActive: '1 day ago', status: 'Active' },
  { id: 3, name: 'Carol Davis', email: 'carol@email.com', assessments: 1, lastActive: '3 days ago', status: 'Inactive' },
  { id: 4, name: 'David Wilson', email: 'david@email.com', assessments: 3, lastActive: '1 hour ago', status: 'Active' },
  { id: 5, name: 'Eva Brown', email: 'eva@email.com', assessments: 0, lastActive: '1 week ago', status: 'New' }
];

const mockCareerData = [
  { 
    id: 1, 
    title: 'Software Developer', 
    category: 'Technology', 
    views: 245, 
    matches: 89, 
    lastUpdated: '2 days ago',
    status: 'Published'
  },
  { 
    id: 2, 
    title: 'UX Designer', 
    category: 'Design', 
    views: 186, 
    matches: 67, 
    lastUpdated: '1 week ago',
    status: 'Published'
  },
  { 
    id: 3, 
    title: 'Data Analyst', 
    category: 'Analytics', 
    views: 203, 
    matches: 74, 
    lastUpdated: '3 days ago',
    status: 'Published'
  },
  { 
    id: 4, 
    title: 'Marketing Manager', 
    category: 'Marketing', 
    views: 142, 
    matches: 45, 
    lastUpdated: '5 days ago',
    status: 'Draft'
  }
];

const mockAnalytics = {
  totalUsers: 1247,
  activeUsers: 892,
  completedAssessments: 2156,
  avgCompletionRate: 78,
  popularCareers: ['Software Developer', 'UX Designer', 'Data Analyst'],
  recentActivity: [
    { user: 'Alice Johnson', action: 'Completed Skills Assessment', time: '30 minutes ago' },
    { user: 'Bob Smith', action: 'Viewed Software Developer career', time: '1 hour ago' },
    { user: 'Carol Davis', action: 'Started Personality Assessment', time: '2 hours ago' },
    { user: 'David Wilson', action: 'Completed all assessments', time: '3 hours ago' }
  ]
};

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [newCareer, setNewCareer] = useState({
    title: '',
    category: '',
    description: '',
    salaryRange: '',
    skills: ''
  });

  const handleAddCareer = () => {
    // Mock function to add new career
    console.log('Adding new career:', newCareer);
    setNewCareer({
      title: '',
      category: '',
      description: '',
      salaryRange: '',
      skills: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Platform
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage Career Compass platform</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700">
            Admin Access
          </Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Analytics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.activeUsers}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assessments</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.completedAssessments}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAnalytics.avgCompletionRate}%</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="careers">Career Database</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Overview</CardTitle>
                <CardDescription>
                  Manage student accounts and track their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Assessments</th>
                        <th className="text-left p-2">Last Active</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudentData.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-2 font-medium">{student.name}</td>
                          <td className="p-2 text-gray-600">{student.email}</td>
                          <td className="p-2">
                            <Badge variant="secondary">
                              {student.assessments}/3
                            </Badge>
                          </td>
                          <td className="p-2 text-sm text-gray-500">{student.lastActive}</td>
                          <td className="p-2">
                            <Badge className={`${
                              student.status === 'Active' ? 'bg-green-100 text-green-700' :
                              student.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {student.status}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <BarChart3 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Career Database Management</h2>
                <p className="text-gray-600">Add, edit, and manage career information</p>
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Career</span>
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Existing Careers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCareerData.map((career) => (
                      <div key={career.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{career.title}</h4>
                            <Badge variant="outline">{career.category}</Badge>
                            <Badge className={`${
                              career.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {career.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                            <span>{career.views} views</span>
                            <span>{career.matches} matches</span>
                            <span>Updated {career.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add New Career</CardTitle>
                  <CardDescription>
                    Create a new career entry for the database
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Career Title</label>
                      <Input
                        value={newCareer.title}
                        onChange={(e) => setNewCareer({...newCareer, title: e.target.value})}
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <Input
                        value={newCareer.category}
                        onChange={(e) => setNewCareer({...newCareer, category: e.target.value})}
                        placeholder="e.g., Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        value={newCareer.description}
                        onChange={(e) => setNewCareer({...newCareer, description: e.target.value})}
                        placeholder="Brief description of the career..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Salary Range</label>
                      <Input
                        value={newCareer.salaryRange}
                        onChange={(e) => setNewCareer({...newCareer, salaryRange: e.target.value})}
                        placeholder="e.g., $70,000 - $120,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Required Skills</label>
                      <Input
                        value={newCareer.skills}
                        onChange={(e) => setNewCareer({...newCareer, skills: e.target.value})}
                        placeholder="Comma-separated list of skills"
                      />
                    </div>
                    <Button onClick={handleAddCareer} className="w-full">
                      Add Career
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Career Paths</CardTitle>
                  <CardDescription>Most viewed and matched careers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.popularCareers.map((career, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{career}</span>
                        <Badge variant="secondary">
                          {Math.floor(Math.random() * 100 + 100)} matches
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest user actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-xs text-gray-500">{activity.action}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Completion Trends</CardTitle>
                <CardDescription>Track how students progress through assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">68%</div>
                    <div className="text-sm text-gray-600">Career Interest</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">74%</div>
                    <div className="text-sm text-gray-600">Personality</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">71%</div>
                    <div className="text-sm text-gray-600">Skills</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommendation Engine Settings</CardTitle>
                <CardDescription>
                  Configure how assessments map to career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Minimum match threshold</span>
                    <Input className="w-20" value="70%" readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Number of top recommendations</span>
                    <Input className="w-20" value="3" readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assessment weight - Interests</span>
                    <Input className="w-20" value="40%" readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assessment weight - Personality</span>
                    <Input className="w-20" value="35%" readOnly />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assessment weight - Skills</span>
                    <Input className="w-20" value="25%" readOnly />
                  </div>
                  <Button className="w-full">
                    Update Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>
                  General platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Allow guest users</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email notifications</span>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data export</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}