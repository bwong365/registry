import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Instructor } from 'src/app/models/instructor.model';
import { Student } from 'src/app/models/student.model';
import * as M from 'materialize-css';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, AfterViewInit {
  private nullInstructor = new Instructor(0, 'no', 'instructor');

  course: Course;
  courseId: 0;
  courseName = '';
  courseDescription = '';
  instructor: Instructor = this.nullInstructor;
  students: Student[] =[];

  constructor(private courseService: CourseRestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRouteParams();
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private getRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.courseId = params.id;
        this.getCourseInfo();
      }
    );
  }

  private getCourseInfo(): void {
    this.getCourse();
    this.getInstructor();
    this.getStudents();
  }

  private async getCourse() {
    try {
      this.course = await this.courseService.getCourseById(this.courseId);
    } catch (e) {
      console.log(e);
    }

    this.courseName = this.course.name;
    this.courseDescription = this.course.description ? this.course.description : 'no description';
  }

  private async getInstructor() {
    try {
      this.instructor = await this.courseService.getInstructor(this.courseId);
    } catch (e) {
      console.log(e);
    }
  }

  private async getStudents() {
    try {
      this.students = (await this.courseService.getStudents(this.courseId)).sort(this.sortByLastName);
    } catch (e) {
      console.log(e);
    }
  }

  private sortByLastName(a: Student, b: Student): number {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  }
}
