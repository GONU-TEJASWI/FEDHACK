import React from 'react';
import { User, View } from '../App';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Home, Compass, BarChart3, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  user: User;
  currentView: View;
  onNavigate: (view: View) => void;
}

export function Header({ user, currentView, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-xl text-gray-900">Career Compass</span>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
              <Button
                variant={currentView === 'explorer' ? 'default' : 'ghost'}
                onClick={() => onNavigate('explorer')}
                className="flex items-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Careers</span>
              </Button>
              <Button
                variant={currentView === 'results' ? 'default' : 'ghost'}
                onClick={() => onNavigate('results')}
                className="flex items-center space-x-2"
                disabled={user.completedAssessments.length === 0}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Results</span>
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.completedAssessments.length}/3 assessments</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}