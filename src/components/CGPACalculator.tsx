
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Semester {
  id: string;
  name: string;
  gpa: number;
  credits: number;
}

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', name: '', gpa: 0, credits: 0 }
  ]);
  const [cgpa, setCgpa] = useState<number>(0);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: '',
      gpa: 0,
      credits: 0
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      if (semester.gpa > 0 && semester.credits > 0) {
        totalPoints += semester.gpa * semester.credits;
        totalCredits += semester.credits;
      }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  useEffect(() => {
    setCgpa(calculateCGPA());
  }, [semesters]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {semesters.map((semester, index) => (
          <Card key={semester.id} className="p-4 border-pink-200 bg-pink-50/50">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor={`semester-${semester.id}`} className="text-pink-700">
                    Semester Name
                  </Label>
                  <Input
                    id={`semester-${semester.id}`}
                    placeholder="e.g., Fall 2023"
                    value={semester.name}
                    onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                    className="border-pink-300 focus:border-pink-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`gpa-${semester.id}`} className="text-pink-700">
                    Semester GPA
                  </Label>
                  <Input
                    id={`gpa-${semester.id}`}
                    type="number"
                    min="0"
                    max="4"
                    step="0.1"
                    placeholder="3.5"
                    value={semester.gpa || ''}
                    onChange={(e) => updateSemester(semester.id, 'gpa', parseFloat(e.target.value) || 0)}
                    className="border-pink-300 focus:border-pink-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`credits-${semester.id}`} className="text-pink-700">
                    Total Credits
                  </Label>
                  <Input
                    id={`credits-${semester.id}`}
                    type="number"
                    min="0"
                    max="30"
                    placeholder="15"
                    value={semester.credits || ''}
                    onChange={(e) => updateSemester(semester.id, 'credits', parseInt(e.target.value) || 0)}
                    className="border-pink-300 focus:border-pink-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  {index === semesters.length - 1 && (
                    <Button
                      onClick={addSemester}
                      size="sm"
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                  {semesters.length > 1 && (
                    <Button
                      onClick={() => removeSemester(semester.id)}
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

      <Card className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Your CGPA</h3>
          <p className="text-4xl font-bold">{cgpa.toFixed(2)}</p>
          <p className="text-pink-100 mt-2">Cumulative Grade Point Average</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-semibold">Total Semesters</p>
              <p className="text-lg">{semesters.filter(s => s.gpa > 0).length}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-semibold">Total Credits</p>
              <p className="text-lg">{semesters.reduce((sum, s) => sum + s.credits, 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CGPACalculator;
