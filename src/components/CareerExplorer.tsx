import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  BookOpen,
  ArrowLeft,
  Star,
  ArrowRight,
  Building
} from 'lucide-react';

interface CareerExplorerProps {
  onBack: () => void;
}

const mockCareers = [
  {
    id: 1,
    title: 'Software Developer',
    category: 'Technology',
    description: 'Design, develop, and maintain software applications and systems',
    salaryRange: '$75,000 - $120,000',
    growthOutlook: 'Very High (22%)',
    experience: 'Entry to Senior Level',
    education: 'Bachelor\'s in Computer Science or related field',
    skills: ['Programming', 'Problem Solving', 'Software Design', 'Testing', 'Version Control'],
    personality: ['Analytical', 'Detail-Oriented', 'Creative', 'Patient'],
    workEnvironment: 'Office, Remote-friendly',
    jobSatisfaction: 4.2,
    demandLevel: 'Very High',
    courses: ['Full Stack Web Development', 'Mobile App Development', 'Software Engineering'],
    companies: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta']
  },
  {
    id: 2,
    title: 'UX Designer',
    category: 'Design',
    description: 'Create intuitive and engaging user experiences for digital products',
    salaryRange: '$65,000 - $100,000',
    growthOutlook: 'High (13%)',
    experience: 'Entry to Senior Level',
    education: 'Bachelor\'s in Design, Psychology, or related field',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
    personality: ['Creative', 'Empathetic', 'Analytical', 'Communication'],
    workEnvironment: 'Office, Hybrid',
    jobSatisfaction: 4.1,
    demandLevel: 'High',
    courses: ['UX Research Methods', 'Design Thinking', 'Figma for Designers'],
    companies: ['Adobe', 'Airbnb', 'Uber', 'Netflix', 'Spotify']
  },
  {
    id: 3,
    title: 'Data Analyst',
    category: 'Analytics',
    description: 'Analyze complex data to help organizations make informed decisions',
    salaryRange: '$60,000 - $95,000',
    growthOutlook: 'High (25%)',
    experience: 'Entry to Mid Level',
    education: 'Bachelor\'s in Statistics, Mathematics, or Business',
    skills: ['SQL', 'Excel', 'Data Visualization', 'Statistical Analysis', 'Python/R'],
    personality: ['Analytical', 'Detail-Oriented', 'Logical', 'Curious'],
    workEnvironment: 'Office, Remote-friendly',
    jobSatisfaction: 3.9,
    demandLevel: 'Very High',
    courses: ['Data Analytics Fundamentals', 'SQL for Data Analysis', 'Tableau Visualization'],
    companies: ['IBM', 'Accenture', 'Deloitte', 'McKinsey', 'PwC']
  },
  {
    id: 4,
    title: 'Marketing Manager',
    category: 'Marketing',
    description: 'Develop and execute marketing strategies to promote products and services',
    salaryRange: '$55,000 - $90,000',
    growthOutlook: 'Moderate (10%)',
    experience: 'Mid to Senior Level',
    education: 'Bachelor\'s in Marketing, Business, or Communications',
    skills: ['Digital Marketing', 'Content Strategy', 'Analytics', 'Brand Management', 'SEO/SEM'],
    personality: ['Creative', 'Strategic', 'Communication', 'Leadership'],
    workEnvironment: 'Office, Hybrid',
    jobSatisfaction: 3.8,
    demandLevel: 'Moderate',
    courses: ['Digital Marketing Strategy', 'Content Marketing', 'Marketing Analytics'],
    companies: ['Procter & Gamble', 'Nike', 'Coca-Cola', 'HubSpot', 'Salesforce']
  },
  {
    id: 5,
    title: 'Product Manager',
    category: 'Management',
    description: 'Guide the development and strategy of products from conception to launch',
    salaryRange: '$85,000 - $130,000',
    growthOutlook: 'High (15%)',
    experience: 'Mid to Senior Level',
    education: 'Bachelor\'s in Business, Engineering, or related field',
    skills: ['Product Strategy', 'Market Research', 'Project Management', 'Analytics', 'Leadership'],
    personality: ['Strategic', 'Leadership', 'Communication', 'Analytical'],
    workEnvironment: 'Office, Hybrid',
    jobSatisfaction: 4.0,
    demandLevel: 'High',
    courses: ['Product Management Fundamentals', 'Agile Methodology', 'Product Analytics'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Slack', 'Atlassian']
  },
  {
    id: 6,
    title: 'Graphic Designer',
    category: 'Design',
    description: 'Create visual content for print and digital media',
    salaryRange: '$45,000 - $70,000',
    growthOutlook: 'Moderate (3%)',
    experience: 'Entry to Mid Level',
    education: 'Bachelor\'s in Graphic Design or related field',
    skills: ['Adobe Creative Suite', 'Typography', 'Layout Design', 'Branding', 'Print Design'],
    personality: ['Creative', 'Visual', 'Detail-Oriented', 'Artistic'],
    workEnvironment: 'Office, Freelance',
    jobSatisfaction: 3.7,
    demandLevel: 'Moderate',
    courses: ['Graphic Design Fundamentals', 'Adobe Illustrator', 'Brand Identity Design'],
    companies: ['Adobe', 'Pentagram', 'IDEO', 'Frog Design', 'R/GA']
  }
];

const categories = ['All', 'Technology', 'Design', 'Analytics', 'Marketing', 'Management'];
const salaryRanges = ['All', '$40k-$60k', '$60k-$80k', '$80k-$100k', '$100k+'];
const experienceLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level'];

export function CareerExplorer({ onBack }: CareerExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSalary, setSelectedSalary] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedCareer, setSelectedCareer] = useState<typeof mockCareers[0] | null>(null);

  const filteredCareers = mockCareers.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    
    let matchesSalary = true;
    if (selectedSalary !== 'All') {
      const salary = career.salaryRange;
      if (selectedSalary === '$40k-$60k') {
        matchesSalary = salary.includes('45,000') || salary.includes('55,000');
      } else if (selectedSalary === '$60k-$80k') {
        matchesSalary = salary.includes('65,000') || salary.includes('75,000');
      } else if (selectedSalary === '$80k-$100k') {
        matchesSalary = salary.includes('85,000') || salary.includes('95,000');
      } else if (selectedSalary === '$100k+') {
        matchesSalary = salary.includes('120,000') || salary.includes('130,000');
      }
    }

    const matchesExperience = selectedExperience === 'All' || 
                             career.experience.toLowerCase().includes(selectedExperience.toLowerCase());

    return matchesSearch && matchesCategory && matchesSalary && matchesExperience;
  });

  if (selectedCareer) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedCareer(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Career Explorer
        </Button>

        <div className="space-y-6">
          <div className="text-center">
            <h1>{selectedCareer.title}</h1>
            <p className="text-gray-600 mt-2">{selectedCareer.description}</p>
            <Badge className="mt-2 bg-blue-100 text-blue-700">
              {selectedCareer.category}
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="growth">Growth & Salary</TabsTrigger>
              <TabsTrigger value="learning">Learning Path</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span>Work Environment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedCareer.workEnvironment}</p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span>Job Satisfaction</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{selectedCareer.jobSatisfaction}/5</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span>Market Demand</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Demand Level:</span>
                        <Badge className={`${
                          selectedCareer.demandLevel === 'Very High' ? 'bg-green-100 text-green-700' :
                          selectedCareer.demandLevel === 'High' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {selectedCareer.demandLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth Outlook:</span>
                        <span className="text-green-600">{selectedCareer.growthOutlook}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Key Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personality Traits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.personality.map((trait, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-700">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Education Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedCareer.education}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedCareer.experience}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Essential Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedCareer.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span>Salary Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {selectedCareer.salaryRange}
                      </div>
                      <p className="text-sm text-gray-600">Annual salary range</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>Growth Projection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {selectedCareer.growthOutlook}
                      </div>
                      <p className="text-sm text-gray-600">Expected growth rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-purple-600" />
                    <span>Top Companies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.companies.map((company, index) => (
                      <Badge key={index} variant="outline" className="border-purple-300 text-purple-700">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    <span>Recommended Courses</span>
                  </CardTitle>
                  <CardDescription>
                    Start your learning journey with these courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCareer.courses.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{course}</span>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Career Pathway</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</div>
                      <div>
                        <h4 className="font-medium">Build Foundation Skills</h4>
                        <p className="text-sm text-gray-600">Complete relevant courses and gain basic knowledge</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</div>
                      <div>
                        <h4 className="font-medium">Gain Practical Experience</h4>
                        <p className="text-sm text-gray-600">Work on projects, internships, or entry-level positions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</div>
                      <div>
                        <h4 className="font-medium">Advance Your Career</h4>
                        <p className="text-sm text-gray-600">Develop leadership skills and specialize in your area</p>
                      </div>
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="mb-8">
        <h1>Explore Career Paths</h1>
        <p className="text-gray-600 mt-2">
          Discover detailed information about different careers, including salary, skills, and growth prospects
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSalary} onValueChange={setSelectedSalary}>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Career Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <Card 
            key={career.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
            onClick={() => setSelectedCareer(career)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-700">
                  {career.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{career.jobSatisfaction}</span>
                </div>
              </div>
              <CardTitle className="text-lg">{career.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {career.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Salary:</span>
                  <span className="text-sm text-green-600">{career.salaryRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Growth:</span>
                  <span className="text-sm text-blue-600">{career.growthOutlook.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Demand:</span>
                  <Badge className={`text-xs ${
                    career.demandLevel === 'Very High' ? 'bg-green-100 text-green-700' :
                    career.demandLevel === 'High' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {career.demandLevel}
                  </Badge>
                </div>
                <Button className="w-full mt-4 group">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
}