import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { RefreshService } from 'src/app/services/refresh.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;

  constructor(private studentService: StudentRestService,
              private refreshService: RefreshService,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  async onSubmit() {
    const firstName: string = this.form.value.firstName;
    const lastName: string = this.form.value.lastName;
    const newStudent: Student = new Student(0, firstName, lastName, []);

    const student = await this.studentService.addStudent(newStudent);
    this.refreshService.studentsChanged.next();

    this.router.navigate(['students', student.id]);
  }

}
