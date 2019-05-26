import { Course } from './course.model';

export class Instructor {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public courses?: Course[]
  ) { }

}

export class InstructorCourses {
  constructor(public courses: string[]) {}
}