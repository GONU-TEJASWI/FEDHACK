import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Compass, Star, TrendingUp, Users } from 'lucide-react';

interface WelcomeProps {
  onCompleteOnboarding: (userData: { name: string; email: string }) => void;
  onAdminLogin: () => void;
}

export function Welcome({ onCompleteOnboarding, onAdminLogin }: WelcomeProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onCompleteOnboarding({ name, email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Compass className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Career <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Compass</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your strengths, explore your personality, and find the perfect career path tailored just for you.
          </p>
        </div>

        {!showForm ? (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Discover Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Take comprehensive assessments to uncover your unique strengths and interests
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Get Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive personalized career suggestions based on your assessment results
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Explore Careers</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Browse detailed career information including skills, salary, and growth prospects
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg"
                onClick={() => setShowForm(true)}
              >
                Start Your Journey
              </Button>
              <div>
                <Button 
                  variant="link" 
                  onClick={onAdminLogin}
                  className="text-sm text-gray-500"
                >
                  Admin Login
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto border-blue-200">
            <CardHeader className="text-center">
              <CardTitle>Welcome to Career Compass</CardTitle>
              <CardDescription>
                Let's get you set up with a quick profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Get Started
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}