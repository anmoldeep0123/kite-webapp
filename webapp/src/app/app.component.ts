import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: string;
  applyStyle: any;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
