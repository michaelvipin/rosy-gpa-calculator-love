
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

const GPASemesterCalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      credits: 0,
      grade: ''
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  useEffect(() => {
    setGpa(calculateGPA());
  }, [courses]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={course.id} className="p-4 border-pink-200 bg-pink-50/50">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor={`course-${course.id}`} className="text-pink-700">
                    Course Name
                  </Label>
                  <Input
                    id={`course-${course.id}`}
                    placeholder="e.g., Mathematics"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="border-pink-300 focus:border-pink-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`credits-${course.id}`} className="text-pink-700">
                    Credit Hours
                  </Label>
                  <Input
                    id={`credits-${course.id}`}
                    type="number"
                    min="0"
                    max="10"
                    placeholder="3"
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                    className="border-pink-300 focus:border-pink-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`grade-${course.id}`} className="text-pink-700">
                    Grade
                  </Label>
                  <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, 'grade', value)}>
                    <SelectTrigger className="border-pink-300 focus:border-pink-500">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  {index === courses.length - 1 && (
                    <Button
                      onClick={addCourse}
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                  {courses.length > 1 && (
                    <Button
                      onClick={() => removeCourse(course.id)}
                      size="sm"
                      variant="destructive"
                      className="bg-rose-500 hover:bg-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Your GPA</h3>
          <p className="text-4xl font-bold">{gpa.toFixed(2)}</p>
          <p className="text-pink-100 mt-2">out of 4.00</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPASemesterCalculator;
