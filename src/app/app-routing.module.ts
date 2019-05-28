import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './home/components/course-list/course-list.component';
import { StudentListComponent } from './home/components/student-list/student-list.component';
import { CourseDetailComponent } from './home/components/course-list/course-detail/course-detail.component';
import { StudentDetailComponent } from './home/components/student-list/student-detail/student-detail.component';
import { AddStudentComponent } from './home/components/student-list/add-student/add-student.component';
import { AddCourseComponent } from './home/components/course-list/add-course/add-course.component';
import { EditCourseComponent } from './home/components/course-list/edit-course/edit-course.component';
import { EditStudentComponent } from './home/components/student-list/edit-student/edit-student.component';
import { CoursePlaceholderComponent } from './home/components/course-list/course-placeholder/course-placeholder.component';
import { StudentPlaceholderComponent } from './home/components/student-list/student-placeholder/student-placeholder.component';
import { RegistrationWindowComponent } from './home/components/registration-window/registration-window.component';
import { NotFoundComponent } from './home/components/not-found/not-found.component';
import { InstructorListComponent } from './home/components/instructor-list/instructor-list.component';
import { AddInstructorComponent } from './home/components/instructor-list/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './home/components/instructor-list/edit-instructor/edit-instructor.component';
import { InstructorDetailComponent } from './home/components/instructor-list/instructor-detail/instructor-detail.component';
import { InstructorPlaceholderComponent } from './home/components/instructor-list/instructor-placeholder/instructor-placeholder.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { SectionSelectComponent } from './home/section-select/section-select.component';

const routes: Routes = [
  {path: 'app', component: HomeComponent, children: [
    {path: '', component: SectionSelectComponent, pathMatch: 'full'},
    {path: 'courses', component: CourseListComponent, children: [
      {path: 'add', component: AddCourseComponent},
      {path: 'edit/:id', component: EditCourseComponent},
      {path: ':id', component: CourseDetailComponent},
      {path: '', component: CoursePlaceholderComponent, pathMatch: 'full'}
    ]},
    {path: 'instructors', component: InstructorListComponent, children: [
      {path: 'add', component: AddInstructorComponent},
      {path: 'edit/:id', component: EditInstructorComponent},
      {path: ':id', component: InstructorDetailComponent},
      {path: '', component: InstructorPlaceholderComponent, pathMatch: 'full'}
    ]},
    {path: 'students', component: StudentListComponent, children: [
      {path: 'register', component: AddStudentComponent},
      {path: 'edit/:id', component: EditStudentComponent},
      {path: ':id', component: StudentDetailComponent},
      {path: '', component: StudentPlaceholderComponent, pathMatch: 'full'},
    ]},
    {path: 'registration/:id', component: RegistrationWindowComponent},
  ]},
  {path: '', component: LandingComponent, pathMatch: 'full'},
  {path: '404', component: NotFoundComponent },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
