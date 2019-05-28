import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { InstructorRestService } from 'src/app/services/rest/instructor-rest.service';
import { Instructor } from 'src/app/models/instructor.model';
import * as M from 'materialize-css';
import { Subscription } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit, AfterViewInit, OnDestroy {
  instructors: Instructor[];
  totalInstructorsDisplayed: number;
  filterString: string;

  private refresh: Subscription = this.refreshService.instructorsChanged.subscribe(() => {
    this.ngOnInit();
  });

  constructor(private instructorService: InstructorRestService,
              private refreshService: RefreshService) { }

  async ngOnInit() {
    this.instructors = await this.instructorService.getAllInstructors();
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

  filterInstructors(): Instructor[] {
    if (this.filterString === undefined || this.filterString === '') {
      this.totalInstructorsDisplayed = this.instructors.length;
      return this.instructors;
    }

    const filteredInstructors: Instructor[] = this.instructors.filter(
      (instructor: Instructor) => {
        const name = instructor.firstName + ' ' + instructor.lastName;
        return name.toLowerCase().indexOf(this.filterString.toLowerCase()) !== -1;
      }
    );

    this.totalInstructorsDisplayed = filteredInstructors.length;
    return filteredInstructors;
  }

}
