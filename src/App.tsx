import React, { useState } from 'react';
import { Welcome } from './components/Welcome';
import { StudentDashboard } from './components/StudentDashboard';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { CareerExplorer } from './components/CareerExplorer';
import { AdminDashboard } from './components/AdminDashboard';
import { Header } from './components/Header';

export type View = 'welcome' | 'dashboard' | 'assessment' | 'results' | 'explorer' | 'admin';
export type AssessmentType = 'career-interest' | 'personality' | 'skills';

export interface User {
  id: string;
  name: string;
  email: string;
  completedAssessments: AssessmentType[];
  results?: {
    careerInterest?: any;
    personality?: any;
    skills?: any;
  };
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCompleteOnboarding = (userData: Pick<User, 'name' | 'email'>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      completedAssessments: [],
      results: {}
    };
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleCompleteAssessment = (type: AssessmentType, results: any) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      completedAssessments: [...user.completedAssessments, type],
      results: {
        ...user.results,
        [type.replace('-', '')]: results
      }
    };
    setUser(updatedUser);
    setCurrentView('results');
  };

  const renderContent = () => {
    if (isAdmin) {
      return <AdminDashboard onBack={() => setIsAdmin(false)} />;
    }

    switch (currentView) {
      case 'welcome':
        return (
          <Welcome 
            onCompleteOnboarding={handleCompleteOnboarding}
            onAdminLogin={() => setIsAdmin(true)}
          />
        );
      case 'dashboard':
        return (
          <StudentDashboard 
            user={user!}
            onNavigate={setCurrentView}
          />
        );
      case 'assessment':
        return (
          <Assessment 
            user={user!}
            onComplete={handleCompleteAssessment}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      case 'results':
        return (
          <Results 
            user={user!}
            onNavigate={setCurrentView}
          />
        );
      case 'explorer':
        return (
          <CareerExplorer 
            onBack={() => setCurrentView('dashboard')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {user && !isAdmin && (
        <Header 
          user={user}
          currentView={currentView}
          onNavigate={setCurrentView}
        />
      )}
      {renderContent()}
    </div>
  );
}