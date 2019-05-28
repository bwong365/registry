import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  shouldPulse = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.sleep(2);
    this.shouldPulse = false;
  }

  private sleep(seconds: number): Promise<null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  enter() {
    this.router.navigate(['app']);
  }
}
