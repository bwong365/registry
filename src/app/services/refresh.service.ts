import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  coursesChanged: Subject<null> = new Subject();
  studentsChanged: Subject<null> = new Subject();
  instructorsChanged: Subject<null> = new Subject();
}
