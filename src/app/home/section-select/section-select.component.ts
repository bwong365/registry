import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-select',
  templateUrl: './section-select.component.html',
  styleUrls: ['./section-select.component.scss']
})
export class SectionSelectComponent implements OnInit {

  panels = [
    { text: 'students', icon: 'person' },
    { text: 'courses', icon: 'school' },
    { text: 'instructors', icon: 'assignment_ind' },
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirect(destination: string) {
    console.log(destination);
    this.router.navigate([destination], { relativeTo: this.route});
  }

}
