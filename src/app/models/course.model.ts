import { Student } from './student.model';
import { Instructor } from './instructor.model';

export class Course {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public courses?: Course[],
    public instructor?: string,
  ) {}
}

export interface CourseWithStudents {
  id: number;
  name: string;
  students: Student[];
}