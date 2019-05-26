import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { Instructor } from 'src/app/models/instructor.model';
import * as M from 'materialize-css';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;
  instructors: Instructor[];

  constructor(private courseService: CourseRestService,
              private instructorRestService: InstructorRestService,
              private refreshService: RefreshService,
              private router: Router) { }

  ngOnInit() {
    M.AutoInit();
  }

  ngAfterViewInit() {
    this.instructorRestService.getAllInstructors().then(
      (instructors: Instructor[]) => this.instructors = instructors.sort(this.sortByLastName)
    )
    .then(() => {
      setTimeout(() => {
        const elems = document.querySelectorAll('select');
        const instances = M.FormSelect.init(elems);
      }, 0);
    });
  }

  async onSubmit() {
    const name: string = this.form.value.name;
    const description: string = this.form.value.description;
    const instructorId: number = this.form.value.instructor;
    const newCourse: Course = new Course(0, name, description, [])
    if (instructorId) {
      newCourse.instructor = 'http://localhost:8080/api/instructors/' + instructorId;
    }

    const course = await this.courseService.addCourse(newCourse);
    this.refreshService.coursesChanged.next();
    this.router.navigate(['courses', course.id]);
  }

  private sortByLastName(a: Instructor, b: Instructor): number {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  }

}
