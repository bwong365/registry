import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import * as M from 'materialize-css'
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { Instructor } from 'src/app/models/instructor.model';
import { NgForm } from '@angular/forms';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, AfterViewInit {

  @ViewChild('form') form: NgForm;

  instructors: Instructor[];
  students: Student[];

  model = {
    courseId: 0,
    courseName: '',
    courseDescription: '',
    instructorId: 0
  };

  originalModel: {
    courseId: number;
    courseName: string;
    courseDescription: string,
    instructorId: number;
  };

  constructor(private courseService: CourseRestService,
              private refreshService: RefreshService,
              private instructorRestService: InstructorRestService,
              private route: ActivatedRoute,
              private router: Router) { }

  async ngOnInit() {
    await this.getRouteParams();
    this.getCourseInfo();
  }

  ngAfterViewInit() {
    this.instructorRestService.getAllInstructors().then(
      (instructors: Instructor[]) => this.instructors = instructors.sort(this.sortByLastName)
    );
    M.AutoInit();
  }

  private getRouteParams() {
    this.route.params.subscribe(
      (params: Params) => {
        this.model.courseId = params.id;
      }
    );
  }

  private async getCourseInfo() {
    await Promise.all([this.getCourse(), this.getInstructor(), this.getStudents()]);
    setTimeout(() => {
      M.updateTextFields();
    }, 0);

    this.originalModel = Object.assign({}, this.model);
  }

  private async getStudents() {
    this.students = await this.courseService.getStudents(this.model.courseId);
  }

  private async getCourse() {
    const course: Course = await this.courseService.getCourseById(this.model.courseId);
    this.model.courseName = course.name;
    this.model.courseDescription = course.description;
  }

  private async getInstructor() {
    try {
      const instructor = await this.courseService.getInstructor(this.model.courseId);
      this.model.instructorId = instructor.id;
    } catch (error) {
      console.log(error);
      this.model.instructorId = 0;
    }
  }

  onReset() {
    this.form.resetForm({
      name: this.model.courseName,
      description: this.model.courseDescription,
      instructor: this.model.instructorId
    });
  }

  private sortByLastName(a: Instructor, b: Instructor): number {
    if (a.lastName > b.lastName) {
      return 1;
    } else if (a.lastName < b.lastName) {
      return -1;
    }
    return 0;
  }

  async onSubmit() {
    const id: number = this.model.courseId;
    const name: string = this.form.value.name;
    const description: string = this.form.value.description;
    const instructorId: number = this.form.value.instructor;
    const updatedCourse: Course = new Course(id, name, description, null, 'http://localhost:8080/api/instructors/' + instructorId);

    await this.courseService.updateCourse(updatedCourse);
    this.router.navigate(['../..', id], {relativeTo: this.route});
  }

  async onDelete() {
      await this.courseService.deleteCourse(this.model.courseId);
      this.refreshService.coursesChanged.next();
      this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
