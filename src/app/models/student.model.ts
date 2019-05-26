import { Course } from './course.model';

export class Student {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public courses?: Course[]
  ) {}
}

export class StudentCourses {
  constructor (public courses: string[]) {}
}