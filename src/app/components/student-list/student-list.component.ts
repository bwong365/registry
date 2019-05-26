import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import * as M from 'materialize-css';
import { StudentRestService } from 'src/app/services/rest/student-rest.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, AfterViewInit, OnDestroy {

  students: Student[];
  totalStudentsDisplayed: number;
  filterString: string;
  private refresh: Subscription = this.refreshService.studentsChanged.subscribe(() => {
    this.ngOnInit();
  });

  constructor(private studentService: StudentRestService,
              private refreshService: RefreshService) { }

  async ngOnInit() {
    this.students = await this.studentService.getAllStudents();
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  filterStudents(): Student[] {
    if (this.filterString === undefined || this.filterString === '') {
      this.totalStudentsDisplayed = this.students.length;
      return this.students;
    }

    const filteredStudents: Student[] = this.students.filter(
      (student: Student) => {
        const fullName = student.firstName + ' ' + student.lastName;
        return fullName.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1;
      }
    );

    this.totalStudentsDisplayed = filteredStudents.length;
    return filteredStudents;
  }

}
