import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Instructor } from 'src/app/models/instructor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { RefreshService } from 'src/app/services/refresh.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-add-instructor',
  templateUrl: './add-instructor.component.html',
  styleUrls: ['./add-instructor.component.scss']
})
export class AddInstructorComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;

  constructor(private instructorService: InstructorRestService,
              private refreshService: RefreshService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  async onSubmit() {
    const firstName: string = this.form.value.firstName;
    const lastName: string = this.form.value.lastName;
    const newInstructor: Instructor = new Instructor(0, firstName, lastName, []);

    const instructor = await this.instructorService.addInstructor(newInstructor);
    this.refreshService.instructorsChanged.next();
    console.log(instructor.id);
    this.router.navigate([instructor.id], {relativeTo: this.route.parent});
  }
}
