
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GPASemesterCalculator from './GPASemesterCalculator';
import CGPACalculator from './CGPACalculator';

const GPACalculator = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="gpa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm">
          <TabsTrigger 
            value="gpa" 
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            GPA Calculator
          </TabsTrigger>
          <TabsTrigger 
            value="cgpa" 
            className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"
          >
            CGPA Calculator
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="gpa">
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Semester GPA Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <GPASemesterCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cgpa">
          <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">Cumulative CGPA Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <CGPACalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GPACalculator;
