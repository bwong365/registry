import { Course } from './course.model';
import { Page } from './page.interface';
import { Student } from './student.model';
import { Instructor } from './instructor.model';
import { Exam } from './exam.model';

export interface EmbeddedCourses {
  _embedded: {
    courses: Course[],
  };
  _links: {};
  page: Page;
}

export interface EmbeddedStudents {
  _embedded: {
    students: Student[],
  };
  _links: {};
  page: Page;
}

export interface EmbeddedInstructors {
  _embedded: {
    instructors: Instructor[],
  };
  _links: {};
  page: Page;
}

export interface EmbeddedExams {
  _embedded: {
    exams: Exam[]
  };
}
