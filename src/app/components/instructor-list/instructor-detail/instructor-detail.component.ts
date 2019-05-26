import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Instructor } from 'src/app/models/instructor.model';
import * as M from 'materialize-css';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss']
})
export class InstructorDetailComponent implements OnInit, AfterViewInit {

  instructorId: number;
  firstName = '';
  lastName = '';
  courses: Course[] = [];

  constructor(private instructorService: InstructorRestService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.instructorId = params.id;
        this.getInstructorInfo();
      }
    );
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private getInstructorInfo(): void {
    this.getInstructor();
    this.getCourses();
  }

  private async getInstructor() {
    const instructor: Instructor = await this.instructorService.getInstructorById(this.instructorId);
    this.firstName = instructor.firstName;
    this.lastName = instructor.lastName;
  }

  private async getCourses() {
    this.courses = await this.instructorService.getCourses(this.instructorId);
  }
}
