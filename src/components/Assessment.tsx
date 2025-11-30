import React, { useState } from 'react';
import { User, AssessmentType } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface AssessmentProps {
  user: User;
  onComplete: (type: AssessmentType, results: any) => void;
  onBack: () => void;
}

const assessmentData = {
  'career-interest': {
    title: 'Career Interest Assessment',
    description: 'Discover what career fields align with your interests and passions',
    questions: [
      {
        id: 1,
        question: 'Which type of work environment appeals to you most?',
        type: 'radio' as const,
        options: [
          'Creative studio or design space',
          'Modern office with collaborative spaces',
          'Laboratory or research facility',
          'Outdoor or field-based locations',
          'Home office or remote workspace'
        ]
      },
      {
        id: 2,
        question: 'What motivates you most in your work?',
        type: 'radio' as const,
        options: [
          'Helping others and making a difference',
          'Creating innovative solutions',
          'Financial success and stability',
          'Recognition and leadership opportunities',
          'Personal growth and learning'
        ]
      },
      {
        id: 3,
        question: 'How do you prefer to solve problems?',
        type: 'radio' as const,
        options: [
          'Through creative and artistic expression',
          'Using data and analytical thinking',
          'Collaborating with others',
          'Through hands-on experimentation',
          'By researching and studying'
        ]
      },
      {
        id: 4,
        question: 'Rate your interest in technology and digital tools',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Interest Level'
      },
      {
        id: 5,
        question: 'Which work schedule would you prefer?',
        type: 'radio' as const,
        options: [
          'Traditional 9-5 weekdays',
          'Flexible hours with some remote work',
          'Project-based with varying schedules',
          'Evening or weekend hours',
          'Completely flexible/freelance'
        ]
      }
    ]
  },
  'personality': {
    title: 'Personality Profile',
    description: 'Understand your personality traits and how they relate to different careers',
    questions: [
      {
        id: 1,
        question: 'In social situations, you typically:',
        type: 'radio' as const,
        options: [
          'Seek out new people to meet',
          'Stick with people you know well',
          'Observe before engaging',
          'Take charge of conversations',
          'Prefer small group discussions'
        ]
      },
      {
        id: 2,
        question: 'When making decisions, you rely more on:',
        type: 'radio' as const,
        options: [
          'Logic and objective analysis',
          'Intuition and gut feelings',
          'Past experiences and proven methods',
          'Input from others and consensus',
          'Creative and innovative approaches'
        ]
      },
      {
        id: 3,
        question: 'Rate how comfortable you are with uncertainty and change',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Comfort Level'
      },
      {
        id: 4,
        question: 'Your ideal work style involves:',
        type: 'radio' as const,
        options: [
          'Working independently on focused tasks',
          'Collaborating closely with team members',
          'Leading and directing others',
          'Supporting and helping colleagues',
          'Balancing solo and team work'
        ]
      },
      {
        id: 5,
        question: 'Rate your preference for structured vs. flexible work environments',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Structure (1) vs Flexibility (10)'
      }
    ]
  },
  'skills': {
    title: 'Skills Evaluation',
    description: 'Assess your current skills and identify areas for development',
    questions: [
      {
        id: 1,
        question: 'Rate your communication and presentation skills',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Skill Level'
      },
      {
        id: 2,
        question: 'Which technical skills do you have experience with?',
        type: 'radio' as const,
        options: [
          'Programming and software development',
          'Data analysis and statistics',
          'Design and creative software',
          'Digital marketing and social media',
          'Project management tools'
        ]
      },
      {
        id: 3,
        question: 'Rate your problem-solving and critical thinking abilities',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Skill Level'
      },
      {
        id: 4,
        question: 'Your strongest interpersonal skill is:',
        type: 'radio' as const,
        options: [
          'Active listening and empathy',
          'Leadership and motivation',
          'Conflict resolution',
          'Team collaboration',
          'Networking and relationship building'
        ]
      },
      {
        id: 5,
        question: 'Rate your adaptability and learning agility',
        type: 'slider' as const,
        min: 1,
        max: 10,
        label: 'Skill Level'
      }
    ]
  }
};

export function Assessment({ user, onComplete, onBack }: AssessmentProps) {
  const [currentAssessment, setCurrentAssessment] = useState<AssessmentType>('career-interest');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const assessment = assessmentData[currentAssessment];
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment completed
      setIsCompleted(true);
      setTimeout(() => {
        onComplete(currentAssessment, answers);
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6 min-h-screen flex items-center justify-center">
        <Card className="text-center border-green-200">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
            <p className="text-gray-600 mb-4">
              Great job completing the {assessment.title}. 
              Your results are being processed...
            </p>
            <div className="animate-pulse bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="mb-4">
          <h1>{assessment.title}</h1>
          <p className="text-gray-600">{assessment.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestion.type === 'radio' && (
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === 'slider' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">
                  {answers[currentQuestion.id] || currentQuestion.min}
                </span>
                <p className="text-sm text-gray-500 mt-1">{currentQuestion.label}</p>
              </div>
              <Slider
                value={[answers[currentQuestion.id] || currentQuestion.min!]}
                onValueChange={(value) => handleAnswer(value[0])}
                min={currentQuestion.min}
                max={currentQuestion.max}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{currentQuestion.min}</span>
                <span>{currentQuestion.max}</span>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {currentQuestionIndex === assessment.questions.length - 1 ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}