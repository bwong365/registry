import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Student, StudentCourses } from 'src/app/models/student.model';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { Course } from 'src/app/models/course.model';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as M from 'materialize-css'

@Component({
  selector: 'app-registration-window',
  templateUrl: './registration-window.component.html',
  styleUrls: ['./registration-window.component.scss']
})
export class RegistrationWindowComponent implements OnInit, AfterViewInit {

  studentId: number;
  student: Student = new Student(0, '', '');
  allCourses: Course[] = [];
  registeredCourses: Course[] = [];
  unregisteredCourses: Course[] = [];

  constructor(private route: ActivatedRoute,
              private studentService: StudentRestService,
              private courseService: CourseRestService,
              private router: Router) { }

  async ngOnInit() {
    await this.getRouteParam();
    this.student = await this.studentService.getStudentById(this.studentId);
    this.allCourses = await this.courseService.getAllCourses();
    this.registeredCourses = (await this.studentService.getCourses(this.studentId)).sort(this.sortCourseById);

    const registeredIds: number[] = this.registeredCourses.map((c: Course) => c.id);
    this.unregisteredCourses = this.allCourses.filter((c: Course) => !registeredIds.includes(c.id)).sort(this.sortCourseById);
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  private getRouteParam() {
    return this.route.params.subscribe(
      (params: Params) => {
        this.studentId = params.id;
      }
    );
  }

  drop(event: CdkDragDrop<Course[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onReset() {
    this.ngOnInit();
  }

  async onSave() {
    const courses: string[] = this.registeredCourses.map((c: Course) => 'http://localhost:8080/api/courses/' + c.id);
    const studentCourses: StudentCourses = new StudentCourses(courses);
    await this.studentService.updateCourses(this.studentId, studentCourses);
    this.router.navigate(['../..', 'students', this.studentId], {relativeTo: this.route});
  }

  private sortCourseById(a: Course, b: Course) {
   return a.id - b.id;
  }
}
