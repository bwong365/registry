import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-list/student-detail/student-detail.component';
import { CourseDetailComponent } from './components/course-list/course-detail/course-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NavComponent } from './components/nav/nav.component';
import { AddStudentComponent } from './components/student-list/add-student/add-student.component';
import { AddCourseComponent } from './components/course-list/add-course/add-course.component';
import { EditCourseComponent } from './components/course-list/edit-course/edit-course.component';
import { EditStudentComponent } from './components/student-list/edit-student/edit-student.component';
import { CoursePlaceholderComponent } from './components/course-list/course-placeholder/course-placeholder.component';
import { StudentPlaceholderComponent } from './components/student-list/student-placeholder/student-placeholder.component';
import { RegistrationWindowComponent } from './components/registration-window/registration-window.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { AddInstructorComponent } from './components/instructor-list/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './components/instructor-list/edit-instructor/edit-instructor.component';
import { InstructorDetailComponent } from './components/instructor-list/instructor-detail/instructor-detail.component';
import { NavLinksComponent } from './components/nav/nav-links/nav-links.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    StudentListComponent,
    StudentDetailComponent,
    CourseDetailComponent,
    FilterPipe,
    NavComponent,
    AddStudentComponent,
    AddCourseComponent,
    EditCourseComponent,
    EditStudentComponent,
    CoursePlaceholderComponent,
    StudentPlaceholderComponent,
    RegistrationWindowComponent,
    NotFoundComponent,
    InstructorListComponent,
    AddInstructorComponent,
    EditInstructorComponent,
    InstructorDetailComponent,
    NavLinksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
