import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as M from 'materialize-css';
import { Student } from 'src/app/models/student.model';
import { RefreshService } from 'src/app/services/refresh.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;
  courses: Course[];

  model = {
    studentId: 0,
    firstName: '',
    lastName: '',
  };

  originalModel: {
    studentId: number;
    firstName: number;
    lastName: string;
  };

  constructor(private studentService: StudentRestService,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.model.studentId = params.id;
        this.getStudentInfo();
      }
    );
  }
  private async getStudentInfo() {
    await this.getStudent();
    this.courses = await this.studentService.getCourses(this.model.studentId);
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private async getStudent() {
    const student: Student = await this.studentService.getStudentById(this.model.studentId);
    this.model.firstName = student.firstName;
    this.model.lastName = student.lastName;
  }

  onReset() {
    this.form.resetForm({
      firstName: this.model.firstName,
      lastName: this.model.lastName
    });
  }

  async onSubmit() {
    const id: number = this.model.studentId;
    const firstName: string = this.form.value.firstName;
    const lastName: string = this.form.value.lastName;
    const updatedStudent: Student = new Student(id, firstName, lastName);

    await this.studentService.updateStudent(updatedStudent);
    this.router.navigate(['../..', id], {relativeTo: this.route});
  }

  async onDelete() {
    await this.studentService.deleteStudent(this.model.studentId);
    this.refreshService.studentsChanged.next();
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}