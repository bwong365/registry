import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmbeddedCourses, EmbeddedStudents } from '../models/embedded.interface';
import { Student, StudentCourses } from '../models/student.model';
import { Course } from 'src/app/models/course.model';
import { Exam, ExamSubmission } from 'src/app/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class StudentFakeService {

  constructor(private http: HttpClient) { }

  public getStudentById(id: number): Promise<Student> {
    return new Promise(resolve => resolve(new Student(16, 'Billy', 'Bob')))
  }

  public getCourses(id: number): Promise<Course[]> {
    const courses = [
          new Course(1, 'Herbology', 'Here is some stuff'),
          new Course(3, 'Comp Sci', 'Here is some stuff'),
          new Course(5, 'Botany', 'Here is some stuff'),
          new Course(7, 'Finance', 'Here is some stuff'),
    ];
    return new Promise(resolve => resolve(courses));
  }
  public getExams(id: number): Promise<Exam[]> {
    const exams = [
      new Exam(1, 45, new Course(1, 'Herbology', 'Here is some stuff')),
      new Exam(2, 60, new Course(1, 'Herbology', 'Here is some stuff')),
      new Exam(3, 55, new Course(1, 'Herbology', 'Here is some stuff')),
      new Exam(4, 55, new Course(1, 'Herbology', 'Here is some stuff')),
      new Exam(5, 40, new Course(1, 'Herbology', 'Here is some stuff')),
      new Exam(6, 90, new Course(3, 'Comp Sci', 'Here is some stuff')),
      new Exam(7, 99, new Course(3, 'Comp Sci', 'Here is some stuff')),
      new Exam(8, 94, new Course(3, 'Comp Sci', 'Here is some stuff')),
      new Exam(9, 97, new Course(3, 'Comp Sci', 'Here is some stuff')),
      new Exam(10, 94, new Course(3, 'Comp Sci', 'Here is some stuff')),
    ];
    return new Promise(resolve => resolve(exams));
  }
}
