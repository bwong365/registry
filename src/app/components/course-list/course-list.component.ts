import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CourseRestService } from 'src/app/services/rest/course-rest.service';
import { Course } from 'src/app/models/course.model';
import * as M from 'materialize-css';
import { Subscription } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, AfterViewInit, OnDestroy {
  courses: Course[];
  totalCoursesDisplayed: number;
  filterString: string;

  private refresh: Subscription = this.refreshService.coursesChanged.subscribe(() => {
    this.ngOnInit();
  });

  constructor(private courseService: CourseRestService,
              private refreshService: RefreshService) { }

  async ngOnInit() {
    this.courses = await this.courseService.getAllCourses();
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  filterCourses(): Course[] {
    if (this.filterString === undefined || this.filterString === '') {
      this.totalCoursesDisplayed = this.courses.length;
      return this.courses;
    }

    const filteredCourses: Course[] = this.courses.filter(
      (course: Course) => {
        const name = course.name;
        return name.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1;
      }
    );

    this.totalCoursesDisplayed = filteredCourses.length;
    return filteredCourses;
  }

}
