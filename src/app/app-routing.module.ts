import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseDetailComponent } from './components/course-list/course-detail/course-detail.component';
import { StudentDetailComponent } from './components/student-list/student-detail/student-detail.component';
import { AddStudentComponent } from './components/student-list/add-student/add-student.component';
import { AddCourseComponent } from './components/course-list/add-course/add-course.component';
import { EditCourseComponent } from './components/course-list/edit-course/edit-course.component';
import { EditStudentComponent } from './components/student-list/edit-student/edit-student.component';
import { CoursePlaceholderComponent } from './components/course-list/course-placeholder/course-placeholder.component';
import { StudentPlaceholderComponent } from './components/student-list/student-placeholder/student-placeholder.component';
import { RegistrationWindowComponent } from './components/registration-window/registration-window.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { AddInstructorComponent } from './components/instructor-list/add-instructor/add-instructor.component';
import { EditInstructorComponent } from './components/instructor-list/edit-instructor/edit-instructor.component';
import { InstructorDetailComponent } from './components/instructor-list/instructor-detail/instructor-detail.component';

const routes: Routes = [
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
    //{path: '', component: CoursePlaceholderComponent, pathMatch: 'full'}
  ]},
  {path: 'students', component: StudentListComponent, children: [
    {path: 'register', component: AddStudentComponent},
    {path: 'edit/:id', component: EditStudentComponent},
    {path: ':id', component: StudentDetailComponent},
    {path: '', component: StudentPlaceholderComponent, pathMatch: 'full'},
  ]},
  {path: 'registration/:id', component: RegistrationWindowComponent},
  {path: '404', component: NotFoundComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
