import { Student } from './student.model';
import { Instructor } from './instructor.model';

export class Course {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public students: Student[],
    public instructor?: string
  ) {}
}