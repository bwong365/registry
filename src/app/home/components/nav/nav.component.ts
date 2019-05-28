import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    M.AutoInit();
  }

}
