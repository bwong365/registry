import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmbeddedCourses, EmbeddedStudents, EmbeddedExams } from '../../models/embedded.interface';
import { Student, StudentCourses } from '../../models/student.model';
import { Course } from 'src/app/models/course.model';
import { Exam, ExamSubmission } from 'src/app/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class StudentRestService {

  constructor(private http: HttpClient) { }

  public getAllStudents(): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedStudents>('http://localhost:8080/api/students?sort=lastName').subscribe(
        (data: EmbeddedStudents) => resolve(data._embedded.students), err => reject(err)
      );
    });
  }

  public getStudentById(id: number): Promise<Student> {
     return this.http.get<Student>('http://localhost:8080/api/students/' + id).toPromise();
  }

  public getCourses(id: number): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedCourses>('http://localhost:8080/api/students/' + id + '/courses').subscribe(
        (data: EmbeddedCourses) => resolve(data._embedded.courses),
        (err: any) => reject(err)
      );
    });
  }

  public addStudent(student: Student): Promise<Student> {
    return this.http.post<Student>('http://localhost:8080/api/students', student).toPromise();
  }

  public updateStudent(student: Student): Promise<Student> {
    return this.http.patch<Student>('http://localhost:8080/api/students/' + student.id, student).toPromise();
  }

  public updateCourses(studentId: number, studentCourses: StudentCourses): Promise<Student> {
    return this.http.patch<Student>('http://localhost:8080/api/students/' + studentId, studentCourses).toPromise();
  }

  public deleteStudent(id: number): Promise<any> {
    return this.http.delete('http://localhost:8080/api/students/' + id).toPromise();
  }

  public getExamsByIds(studentId: number, courseId: number): Promise<Exam[]> {
    return this.http.get<Exam[]>('http://localhost:8080/api/exams/reports?studentId=' + studentId + '&courseId=' + courseId).toPromise();
  }

  public deleteExam(examId: number): Promise<any> {
    return this.http.delete('http://localhost:8080/api/exams/' + examId ).toPromise();
  }

  public addExam(exam: ExamSubmission): Promise<Exam> {
    return this.http.post<Exam>('http://localhost:8080/api/exams', exam).toPromise();
  }

  public getExams(id: number): Promise<Exam[]> {
    return new Promise<Exam[]>(
      (resolve, reject) => {
         this.http.get<EmbeddedExams>('http://localhost:8080/api/students/' + id + '/exams').subscribe(
           (data: EmbeddedExams) => resolve(data._embedded.exams),
           err => reject(err)
         );
      });
  }
}
