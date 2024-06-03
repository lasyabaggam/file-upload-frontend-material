import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }
}
