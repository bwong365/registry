import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { EmbeddedCourses, EmbeddedStudents } from '../../models/embedded.interface';
import { Instructor } from '../../models/instructor.model';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class CourseRestService {

  constructor(private http: HttpClient) { }

  public getAllCourses(): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedCourses>('http://localhost:8080/api/courses').subscribe(
        (data: EmbeddedCourses) => resolve(data._embedded.courses), err => reject(err)
      );
    });
  }

  public getCourseById(id: number): Promise<Course> {
    return this.http.get<Course>('http://localhost:8080/api/courses/' + id).toPromise();
  }

  public getInstructor(id: number): Promise<Instructor> {
    return this.http.get<Instructor>('http://localhost:8080/api/courses/' + id + '/instructor').toPromise();
  }

  public getStudents(id: number): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedStudents>('http://localhost:8080/api/courses/' + id + '/students').subscribe(
        (data: EmbeddedStudents) => resolve(data._embedded.students), err => reject(err)
      );
    });
  }

  public addCourse(course: Course): Promise<Course> {

    return this.http.post<Course>('http://localhost:8080/api/courses', course).toPromise();
  }

  public updateCourse(course: Course): Promise<Course> {
    return this.http.patch<Course>('http://localhost:8080/api/courses/' + course.id, course).toPromise();
  }

  public deleteCourse(id: number): Promise<any> {
    return this.http.delete('http://localhost:8080/api/courses/' + id).toPromise();
  }
}
