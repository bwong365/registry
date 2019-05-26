import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instructor, InstructorCourses } from 'src/app/models/instructor.model';
import { EmbeddedInstructors, EmbeddedCourses } from 'src/app/models/embedded.interface';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorRestService {

  constructor(private http: HttpClient) { }

  public getAllInstructors(): Promise<Instructor[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedInstructors>('http://localhost:8080/api/instructors').subscribe(
        (data: EmbeddedInstructors) => resolve(data._embedded.instructors), err => reject(err)
      );
    });
  }

  public getCourses(id: number): Promise<Course[]> {
    return new Promise((resolve, reject) => {
      this.http.get<EmbeddedCourses>('http://localhost:8080/api/instructors/' + id + '/courses').subscribe(
        (data: EmbeddedCourses) => resolve(data._embedded.courses),
        (err: any) => reject(err)
      );
    });
  }

  public getInstructorById(id: number): Promise<Instructor> {
    return this.http.get<Instructor>('http://localhost:8080/api/instructors/' + id).toPromise();
 }

 public addInstructor(instructor: Instructor): Promise<Instructor> {
  return this.http.post<Instructor>('http://localhost:8080/api/instructors', instructor).toPromise();
}

public updateInstructor(instructor: Instructor): Promise<Instructor> {
  return this.http.patch<Instructor>('http://localhost:8080/api/instructors/' + instructor.id, instructor).toPromise();
}

public updateCourses(instructorId: number, instructorCourses: InstructorCourses): Promise<Instructor> {
  return this.http.patch<Instructor>('http://localhost:8080/api/instructors/' + instructorId, instructorCourses).toPromise();
}

public deleteInstructor(id: number): Promise<any> {
  return this.http.delete('http://localhost:8080/api/instructors/' + id).toPromise();
}
}
