import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseWithStudents } from 'src/app/models/course.model';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit, AfterViewInit {

  courseId = 0;
  course: CourseWithStudents;
  students: Student;

  constructor(private route: ActivatedRoute, private courseService: CourseRestService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const courseId = params.courseId;
        this.getData(courseId);
      });
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private getData(id: number) {
    this.courseService.getCourseWithStudents(id).subscribe(
      (course: CourseWithStudents) => {
        this.course = course;
        this.courseId = course.id;
        this.course.students = this.course.students.sort(this.orderByLastName);
      }
    );
  }

  private orderByLastName(a, b) {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  }

}
