import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './home/components/course-list/course-list.component';
import { StudentListComponent } from './home/components/student-list/student-list.component';
import { StudentDetailComponent } from './home/components/student-list/student-detail/student-detail.component';
import { CourseDetailComponent } from './home/components/course-list/course-detail/course-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { NavComponent } from './home/components/nav/nav.component';
import { AddStudentComponent } from './home/components/student-list/add-student/add-student.component';
import { AddCourseComponent } from './home/components/course-list/add-course/add-course.component';
import { EditCourseComponent } from './home/components/course-list/edit-course/edit-course.component';
import { EditStudentComponent } from './home/components/student-list/edit-student/edit-student.component';
import { CoursePlaceholderComponent } from './home/components/course-list/course-placeholder/course-placeholder.component';
import { StudentPlaceholderComponent } from './home/components/student-list/student-placeholder/student-placeholder.component';
import { RegistrationWindowComponent } from './home/components/registration-window/registration-window.component';
import { NotFoundComponent } from './home/components/not-found/not-found.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InstructorListComponent } from './home/components/instructor-list/instructor-list.component';
import { AddInstructorComponent } from './home/components/instructor-list/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './home/components/instructor-list/edit-instructor/edit-instructor.component';
import { InstructorDetailComponent } from './home/components/instructor-list/instructor-detail/instructor-detail.component';
import { NavLinksComponent } from './home/components/nav/nav-links/nav-links.component';
import { HomeComponent } from './home/home.component';
import { InstructorPlaceholderComponent } from './home/components/instructor-list/instructor-placeholder/instructor-placeholder.component';
import { LandingComponent } from './landing/landing.component';
import { SectionSelectComponent } from './home/section-select/section-select.component';
import { ReportingComponent } from './home/components/course-list/reporting/reporting.component';
import { ExamListComponent } from './home/components/course-list/reporting/exam-list/exam-list.component';
import { PreloaderComponent } from './home/components/preloader/preloader.component';

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
    HomeComponent,
    InstructorPlaceholderComponent,
    LandingComponent,
    SectionSelectComponent,
    ReportingComponent,
    ExamListComponent,
    PreloaderComponent,
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
