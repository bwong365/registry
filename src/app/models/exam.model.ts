import { Course } from './course.model';

export class Exam {
  constructor(public id: number,
              public score: number,
              public course: Course
  ) {}
}

export class ExamSubmission {
  constructor(public score: number,
              public course: string,
              public student: string) { }
}
