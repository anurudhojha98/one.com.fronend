import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private router: Router) { }


  onLogin() {
    this.router.navigate(['/login']);
  }

  onSignUp() {
    this.router.navigate(['/signup']);
  }
}
