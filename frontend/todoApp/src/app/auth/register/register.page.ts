import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';     
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink        
  ]
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Registration error:', err)
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
