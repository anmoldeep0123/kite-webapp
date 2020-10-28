import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter, map, share} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routeProgress: Observable<boolean>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routeProgress = this.router.events
      .pipe(
        filter((event: RouterEvent) =>
          event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel),
        map(event => event instanceof NavigationStart),
        share()
      );
  }
}
