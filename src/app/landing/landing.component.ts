import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  shouldPulse = false;
  timer = setInterval(() => {
    this.pulse(2);
  }, 4000);


  constructor(private router: Router) { }

  ngOnInit() {
    this.pulse(2);
  }

  async ngAfterViewInit() {
  }

  private async pulse(times: number) {
    console.log('pulsing')
    this.shouldPulse = true;
    await this.sleep(times);
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

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
