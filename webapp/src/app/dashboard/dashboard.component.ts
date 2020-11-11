import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  switchColor: any = 'green';
  checkDailyRuns: string
  runStatus = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  changed(event) {
    event.checked ? this.checkDailyRuns = 'On' : this.checkDailyRuns = 'Off';
  }

  stopRun() {
    this.runStatus = false;
  }
}
