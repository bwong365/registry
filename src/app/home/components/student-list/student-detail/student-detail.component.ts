import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import * as M from 'materialize-css';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit, AfterViewInit {

  studentId: number;
  firstName = '';
  lastName = '';
  courses: Course[];

  constructor(private studentService: StudentRestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.studentId = params.id;
        this.getStudentInfo();
      }
    );
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private getStudentInfo(): void {
    this.getStudent();
    this.getCourses();
  }

  private async getStudent() {
    const student: Student = await this.studentService.getStudentById(this.studentId);
    this.firstName = student.firstName;
    this.lastName = student.lastName;
  }

  private async getCourses() {
    this.courses = await this.studentService.getCourses(this.studentId);
  }
}
