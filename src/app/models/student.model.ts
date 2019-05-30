import { Course } from './course.model';
import { Exam } from './exam.model';

export class Student {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public courses?: Course[],
    public exams?: Exam[]
  ) {}
}

export class StudentCourses {
  constructor(public courses: string[]) {}
}