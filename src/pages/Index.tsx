
import React from 'react';
import GPACalculator from '../components/GPACalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            GPA & CGPA Calculator
          </h1>
          <p className="text-lg text-pink-700 max-w-2xl mx-auto">
            Calculate your Grade Point Average and Cumulative Grade Point Average with ease
          </p>
        </div>
        <GPACalculator />
      </div>
    </div>
  );
};

export default Index;
