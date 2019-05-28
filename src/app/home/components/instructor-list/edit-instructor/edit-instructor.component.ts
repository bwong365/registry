import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as M from 'materialize-css';
import { Instructor } from 'src/app/models/instructor.model';
import { RefreshService } from 'src/app/services/refresh.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.scss']
})
export class EditInstructorComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;

  model = {
    instructorId: 0,
    firstName: '',
    lastName: '',
  };

  courses: Course[];

  originalModel: {
    instructorId: number;
    firstName: number;
    lastName: string;
  };

  constructor(private instructorService: InstructorRestService,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.model.instructorId = params.id;
        this.getInstructorInfo();
      }
    );
  }
  private async getInstructorInfo() {
    await this.getInstructor();
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private async getInstructor() {
    const instructor: Instructor = await this.instructorService.getInstructorById(this.model.instructorId);
    this.courses = await this.instructorService.getCourses(this.model.instructorId);
    this.model.firstName = instructor.firstName;
    this.model.lastName = instructor.lastName;
  }

  onReset() {
    this.form.resetForm({
      firstName: this.model.firstName,
      lastName: this.model.lastName
    });
  }

  async onSubmit() {
    const id: number = this.model.instructorId;
    const firstName: string = this.form.value.firstName;
    const lastName: string = this.form.value.lastName;
    const updatedInstructor: Instructor = new Instructor(id, firstName, lastName);

    await this.instructorService.updateInstructor(updatedInstructor);
    this.router.navigate(['../..', id], {relativeTo: this.route});
  }

  async onDelete() {
    await this.instructorService.deleteInstructor(this.model.instructorId);
    this.refreshService.instructorsChanged.next();
    alert(this.model.firstName + ' ' + this.model.lastName + ' has been deleted.');
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
